"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("joao@reuse.app");
  const [password, setPassword] = useState("123456");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!loading && user) {
    router.replace("/perfil");
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/perfil");
    } catch {
      setError("Não foi possível entrar. Tente novamente.");
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-[#6B46C1]">
          RE<span className="text-[#9F7AEA]">.USE</span>
        </h1>
        <p className="mt-2 text-center text-[#718096]">
          Entre para trocar, doar e ganhar pontos
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-[#2D3748]">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#9F7AEA]"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[#2D3748]">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#9F7AEA]"
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#9F7AEA] py-3 font-semibold text-white hover:bg-[#6B46C1] disabled:opacity-60"
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#718096]">
          Não tem conta?{" "}
          <Link href="/register" className="font-semibold text-[#6B46C1] hover:underline">
            Cadastre-se
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-[#A0AEC0]">
          Demo: qualquer e-mail e senha funcionam. Use <strong>joao@</strong> ou <strong>maria@</strong> para perfis prontos.
        </p>
      </div>
    </div>
  );
}
