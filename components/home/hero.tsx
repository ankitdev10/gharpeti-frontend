import api from "@/lib/api";
import { PropertyCard } from "../properties/property-card";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const Hero = () => {
  return (
    <div className="px-12 light:bg-gray-100 py-20 min-h-[calc(100vh-64.8px)] grid grid-cols-[600px_1fr] items-center gap-16">
      <div className="space-y-6">
        <h1 className="text-6xl font-inter font-bold">
          Rent or sell your <span className="text-primary">property.</span>
        </h1>

        <p className="">
          Gharpeti is a platform that allows you to rent or sell your property
          with ease. Whether you&apos;re a homeowner or a business owner,
          Gharpeti has everything you need to make the most of your property.
        </p>

        <div className="flex items-center  border-l">
          <div className="border-r px-8">
            <h2 className="text-primary font-bold text-3xl">50k+</h2>
            <h3 className="text-sm text-muted-foreground">renters</h3>
          </div>
          <div className="px-8">
            <h2 className="text-primary font-bold text-3xl">20k+</h2>
            <h3 className="text-sm text-muted-foreground">properties</h3>
          </div>
        </div>

        <Tabs>
          <TabsList className="w-max">
            <TabsTrigger value="rent">Rent</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="rent">
            <Card>
              <CardContent className="p-2 flex items-center space-x-2">
                <Input autoFocus placeholder="Search for a property" />
                <Input placeholder="Number of rooms" />
                <Button>Browse</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sell">Sell</TabsContent>
        </Tabs>
      </div>

      <div className="relative h-full hidden md:block">
        <div className="absolute z-10 inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/hero-map2.jpg')] before:bg-cover before:blur-[1px] before:-z-10"></div>
        <div className="relative z-20 p-4  h-full">
          <PropertyCard className="absolute -left-12" />
          <PropertyCard className="absolute  -bottom-6 -right-6" />
        </div>
      </div>
    </div>
  );
};
