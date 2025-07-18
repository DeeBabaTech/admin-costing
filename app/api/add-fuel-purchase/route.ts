import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// POST /api/add-fuel
const fuelSchema = z.object({
  vehicle: z.string().min(1, "Vehicle Name is required"),
  date: z.iso.datetime("Date is required"),
  litreAmount: z.number().min(1, "Litre amount is required"),
  totalAmount: z.number().min(1, "Total amount is required"),
});

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const data = fuelSchema.parse(json);

    const result = await prisma.fuel.create({
      data: {
        vehicleId: data.vehicle,
        amountPerLitre: data.litreAmount,
        totalAmount: data.totalAmount,
        date: data.date,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error recording fuel:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
