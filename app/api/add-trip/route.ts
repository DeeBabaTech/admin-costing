import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/components/hooks/get-user";

// POST /api/add-trip

const tripSchema = z.object({
  team: z.string().min(1, "Team is required"),
  vehicle: z.string().min(1, "Vehicle type is required"),
  date: z.iso.datetime("Date is required"),
  timeDepart: z.string().min(4, "Departure time is required"),
  timeReturn: z.string().min(4, "Return time is required"),
  location: z.string().min(2, "Location is required"),
  mileageStart: z.number().min(1, "Mileage Start is required"),
  mileageEnd: z.number().min(1, "Mileage End is required"),
});

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const data = tripSchema.parse(json);

    const { user } = await getUser();

    const result = await prisma.trip.create({
      data: {
        teamId: data.team,
        vehicleId: data.vehicle,
        location: data.location,
        mileageStart: data.mileageStart,
        mileageEnd: data.mileageEnd,
        departureTime: data.timeDepart,
        returnTime: data.timeReturn,
        date: data.date,
        estimatedCost: json.estimatedCost,
        entryBy: user?.name,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);

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
