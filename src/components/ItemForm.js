"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function ItemForm({ item, onSubmit, onEdit }) {
  const router = useRouter();
  const auth = useAuth();

  const [name, setName] = useState(item ? item.name : "");
  const [quantity, setQuantity] = useState(item ? item.quantity : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [category, setCategory] = useState(item ? item.category : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setDescription(item.description);
      setCategory(item.category);
    }
  }, [item]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name,
      quantity: +quantity,
      description,
      category,
    };
    if (item) {
      await onEdit(e, formData); // Use onEdit if item is being edited
    } else {
      await onSubmit(e, formData); // Use onSubmit if creating new item
    }
    setName("");
    setQuantity("");
    setDescription("");
    setCategory("");
  }

  if (!auth.token) {
    return <div>You have to be logged in to add an item. :)</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold text-gray-100 m-4">
        {item ? "Edit item" : "Create new item"}
      </h3>
      <form
        className="flex flex-row items-end justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-gray-100">Name</label>
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-100">Quantity</label>
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="number"
            value={quantity}
            min="0"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-100">Description</label>
          <input
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <select
            id="category"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="" defaultChecked>
              All
            </option>
            <option value="bass-guitars">Bass Guitars</option>
            <option value="electric-guitars">Electric Guitars</option>
            <option value="acoustic-guitars">Acoustic Guitars</option>
            <option value="drum-kits">Drum Kits</option>
            <option value="synthesizers">Synthesizers</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          {item ? "Edit item" : "Add item"}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
