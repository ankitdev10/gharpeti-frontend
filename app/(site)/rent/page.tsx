import { Filter } from "@/components/properties/filter";
import { SearchResult } from "@/lib/providers/search-result";

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
        <SearchResult params={searchParams} />
      </div>
    </div>
  );
}
