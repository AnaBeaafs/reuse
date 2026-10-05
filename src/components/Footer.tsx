import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F7F4F9]">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h3 className="text-2xl font-bold text-[#6B46C1]">RE.USE</h3>
        <p className="mt-2 text-[#718096]">Reutilize. Economize. Conecte-se.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#718096]">
          <Link href="/">Início</Link>
          <Link href="/itens">Itens</Link>
          <Link href="/conscientizacao">Conscientização</Link>
          <Link href="/ranking">Ranking</Link>
        </div>

        <p className="mt-8 text-sm text-[#718096]">
          © {new Date().getFullYear()} ReUse. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}