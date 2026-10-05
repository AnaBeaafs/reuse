import Link from "next/link";
export default function ConscientizacaoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Título */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[#6B46C1] md:text-5xl">
          Conscientização
        </h1>
        <p className="mt-4 text-lg text-[#718096]">
          Entenda o impacto real da reutilização e como pequenas ações ajudam o
          planeta e a sua comunidade.
        </p>
      </div>

      <div className="space-y-6">
        {/* Card 1 */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-[#2D3748]">
            Por que reutilizar?
          </h2>
          <p className="mt-4 leading-relaxed text-[#718096]">
            A cada item reutilizado, evitamos que novos recursos naturais sejam
            extraídos e reduzimos a quantidade de lixo que vai para aterros
            sanitários. Reutilizar é uma das formas mais simples e eficazes de
            praticar a economia circular no dia a dia.
          </p>
          <p className="mt-3 leading-relaxed text-[#718096]">
            Em vez de descartar o que não usamos mais, podemos dar uma nova vida
            a esses objetos — e ainda economizar dinheiro no processo.
          </p>
        </section>

        {/* Card 2 */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-[#2D3748]">
            Estatísticas importantes
          </h2>
          <ul className="mt-4 space-y-3 text-[#718096]">
            <li className="flex gap-3">
              <span className="mt-1 text-[#9F7AEA]">●</span>
              <span>
                Mais de <strong>90%</strong> dos resíduos têxteis não são
                reciclados.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[#9F7AEA]">●</span>
              <span>
                Um único item de roupa pode economizar até{" "}
                <strong>2.700 litros de água</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[#9F7AEA]">●</span>
              <span>
                A economia circular pode reduzir significativamente as emissões
                de CO₂.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[#9F7AEA]">●</span>
              <span>
                Estender a vida útil de um produto em apenas 9 meses pode
                reduzir sua pegada de carbono em até <strong>30%</strong>.
              </span>
            </li>
          </ul>
        </section>

        {/* Card 3 */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-[#2D3748]">
            Dicas práticas para o dia a dia
          </h2>
          <ul className="mt-4 space-y-3 text-[#718096]">
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[#9F7AEA]">1.</span>
              <span>
                Antes de comprar algo novo, veja se alguém próximo está doando
                ou trocando.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[#9F7AEA]">2.</span>
              <span>
                Cuide bem dos seus itens para aumentar a vida útil deles.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[#9F7AEA]">3.</span>
              <span>
                Participe de grupos e plataformas de troca locais, como o ReUse.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[#9F7AEA]">4.</span>
              <span>
                Prefira qualidade e durabilidade em vez de consumo rápido.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 font-bold text-[#9F7AEA]">5.</span>
              <span>
                Doe ou troque o que não usa mais em vez de descartar.
              </span>
            </li>
          </ul>
        </section>

        {/* Card 4 - Destaque */}
        <section className="rounded-2xl border border-[#9F7AEA]/30 bg-[#9F7AEA]/10 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-[#6B46C1]">
            Como o ReUse ajuda
          </h2>
          <p className="mt-4 leading-relaxed text-[#718096]">
            A plataforma ReUse conecta pessoas que querem dar uma nova vida aos
            seus objetos. Ao trocar ou doar, você reduz o desperdício, economiza
            dinheiro e fortalece uma comunidade mais consciente e sustentável.
          </p>
          <p className="mt-3 leading-relaxed text-[#718096]">
            Cada troca realizada é um passo a mais em direção a um consumo mais
            responsável e a um planeta com menos lixo.
          </p>
        </section>

        {/* Call to action */}
        <div className="pt-4 text-center">
            <Link
              href="/itens"
              className="inline-block rounded-full bg-[#9F7AEA] px-8 py-3 font-semibold text-white transition hover:bg-[#6B46C1]"
            >
              Ver itens disponíveis
            </Link>
          </div>
        </div>
    </div>
  );
}