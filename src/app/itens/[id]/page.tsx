"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ItemRecord } from "@/lib/items-store";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Heart, MapPin, MessageCircle, Share2, Tag, User } from "lucide-react";

export default function ItemDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [item, setItem] = useState<ItemRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/itens/${id}`);
        const json = await res.json();
        if (json.success) setItem(json.data);
      } catch {}
      try {
        const favs: string[] = JSON.parse(localStorage.getItem("@ReUse:favorites") || "[]");
        setLiked(favs.includes(id));
      } catch {}
      setLoading(false);
    })();
  }, [id]);

  const toggleFav = () => {
    const next = !liked;
    setLiked(next);
    try {
      const favs: string[] = JSON.parse(localStorage.getItem("@ReUse:favorites") || "[]");
      const updated = next ? [...new Set([...favs, id])] : favs.filter((x) => x !== id);
      localStorage.setItem("@ReUse:favorites", JSON.stringify(updated));
    } catch {}
    setToast(next ? "Adicionado aos favoritos" : "Removido dos favoritos");
    setTimeout(() => setToast(null), 2000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: item?.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setToast("Link copiado!");
      setTimeout(() => setToast(null), 2000);
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-[#718096]">Carregando item...</p>;
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-[#718096]">Item não encontrado.</p>
        <Link href="/itens" className="mt-4 inline-block text-[#6B46C1] hover:underline">
          Voltar aos itens
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-[#718096] hover:text-[#6B46C1]"
        >
          <ArrowLeft size={18} /> Voltar
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full border p-2 hover:bg-white"
            aria-label="Compartilhar"
          >
            <Share2 size={18} />
          </button>
          <button
            type="button"
            onClick={toggleFav}
            className={`rounded-full border p-2 ${liked ? "text-red-500" : ""}`}
            aria-label="Favoritar"
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f3f0ff]">
          <Image
            src={item.imageUrl || "https://picsum.photos/600/400"}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-[#9F7AEA]/95 px-3 py-1 text-xs font-semibold text-white">
            {item.type === "doacao" ? "Doação" : "Troca"}
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-[#9F7AEA]">{item.category}</p>
          <h1 className="mt-1 text-3xl font-bold text-[#2D3748]">{item.title}</h1>
          <p className="mt-3 text-2xl font-bold text-[#6B46C1]">{formatPrice(item.price)}</p>

          <div className="mt-6 space-y-2 text-sm text-[#718096]">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {item.location}
            </p>
            <p className="flex items-center gap-2">
              <Tag size={16} /> {item.category} · {item.status}
            </p>
            <p className="flex items-center gap-2">
              <User size={16} /> {item.userName || "Usuário ReUse"}
            </p>
          </div>

          <h2 className="mt-8 font-semibold text-[#2D3748]">Descrição</h2>
          <p className="mt-2 leading-relaxed text-[#4A5568]">
            {item.description || "Sem descrição."}
          </p>

          <button
            type="button"
            disabled={requested}
            onClick={() => {
              setRequested(true);
              setToast("Interesse registrado! O anunciante será notificado.");
              setTimeout(() => setToast(null), 2500);
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#9F7AEA] py-3.5 font-semibold text-white hover:bg-[#6B46C1] disabled:opacity-60"
          >
            <MessageCircle size={18} />
            {requested ? "Interesse enviado" : "Tenho interesse"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#48BB78] px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
