"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/items-store";
import { useAuth } from "@/context/AuthContext";

export default function NovoItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title") || ""),
      description: String(form.get("description") || ""),
      price: form.get("price") === "" ? null : Number(form.get("price")),
      category: String(form.get("category") || ""),
      location: String(form.get("location") || ""),
      imageUrl: String(form.get("imageUrl") || "") || undefined,
      type: String(form.get("type") || "troca"),
      userId: user.id,
      userName: user.name,
    };

    try {
      const res = await fetch("/api/itens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Erro ao publicar");
        setLoading(false);
        return;
      }
      router.push(`/itens/${json.data.id}`);
    } catch {
      setError("Falha de conexão com a API");
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return <p className="py-20 text-center text-[#718096]">Verificando login...</p>;
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2D3748]">Publicar item</h1>
      <p className="mt-2 text-[#718096]">
        Olá, {user.name}! Cadastre um item para troca ou doação.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <input name="title" required placeholder="Título" className="w-full rounded-xl border px-4 py-3" />
        <textarea name="description" rows={3} placeholder="Descrição" className="w-full rounded-xl border px-4 py-3" />
        <select name="category" required className="w-full rounded-xl border px-4 py-3" defaultValue="Roupas">
          {CATEGORIES.filter((c) => c !== "Todos").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select name="type" className="w-full rounded-xl border px-4 py-3" defaultValue="troca">
          <option value="troca">Troca</option>
          <option value="doacao">Doação</option>
        </select>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço (vazio ou 0 = doação)"
          className="w-full rounded-xl border px-4 py-3"
        />
        <input
          name="location"
          required
          placeholder="Cidade, UF"
          className="w-full rounded-xl border px-4 py-3"
          defaultValue={user.city && user.state ? `${user.city}, ${user.state}` : "Campinas, SP"}
        />
        <input name="imageUrl" type="url" placeholder="URL da imagem (opcional)" className="w-full rounded-xl border px-4 py-3" />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#9F7AEA] py-3 font-semibold text-white hover:bg-[#6B46C1] disabled:opacity-60"
        >
          {loading ? "Publicando..." : "Publicar item"}
        </button>
      </form>
    </div>
  );
}
