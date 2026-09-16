import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const staffMember = await prisma.staffMember.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(staffMember);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const staffMember = await prisma.staffMember.update({
    where: { id: params.id },
    data: {
      name: body.name ? String(body.name) : undefined,
      title: body.title ? String(body.title) : undefined,
      email: body.email !== undefined ? String(body.email) : undefined,
      bio: body.bio !== undefined ? String(body.bio) : undefined,
      imageUrl: body.imageUrl !== undefined ? String(body.imageUrl) : undefined,
      active:
        body.active !== undefined ? Boolean(body.active) : undefined,
    },
  });

  return NextResponse.json(staffMember);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.staffMember.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
