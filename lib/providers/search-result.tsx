"use client";

import { PropertyCard } from "@/components/properties/property-card";
import { searchProperties } from "./properties";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProperyCardSkeleton } from "@/components/properties/propery-card-skeleton";
import { Frown, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export const SearchResult = ({ params }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["search", Object.values(params).join("-")],
    queryFn: () => searchProperties(params),
  });
  const router = useRouter();

  const isFilterApplied = Object.keys(params).length > 0;
  return (
    <section>
      {isFilterApplied && (
        <div className="ml-auto flex space-x-2  w-fit">
          <span className="text-sm font-medium text-muted-foreground">
            Remove{" "}
          </span>
          <XIcon
            className="cursor-pointer"
            onClick={() => router.push("/rent")}
          />
        </div>
      )}
      {isLoading ? (
        <ProperyCardSkeleton num={5} />
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {data?.data.map((d) => (
            <Link href={`property/${d.id}`} key={d.id}>
              <PropertyCard
                data={d}
                className="hover:scale-105 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      )}
      {data?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Frown size={64} color="red" />
          <h5 className="text-muted-foreground font-medium text-xl">
            Uh oh! No results found
          </h5>

          <Button
            className="mt-4"
            onClick={() => {
              router.push("/rent");
            }}
          >
            Reset filter
          </Button>
        </div>
      )}
    </section>
  );
};
