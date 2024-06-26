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
import { ChevronLeft } from "lucide-react";
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
          <div className="space-y-1">
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

            <h1 className="text-4xl font-semibold tracking-wide">
              {data.title}
            </h1>

            <h4 className="text font-medium text-muted-foreground ">
              Kathmandu, Teset, test, test, teest
            </h4>

            <h5 className="text-primary text-2xl font-semibold">
              {formatPrice(data.price) + " per month"}
            </h5>
          </div>
          <Bookmark />
        </div>

        <div className="mt-4">
          <Carousel slides={images} options={{}} />
        </div>
      </div>

      <div className="scrollbar shadow-lg overflow-y-scroll max-h-[calc(100vh-100px)] p-4 sticky space-y-4 right-8">
        <h2 className="text-xl font-semibold mb-4">About the home</h2>
        <p className="text-muted-foreground text-justify">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful. Nor again is there
          anyone who loves or pursues or desires to obtain pain of itself,
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-4">Other Attributes</h2>

          <div className="border divide-y">
            <div className="grid grid-cols-2">
              <h6 className="border-r bg-muted p-2">key</h6>
              <h6 className=" p-2">value</h6>
            </div>
            <div className="grid grid-cols-2">
              <h1 className="border-r bg-muted p-2">key</h1>
              <h1 className=" p-2">value</h1>
            </div>

            <div className="grid grid-cols-2">
              <h1 className="border-r bg-muted p-2">key</h1>
              <h1 className=" p-2">value</h1>
            </div>
            <div className="grid grid-cols-2">
              <h1 className="border-r bg-muted p-2">key</h1>
              <h1 className=" p-2">value</h1>
            </div>
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
