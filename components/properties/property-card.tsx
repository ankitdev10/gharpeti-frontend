import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Property } from "@/lib/providers/properties";
import { MapPin } from "lucide-react";

export const PropertyCard = ({
  className,
  data,
}: {
  className?: string;
  data: Property;
}) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-0">
        <div className="relative  aspect-video">
          <Image
            alt="Card-Image"
            fill
            src="/house.jpg"
            className="object-cover rounded-lg"
            quality={80}
          />
        </div>
        <div className="px-4 py-2 space-y-1">
          <h4 className="text-primary font-semibold text-lg">
            {formatPrice(data?.price)}
            <span className="text-xs text-muted-foreground">/ month</span>
          </h4>
          <h5 className="font-semibold text-lg">{data?.title}</h5>

          <div className="flex items-center space-x-2">
            <MapPin />
            <h6 className="text-sm font-medium">
              {data?.location.split(",").slice(0, 1).join("")}
            </h6>
          </div>

          <hr className="my-3" />

          <div className="flex gap-4 items-center">
            <div className="text-xs text-muted-foreground flex space-x-1 items-center">
              <Image src="/door.svg" alt="house" width={20} height={20} />
              <span>{data?.rooms} rooms</span>
            </div>
            {/* <div className="text-xs text-muted-foreground flex space-x-1 items-center"> */}
            {/*   <Image src="/dimension.svg" alt="house" width={20} height={20} /> */}
            {/*   <span>3 Rooms</span> */}
            {/* </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
