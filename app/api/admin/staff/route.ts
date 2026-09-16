import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const staff = await prisma.staffMember.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, title, email, bio, imageUrl, active } = body;

  if (!name || !title) {
    return NextResponse.json(
      { error: "Name and title are required." },
      { status: 400 }
    );
  }

  const staffMember = await prisma.staffMember.create({
    data: {
      name: String(name),
      title: String(title),
      email: email ? String(email) : null,
      bio: bio ? String(bio) : null,
      imageUrl: imageUrl ? String(imageUrl) : null,
      active: active !== undefined ? Boolean(active) : true,
    },
  });

  return NextResponse.json(staffMember, { status: 201 });
}
