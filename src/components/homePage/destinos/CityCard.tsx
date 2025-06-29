import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountryBackgroundPhoto } from "@/services/getCountryBackgroundPhoto";

type CityProps = {
  name: string;
  slug: string;
};

export default function CityCard({ name, slug }: CityProps) {
  const [image, setImage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    getCountryBackgroundPhoto(slug).then((url) => {
      if (url) setImage(url);
    });
  }, [slug, hasMounted]);

  return (
    <Link href={`/destination/${slug}`}>
      <div className="rounded-xl overflow-hidden shadow-md relative w-full h-48 sm:h-56 bg-gray-200">
        {hasMounted && image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
        <div className="absolute bottom-0 w-full bg-black/40 text-white p-2 text-center text-lg font-semibold">
          {name}
        </div>
      </div>
    </Link>
  );
}
