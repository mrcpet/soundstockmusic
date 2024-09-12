import { NextResponse } from "next/server";

import { validateItemData, notFoundResponse } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  const id = options.params.id;
  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: {
        id: +id,
      },
    });
    return NextResponse.json({ item });
  } catch (error) {
    return notFoundResponse(NextResponse, "Item not found.");
  }
}

export async function PUT(req, options) {
  const id = options.params.id;
  let body;
  let currentItem;

  try {
    body = await req.json();
    currentItem = await prisma.item.findUnique({
      where: { id: Number(id) },
    });
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
  const newItemObject = { ...currentItem, ...body };
  const [hasErrors, errors] = validateItemData(newItemObject);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: errors,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        name: newItemObject.name,
        quantity: newItemObject.quantity,
        description: newItemObject.description,
        category: newItemObject.category,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, options) {
  const id = options.params.id;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return notFoundResponse(NextResponse, "Item not found.");
  }
}
