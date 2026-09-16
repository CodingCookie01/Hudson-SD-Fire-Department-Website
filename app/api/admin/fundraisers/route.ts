import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fundraisers = await prisma.fundraiser.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(fundraisers);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, goalAmount, currentAmount, imageUrl, status } = body;

  if (!title || !goalAmount) {
    return NextResponse.json(
      { error: "Title and goal amount are required." },
      { status: 400 }
    );
  }

  const fundraiser = await prisma.fundraiser.create({
    data: {
      title: String(title),
      description: description ? String(description) : "",
      goalAmount: Number(goalAmount),
      currentAmount: Number(currentAmount ?? 0),
      imageUrl: imageUrl ? String(imageUrl) : null,
      status: status ? String(status) : "active",
    },
  });

  return NextResponse.json(fundraiser, { status: 201 });
}
