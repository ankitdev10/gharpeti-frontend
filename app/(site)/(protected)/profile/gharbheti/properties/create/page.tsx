import { PropertyForm } from "@/components/properties/property-form";
import { getProperty } from "@/lib/providers/properties";

export default async function EditPropertyPage() {
  return (
    <section className="px-24 py-12">
      <PropertyForm />
    </section>
  );
}
