"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/itens?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border bg-white px-5 py-3 shadow-sm"
    >
      <Search size={18} className="text-[#718096]" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="O que você quer trocar hoje?"
        className="w-full bg-transparent outline-none placeholder:text-[#718096]"
      />
      <button
        type="submit"
        className="rounded-full bg-[#9F7AEA] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#6B46C1]"
      >
        Buscar
      </button>
    </form>
  );
}
