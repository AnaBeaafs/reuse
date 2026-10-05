"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemActions({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = window.confirm("Tem certeza que deseja excluir este anúncio?");
    if (!ok) return;

    setLoading(true);

    try {
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
    } catch {
      alert("Erro ao excluir o anúncio");
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-3">
      {/* Botão Propor troca */}
      <button
        type="button"
        className="w-full rounded-full bg-[#9F7AEA] py-3 text-center text-base font-semibold text-white hover:bg-[#6B46C1]"
      >
        Propor troca
      </button>

      {/* Botão Excluir - bem visível */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="w-full rounded-full bg-red-600 py-3 text-center text-base font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {loading ? "Excluindo..." : "Excluir anúncio"}
      </button>
    </div>
  );
}