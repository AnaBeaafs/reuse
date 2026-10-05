import { Suspense } from "react";

export default function ItensLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p className="py-20 text-center text-[#718096]">Carregando...</p>}>{children}</Suspense>;
}
