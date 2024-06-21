"use client";

import { PropertyCard } from "@/components/properties/property-card";
import { searchProperties } from "./properties";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export const SearchResult = async ({ params }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["search", Object.values(params).join("-")],
    queryFn: () => searchProperties(params),
  });

  return (
    <div className="grid grid-cols-3 gap-16">
      {data?.data.map((d) => (
        <Link href={`property/${d.id}`} key={d.id}>
          <PropertyCard className="hover:scale-105" key={d.id} />
        </Link>
      ))}
    </div>
  );
};
