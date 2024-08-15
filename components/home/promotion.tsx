import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HomeIcon } from "lucide-react";
export const Promotion = () => {
  return (
    <section className="flex bg-muted justify-center rounded-sm px-48 mx-auto items-center py-20 gap-24 ">
      <div className="relative">
        <div className="relative w-[500px] h-[500px] ">
          <Image
            src="/house.jpg"
            alt="house"
            fill
            sizes="400px"
            className="absolute inset-0 object-cover rounded-lg"
          />
        </div>
        <div className="absolute bg-white   z-10 w-[300px] left-[100px] -bottom-16 mx-auto p-4 rounded-sm  text-sm">
          <h5 className="text-lg text-primary font-medium">
            Find the best deal for you.
          </h5>
          <p className="text-muted-foreground text-sm">
            From collections of properties we offer, find your perfect home.
          </p>
          <HomeIcon
            size={40}
            color="white"
            className="absolute right-0 -top-4 bg-primary rounded-full p-2"
          />
        </div>
      </div>

      <div>
        <Tabs defaultValue="tenants">
          <TabsList>
            <TabsTrigger value="tenants">For tenants</TabsTrigger>
            <TabsTrigger value="landords">For landords</TabsTrigger>
          </TabsList>
          <TabsContent
            value="tenants"
            className="flex flex-col space-y-4 max-w-[480px]"
          >
            <h1 className="font-bold text-lg">
              Find a place you can call your home.
            </h1>
            <p className="text-muted-foreground text-lg">
              Find your property with ease. Whether you are looking for a flat
              or apartment, Gharpeti has everything you need to make the most of
              your desire. No brokers involed whatsoever, direct contact with
              the landlords and virtual tour of the property.
            </p>
          </TabsContent>
          <TabsContent
            value="landords"
            className="flex flex-col space-y-4 max-w-[480px]"
          >
            <h1 className="font-bold text-lg">
              Rent your properties with ease.
            </h1>
            <p className="text-muted-foreground text-lg">
              Rent your property with ease. Whether you&apos;re a homeowner or a
              business owner, Gharpeti has everything you need to make the most
              of your property. No commisions for anyone, find your home
              buddies.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
