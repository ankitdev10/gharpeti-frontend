import { Filter } from "@/components/properties/filter";
import { ProperyCardSkeleton } from "@/components/properties/propery-card-skeleton";
import { SearchResult } from "@/lib/providers/search-result";
import { Suspense } from "react";

export default async function Rent({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  return (
    <div className="p-12 bg-accent space-y-12">
      <h1 className="text-3xl font-bold">Search For Properties</h1>

      <div className="">
        <Filter />
      </div>

      <div className="px-12">
        <Suspense fallback=<ProperyCardSkeleton />>
          <SearchResult params={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
