"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register, user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    router.replace("/perfil");
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await register(name, email, password);
    router.push("/perfil");
    setSubmitting(false);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-[#2D3748]">Criar conta</h1>
        <p className="mt-2 text-center text-[#718096]">Junte-se à comunidade ReUse</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Nome</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#9F7AEA]"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">E-mail</label>
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
            <label className="mb-1 block text-sm font-semibold">Senha</label>
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#9F7AEA]"
              placeholder="Mínimo 4 caracteres"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#9F7AEA] py-3 font-semibold text-white hover:bg-[#6B46C1] disabled:opacity-60"
          >
            {submitting ? "Criando..." : "Cadastrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#718096]">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-[#6B46C1] hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
