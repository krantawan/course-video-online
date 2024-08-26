import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  const token = request.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.API_SECRET_KEY}`) {
    console.log("Token mismatch or not provided");
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const userId = Number(params.id);
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { accounts: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const roles = await prisma.user.findMany({
      distinct: ["role"],
      select: {
        role: true,
      },
    });

    const roleList = roles.map((user) => user.role);

    return NextResponse.json({ user, roles: roleList }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  const token = request.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.API_SECRET_KEY}`) {
    console.log("Token mismatch or not provided");
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const userId = Number(params.id);
    const { name, email, role, password } = await request.json();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email, role, password: hashedPassword },
      });
      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email, role },
      });
      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
