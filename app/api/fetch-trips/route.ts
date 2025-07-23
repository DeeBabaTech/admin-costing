import useGetUser from "@/components/hooks/get-user";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// GET /api/fetch-trips

export const GET = async (req: NextRequest) => {
  try {
    const start = req.nextUrl.searchParams.get("start") || "";
    const end = req.nextUrl.searchParams.get("end") || "";
    const team = req.nextUrl.searchParams.get("team") || "all";

    const result = await prisma.team.findMany({
      where: {
        trips: {
          some: {
            date: {
              gte: new Date(start),
              lte: new Date(end),
            },
          },
        },
        name: {
          contains: team === "all" ? undefined : team,
          mode: "insensitive",
        },
      },
      include: {
        trips: true,
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
