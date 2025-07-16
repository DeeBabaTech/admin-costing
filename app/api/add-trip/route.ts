import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/add-trip
// Required fields in body: title
// Optional fields in body: content

export const POST = async (req: NextRequest) => {
  const { team, date, timeDepart, timeReturn, distance } = await req.json();

  const result = await prisma.trip.create({
    data: {
      teamId: "1",
      distance,
      departureTime: timeDepart,
      returnTime: timeReturn,
      date,
    },
  });

  return NextResponse.json(result);
};
