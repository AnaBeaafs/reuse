import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  price: number | null;
  location: string;
  imageUrl: string | null;
  category: string;
  type: string;
}

export default function ItemCard({
  id,
  title,
  price,
  location,
  imageUrl,
  category,
  type,
}: Props) {
  return (
    <Link
      href={`/itens/${id}`}
      className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl || "https://picsum.photos/400/300"}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-[#9F7AEA]/90 px-3 py-1 text-xs font-medium text-white">
          {type === "doacao" ? "Doação" : "Troca"}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-[#9F7AEA]">{category}</p>
        <h3 className="mt-1 line-clamp-1 font-semibold">{title}</h3>
        <p className="mt-1 text-lg font-bold text-[#6B46C1]">
          {formatPrice(price)}
        </p>
        <p className="mt-2 flex items-center gap-1 text-sm text-[#718096]">
          <MapPin size={14} />
          {location}
        </p>
      </div>
    </Link>
  );
}