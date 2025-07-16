import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/add-trip
// Required fields in body: title
// Optional fields in body: content

export const POST = async (req: NextRequest) => {
  const { team, vehicle, date, timeDepart, timeReturn, location, distance } =
    await req.json();

  const result = await prisma.trip.create({
    data: {
      teamId: team,
      vehicleId: vehicle,
      location,
      distance,
      departureTime: timeDepart,
      returnTime: timeReturn,
      date,
    },
  });

  return NextResponse.json(result);
};
