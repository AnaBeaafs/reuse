"use client";

import { useEffect, useState } from "react";
import type { UserRecord } from "@/lib/items-store";
import { Trophy } from "lucide-react";

export default function RankingPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ranking");
        const json = await res.json();
        if (json.success) setUsers(json.data);
      } catch {}
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <Trophy className="text-[#F6AD55]" size={28} />
        <div>
          <h1 className="text-3xl font-bold text-[#2D3748]">Ranking ReUse</h1>
          <p className="text-[#718096]">Usuários com mais pontos de impacto sustentável</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-[#718096]">Carregando ranking...</p>
      ) : (
        <ol className="space-y-3">
          {users.map((u, index) => (
            <li
              key={u.id}
              className="flex items-center justify-between rounded-2xl border bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0
                      ? "bg-[#F6AD55] text-white"
                      : index === 1
                        ? "bg-[#CBD5E0] text-[#2D3748]"
                        : index === 2
                          ? "bg-[#ED8936]/80 text-white"
                          : "bg-[#F3F0FF] text-[#6B46C1]"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#2D3748]">{u.name}</p>
                  <p className="text-sm text-[#718096]">
                    {u.city}/{u.state} · {u.level}
                  </p>
                </div>
              </div>
              <p className="font-bold text-[#6B46C1]">{u.points} pts</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
