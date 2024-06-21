"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { DialogDescription } from "@radix-ui/react-dialog";
import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FIlterQueryParams, slugifyFilter } from "./slugify-filter";
import { usePathname, useRouter } from "next/navigation";
import { Map } from "../map";

export const Filter = () => {
  const [selected, setSelected] = useState<FIlterQueryParams>();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="bg-white rounded-md p-6 grid grid-cols-4 gap-12">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex flex-col justify-center space-y-1"
          >
            <h5 className="text-muted-foreground">Location</h5>
            <h4 className="text-sm font-medium max-w-full ">
              {selected?.location?.address?.substring(0, 20) ??
                "Select a Location"}
            </h4>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Location</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              We will suggest properties withing 10 KM of entered location.
            </DialogDescription>
          </DialogHeader>
          <Map
            onLocationSelect={(e) => {
              console.log(e);
              setSelected((prev) => ({
                ...prev,
                location: {
                  address: e.address,
                  lat: e.latitude,
                  lng: e.longitude,
                },
              }));
            }}
          />
          <div className="flex space-x-2 items-center">
            <MapPinIcon />
            <h5 className="text-muted-foreground text-sm font-medium line-clamp-1">
              {selected?.location?.address}
            </h5>
          </div>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border-l-2">
        <Select
          onValueChange={(e) => {
            const [minPrice, maxPrice] = e.split("-");
            setSelected((prev) => ({
              ...prev,
              price: {
                minPrice,
                maxPrice,
              },
            }));
          }}
        >
          <SelectTrigger className="flex flex-col justify-center space-y-1 border-none ring-0">
            <h5 className="text-muted-foreground">Location</h5>
            <h4 className="text-sm font-medium max-w-full">
              {selected?.price
                ? `RS. ${selected.price.minPrice} - RS. ${selected.price.maxPrice}`
                : "Select price range"}
            </h4>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price Range</SelectLabel>
              <SelectItem value={"1000-5000"}>RS. 1000 - RS. 5000</SelectItem>
              <SelectItem value="5000-10000">RS. 5000 - RS. 10000</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="border-l-2">
        <Select
          onValueChange={(e) => {
            setSelected((prev) => ({
              ...prev,
              rooms: e,
            }));
          }}
        >
          <SelectTrigger className="flex flex-col justify-center space-y-1 border-none ring-0">
            <h5 className="text-muted-foreground">Location</h5>
            <h4 className="text-sm font-medium max-w-full">
              {selected?.rooms ?? "Select rooms"}
            </h4>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rooms</SelectLabel>
              <SelectItem value={"1"}>1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        onClick={() => {
          if (!selected) return;

          const slugifiedStr = slugifyFilter(selected);
          router.push(pathname + slugifiedStr, {
            scroll: false,
          });
        }}
      >
        Search
      </Button>
    </div>
  );
};
