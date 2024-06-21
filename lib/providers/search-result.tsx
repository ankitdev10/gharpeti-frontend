"use client";

import { PropertyCard } from "@/components/properties/property-card";
import { searchProperties } from "./properties";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProperyCardSkeleton } from "@/components/properties/propery-card-skeleton";
export const SearchResult = ({ params }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["search", Object.values(params).join("-")],
    queryFn: () => searchProperties(params),
  });

  return (
    <>
      {isLoading ? (
        <ProperyCardSkeleton num={5} />
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {data?.data.map((d) => (
            <Link href={`property/${d.id}`} key={d.id}>
              <PropertyCard className="hover:scale-105" key={d.id} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
