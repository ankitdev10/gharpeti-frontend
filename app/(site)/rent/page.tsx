import { Map } from "@/components/map";
import { Filter } from "@/components/properties/filter";

export default function Rent() {
  return (
    <div className="p-12 bg-accent">
      <div>
        <h1 className="text-3xl font-bold">Search For Properties</h1>
        <Filter />
        <Map />
      </div>
    </div>
  );
}
