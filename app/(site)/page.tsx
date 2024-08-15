import { Hero } from "@/components/home/hero";
import { Promotion } from "@/components/home/promotion";
import { LatestProperties } from "@/components/properties/latest-properties";
import { getLatestProperties } from "@/lib/providers/properties";

export default async function Page() {
  const { data } = await getLatestProperties();
  return (
    <>
      <Hero />
      <Promotion />
      <LatestProperties properties={data} />
    </>
  );
}
