import { NextResponse } from "next/server";
import { notFoundResponse } from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  let users;
  try {
    users = await prisma.user.findMany();
  } catch (e) {
    return notFoundResponse(NextResponse, "No user found");
  }
  return NextResponse.json({ users });
}

export async function POST(req, options) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
  const newUser = await prisma.user.create({
    data: body,
  });
  return NextResponse.json(newUser, {
    status: 201,
  });
}
//TODO rewrite this with a helper function for user data validation
//TODO maybe remove post from this route and keep it only in auth/register
