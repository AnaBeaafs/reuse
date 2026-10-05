"use client";

import Link from "next/link";
import { Heart, LogOut, Plus, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-[#FDFBF7]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-[#6B46C1]">
          RE.USE
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/itens" className="text-sm font-medium hover:text-[#9F7AEA]">
            Itens
          </Link>
          <Link href="/favoritos" className="text-sm font-medium hover:text-[#9F7AEA]">
            Favoritos
          </Link>
          <Link href="/conscientizacao" className="text-sm font-medium hover:text-[#9F7AEA]">
            Conscientização
          </Link>
          <Link href="/ranking" className="text-sm font-medium hover:text-[#9F7AEA]">
            Ranking
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/favoritos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] hover:bg-white md:hidden"
            aria-label="Favoritos"
          >
            <Heart size={18} />
          </Link>

          <Link
            href={user ? "/itens/novo" : "/login"}
            className="flex items-center gap-2 rounded-full bg-[#9F7AEA] px-3 py-2 text-sm font-semibold text-white hover:bg-[#6B46C1] sm:px-4"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Publicar</span>
          </Link>

          {!loading && user ? (
            <>
              <Link
                href="/perfil"
                className="hidden max-w-[120px] truncate text-sm font-medium text-[#6B46C1] sm:block"
              >
                {user.name}
              </Link>
              <Link
                href="/perfil"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] hover:bg-white"
                aria-label="Perfil"
              >
                <User size={18} />
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] text-[#718096] hover:bg-white hover:text-red-500"
                aria-label="Sair"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-[#9F7AEA] px-4 py-2 text-sm font-semibold text-[#6B46C1] hover:bg-[#9F7AEA]/10"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
