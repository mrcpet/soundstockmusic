import { NextResponse } from "next/server";

import { signJWT } from "@/utils/helpers/authHelpers";
import { validateUserData } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
      throw new Error(); //TODO write user validation function and use instead
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, //TODO hash password with bcrypt
        name: body.name,
      },
    });

    const token = await signJWT({
      userId: newUser.id,
    });

    return NextResponse.json(
      { newUser, token },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "An account with this email already exists.",
      },
      {
        status: 400,
      }
    );
  }
}
