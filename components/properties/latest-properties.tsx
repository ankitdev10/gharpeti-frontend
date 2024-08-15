import { Property } from "@/lib/providers/properties";
import { PropertyCard } from "./property-card";
import Link from "next/link";

export const LatestProperties = ({
  properties,
}: {
  properties: Property[];
}) => {
  return (
    <div className="px-12 py-20">
      <h1 className="text-2xl text-primary font-semibold">Latest Properties</h1>
      <p className="text-muted-foreground font-medium">
        Explore the latest properties.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-8">
        {properties.map((data) => (
          <Link href={`/property/${data.id}`} key={data.id}>
            <PropertyCard key={data.id} data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};
