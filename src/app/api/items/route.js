import { NextResponse } from "next/server";

import { validateItemData, notFoundResponse } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const category = url.searchParams.get("category");
  const quantity = url.searchParams.get("quantity");
  let items = [];
  const filters = {};

  if (category) {
    filters.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (quantity === "true") {
    filters.quantity = {
      gt: 0,
    };
  }

  items = await prisma.item.findMany({
    where: {
      AND: [filters],
    },
  });

  return NextResponse.json(items);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    console.log(body);
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
  const [hasErrors, errors] = validateItemData(body);
  console.log("BODY", body);
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
  let newItem;
  try {
    newItem = await prisma.item.create({
      data: {
        name: body.name,
        quantity: body.quantity,
        description: body.description,
        category: body.category,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid data sent for item creation",
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(newItem, {
    status: 201,
  });
}
