# ReUse Web — Next.js (Fase 6)

Plataforma de **troca e reutilização sustentável** desenvolvida com **Next.js 15 (App Router)**.

## Área desenvolvida

**Marketplace de Itens (troca e doação)** — com API REST, filtros, favoritos, ranking e conscientização.

### Objetivos
- Facilitar troca e doação de itens usados
- Estimular consumo consciente e economia circular
- Engajar usuários com ranking de pontos e favoritos
- Expor uma API de produtos/itens consumida pelo front

### Funcionalidades
- Home com banner, busca funcional e categorias
- Listagem de itens com busca, categoria, tipo (troca/doação) e ordenação
- Detalhe do item + “Tenho interesse”, favoritar e compartilhar
- Publicar item via API (`POST /api/itens`)
- Favoritos (localStorage)
- Ranking de usuários
- Página de conscientização ambiental
- Perfil com itens do usuário

## API de itens

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/itens` | Lista itens (`q`, `categoria`, `type`, `sort`) |
| POST | `/api/itens` | Cria item |
| GET | `/api/itens/[id]` | Detalhe |
| DELETE | `/api/itens/[id]` | Remove item |
| GET | `/api/ranking` | Ranking de usuários |

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

> Esta versão usa **store em memória** (sem PostgreSQL obrigatório) para facilitar demo e hospedagem. O schema Prisma original permanece no projeto caso queira conectar um banco depois.

## Deploy
Vercel recomendado.

## Stack
- Next.js 15 · React 19 · TypeScript · Tailwind CSS · Lucide
