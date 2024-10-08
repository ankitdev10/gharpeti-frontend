"use client";
import { getProperyOfOwner } from "@/lib/providers/properties";
import { useQuery } from "@tanstack/react-query";
import { EditIcon, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
              className="border p-4 mt-8 rounded-md grid grid-cols-2 gap-12"
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
                    {data.attributes.map((data, index) => (
                      <div key={data.key + index} className="grid grid-cols-2">
                        <h6 className="border-r bg-muted p-2">{data.key}</h6>
                        <h6 className=" p-2">{data.value}</h6>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  className=""
                  href={`/profile/gharbheti/properties/edit/${data.id}`}
                >
                  <Button className="mt-4 space-x-2 flex items-center">
                    <EditIcon size={16} />
                    <span>Edit</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
    </section>
  );
};
