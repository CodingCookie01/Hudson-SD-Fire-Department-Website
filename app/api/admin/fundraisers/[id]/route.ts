import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const fundraiser = await prisma.fundraiser.update({
    where: { id: params.id },
    data: {
      title: body.title ? String(body.title) : undefined,
      description:
        body.description !== undefined ? String(body.description) : undefined,
      goalAmount:
        body.goalAmount !== undefined ? Number(body.goalAmount) : undefined,
      currentAmount:
        body.currentAmount !== undefined ? Number(body.currentAmount) : undefined,
      imageUrl: body.imageUrl !== undefined ? String(body.imageUrl) : undefined,
      status: body.status !== undefined ? String(body.status) : undefined,
    },
  });

  return NextResponse.json(fundraiser);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.fundraiser.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
