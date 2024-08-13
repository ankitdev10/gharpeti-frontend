import { Apply } from "@/components/applications/apply";
import { Map } from "@/components/map";
import { Bookmark } from "@/components/properties/bookmark";
import { Carousel } from "@/components/properties/carousel/carousel";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProperty } from "@/lib/providers/properties";
import { formatPrice } from "@/lib/utils/formatPrice";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";

const PropertyDetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getProperty(params.id);

  // TODO: make an universal err.tsx file

  const images = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/10628465/pexels-photo-10628465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <section className="px-12 py-2 grid grid-cols-2 gap-8">
      <div className="">
        <div className="flex gap-x-12 items-center">
          <div className="">
            <Link href={"/rent"}>
              <Button
                variant="ghost"
                className="hover:bg-transparent group p-0"
              >
                <ChevronLeft
                  size={22}
                  className="text-primary font-semibold group-hover:-translate-x-1 transition-all ease-linear delay-75"
                />
                <span className="text-primary font-semibold">
                  Back to filters
                </span>
              </Button>
            </Link>
            <div className="space-y-6 mt-12">
              <h1 className="text-4xl font-semibold tracking-wide">
                {data.title}
              </h1>

              <div className="flex items-center gap-x-4">
                <MapPin className="text-primary" size={40} />
                <h4 className="text font-medium text-muted-foreground ">
                  {data.location}
                </h4>
              </div>

              <h5 className="text-primary text-2xl font-semibold">
                {formatPrice(data.price) + " per month"}
              </h5>
            </div>
          </div>
          <Bookmark />
        </div>

        <div className="mt-8">
          <Carousel slides={images} options={{}} />
        </div>
      </div>

      <div className="scrollbar shadow-lg overflow-y-scroll max-h-[calc(100vh-100px)] p-4 sticky space-y-4 right-8">
        <h2 className="text-xl font-semibold mb-4">About the home</h2>
        <p className="text-muted-foreground text-justify">{data.description}</p>

        <div>
          <h2 className="text-xl font-semibold mb-4">Other Attributes</h2>
          <div className="border divide-y">
            {data.attributes.map((data, index) => (
              <div key={data.key + index} className="grid grid-cols-2">
                <h6 className="border-r bg-muted p-2">{data.key}</h6>
                <h6 className=" p-2">{data.value}</h6>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Propery Owner</CardTitle>
            <CardDescription>Meet the owner of the propery.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-x-4 grid-cols-2">
            <div className="flex space-x-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="PP" />
                <AvatarFallback className="text-muted-foreground">
                  {data.owner.fullName[0]}
                  {data.owner.fullName.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <h6 className="text-muted-foreground font-semibold">
                  {data.owner.fullName}
                </h6>
                <h6 className="text-muted-foreground text-sm font-medium">
                  Joined {new Date(data.owner.createdAt).toDateString()}
                </h6>
              </div>
            </div>
            <div className="">
              <Button className="w-full">Connect</Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <Apply
            propertyId={Number(params.id)}
            price={Number(data?.price) / 100}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <Map
            location={{
              longitude: data.longitude,
              latitude: data.latitude,
              address: "hehehehe",
            }}
            enableSearch={false}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailPage;
