"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function ItemCard({ item, onDelete, onEdit }) {
  const router = useRouter();
  const auth = useAuth();
  const [error, setError] = useState("");
  function formatCategory(category) {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white p-2 text-black w-full">
      <div className="flex flex-row justify-between gap-2">
        <div className="flex items-center justify-between border-gray-200">
          <h4 className="font-bold text-xl">{item.name}</h4>
        </div>
        <div className="flex items-center justify-between border-gray-200">
          <span className="font-semibold pr-2">Quantity: </span> {item.quantity}
        </div>
        <div className="flex items-center justify-between border-gray-200">
          <span className="font-semibold pr-2">Description:</span>{" "}
          {item.description}
        </div>
        <div className="flex items-center justify-between border-gray-200">
          <span className="font-semibold pr-2">Category:</span> {formatCategory(item.category)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
