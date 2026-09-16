"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fundraiser = {
  id: string;
  title: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  imageUrl?: string | null;
  status: string;
};

export default function AdminFundraisersPage() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState(1000);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("active");

  async function loadFundraisers() {
    const response = await fetch("/api/admin/fundraisers");
    if (response.ok) {
      const data = await response.json();
      setFundraisers(data);
    }
  }

  useEffect(() => {
    loadFundraisers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/admin/fundraisers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        goalAmount,
        currentAmount,
        imageUrl,
        status,
      }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setGoalAmount(1000);
      setCurrentAmount(0);
      setImageUrl("");
      setStatus("active");
      loadFundraisers();
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/fundraisers/${id}`, { method: "DELETE" });
    loadFundraisers();
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <Link href="/admin">Back to dashboard</Link>
      <h1>Fundraisers</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 640 }}>
        <input
          placeholder="Fundraiser title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <input
          type="number"
          placeholder="Goal amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Current amount"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(Number(e.target.value))}
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit">Add fundraiser</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 32 }}>
        {fundraisers.map((fundraiser) => (
          <li key={fundraiser.id} style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}>
            <strong>{fundraiser.title}</strong>
            <p>{fundraiser.description}</p>
            <p>
              Goal: ${fundraiser.goalAmount} | Raised: ${fundraiser.currentAmount} | Status: {fundraiser.status}
            </p>
            <button type="button" onClick={() => handleDelete(fundraiser.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
