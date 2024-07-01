"use client";
import { getProperyOfOwner } from "@/lib/providers/properties";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Map } from "../map";
import { EditIcon, LocateFixedIcon, LocateIcon, Pin } from "lucide-react";

export const OwnerProperty = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["owner", "property"],
    queryFn: () => getProperyOfOwner(),
  });

  return (
    <section className="mt-8">
      {isLoading
        ? "loading"
        : data?.data.map((data) => (
            <div
              className="border p-4 rounded-md grid grid-cols-2 gap-12"
              key={data.id}
            >
              <div>
                <div className="relative h-[300px]">
                  <Image
                    src="/house.jpg"
                    alt=""
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-xl flex gap-2 items-center space-x-2 font-medium text-muted-foreground">
                    {data.title}

                    <span className="">
                      {data?.enabled ? (
                        <Badge>Enabled</Badge>
                      ) : (
                        <Badge variant="destructive">Disabled</Badge>
                      )}
                    </span>
                  </h1>
                  <div className="flex items-center space-x-2">
                    <Pin size={16} className="text-gray-500" />
                    <span className="text-sm text-muted-foreground">
                      {data?.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {data?.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Other Attributes
                  </h2>

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

                <Button className="space-x-2 flex items-center">
                  <EditIcon size={16} />
                  <span>Edit</span>
                </Button>
              </div>
            </div>
          ))}
    </section>
  );
};
