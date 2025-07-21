import useGetUser from "@/components/hooks/get-user";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// GET /api/fetch-trips

export const GET = async (req: NextRequest) => {
  try {
    const from = req.nextUrl.searchParams.get("from") || "";
    const to = req.nextUrl.searchParams.get("to") || "";
    const team = req.nextUrl.searchParams.get("team") || "all";

    const result = await prisma.trip.findMany({
      where: {
        date: {
          gte: new Date(from),
          lte: new Date(to),
        },
        team: {
          name: {
            contains: team === "all" ? undefined : team,
            mode: "insensitive",
          },
        },
      },
      include: {
        team: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
