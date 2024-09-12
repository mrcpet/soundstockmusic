"use client";

import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import FilterForm from "@/components/FilterForm";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function ItemContainer() {
  const auth = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:3000/api/items/?${queryParams}`
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError("Failed to get items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const applyFilters = (filters) => {
    fetchItems(filters);
  };


  async function handleDelete(itemId) {
    setError("");
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.ok) {
        setItems(items.filter((item) => item.id !== itemId));
        setEditingItem(null);
      }
    } catch (e) {
      setError(e || "An error occurred");
    }
  }

  async function handleSubmit(e, formData) {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const newItem = await response.json();
      setItems((prevItems) => [...prevItems, newItem]); // Add new item to state
    } else {
      setError("Failed to create item");
    }
  }

  async function handleEdit(e, formData) {
    e.preventDefault();
    setError("");

    if (!editingItem) {
      setError("No item selected for editing.");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/items/${editingItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setEditingItem(null); 
    } else {
      setError("Failed to update item");
    }
  }
  if (!auth.token) {
    // setTimeout(() => {
    //   router.push("/");
    // }, 3000);
    return <div>Please register or log in to use this application!</div>;
  }

  return (
    <article className="flex min-h-screen flex-col items-center justify-evenly p-4 bg-gray-900">
      <ItemForm
        onSubmit={handleSubmit}
        item={editingItem}
        onEdit={handleEdit}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <FilterForm onFilterChange={applyFilters} />
      <h2 className="text-3xl font-bold text-gray-100 m-4">
        Current inventory
      </h2>
      <section className="w-full flex flex-wrap justify-center gap-4">
        {items &&
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => setEditingItem(item)}
            />
          ))}
      </section>
    </article>
  );
}

export default ItemContainer;
