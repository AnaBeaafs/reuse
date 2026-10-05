"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteItemButton({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este anúncio?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    const res = await fetch(`/api/itens/${itemId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/itens");
      router.refresh();
    } else {
      alert("Erro ao excluir o anúncio");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="w-full rounded-full border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-60"
    >
      {loading ? "Excluindo..." : "Excluir anúncio"}
    </button>
  );
}