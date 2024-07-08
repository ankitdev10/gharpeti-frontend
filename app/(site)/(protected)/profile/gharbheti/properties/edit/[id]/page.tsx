import { PropertyForm } from "@/components/properties/property-form";
import { getProperty } from "@/lib/providers/properties";

export default async function EditPropertyPage({ params }: any) {
  const property = await getProperty(params.id);
  if (!property) {
    return <h1>Nope</h1>;
  }
  return (
    <section className="px-24 py-12">
      <PropertyForm property={property.data} id={params.id} />
    </section>
  );
}
