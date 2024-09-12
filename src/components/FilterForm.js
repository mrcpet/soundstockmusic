"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function FilterForm({ onFilterChange }) {
  const router = useRouter();
  const auth = useAuth();
  const [params, setParams] = useState();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(false);

  const handleApplyFilters = () => {
    const params = {
      category,
      quantity,
    };
    onFilterChange(params);
  };

  return (
    <section className="p-4 flex justify-center gap-8">
      <div className="flex items-center gap-4">
        <label
          htmlFor="category"
          className="block text-gray-100 font-medium mb-2"
        >
          Category
        </label>
        <select
          id="category"
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCategory(e.target.value)}
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
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="inStock"
          className="w-4 h-4 accent-blue-600 border-gray-300 rounded focus:ring-blue-500"
          onChange={(e) => setQuantity(e.target.checked)}
        />
        <label htmlFor="inStock" className="text-gray-100 font-medium">
          In Stock
        </label>
      </div>
      <button
        type="button"
        className="px-6 py-2 my-0 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </section>
  );
}

export default FilterForm;
