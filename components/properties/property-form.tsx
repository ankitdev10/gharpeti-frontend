"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Property,
  createProperty,
  updateProperty,
} from "@/lib/providers/properties";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Map } from "../map/index";
import { Location } from "../map/map";
import { LoadingButton } from "../ui/loading-button";
import { Switch } from "./switch";
import { Uploader } from "../upload";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

const propertySchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  location: z
    .string()
    .max(255, { message: "Location must be 255 characters or less" }),
  // .nonempty({ message: "Location is required" })
  latitude: z.number({ required_error: "Latitude is required" }),
  longitude: z.number({ required_error: "Longitude is required" }),
  enabled: z.boolean().optional(),
  images: z.array(z.string()).optional(),
  rooms: z.coerce.number({ required_error: "Rooms are required" }),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(1, "Price can not be less than 1."),
  attributes: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "value is required"),
      }),
    )
    .optional(),
});

type PropertySchema = z.infer<typeof propertySchema>;

export const PropertyForm = ({
  id,
  property,
}: {
  id?: string;
  property?: Property;
}) => {
  const isCreating = Boolean(id);
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>([]);
  const form = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title ?? "",
      description: property?.description ?? "",
      location: property?.location ?? "",
      latitude: property?.latitude ?? 0,
      longitude: property?.longitude ?? 0,
      enabled: property?.enabled ?? true,
      images: property?.images ?? [],
      rooms: property?.rooms ?? 0,
      price: (property?.price ?? 0) / 100 ?? 0,
      attributes: property?.attributes ?? [
        {
          key: "Bathroom",
          value: "1",
        },
      ],
    },
  });

  const { mutateAsync: update, isPending } = useMutation({
    mutationFn: updateProperty,
    mutationKey: isCreating ? ["creating"] : ["updating"],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: PropertySchema) => {
    console.log(values);
    if (id) {
      const res = await update({
        id: parseInt(id),
        ...values,
      });
      if (res.status === 200) {
        toast.success("Updated Successfully");
        router.refresh();
      }
    } else {
      const res = await createProperty(values);
      if (res.data) {
        toast.success("Property created successfully");
        router.push("/profile/gharbheti/properties");
      }
    }
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Property Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="location" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Location</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <Input {...field} placeholder="Property Location" /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="latitude" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Latitude</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <Input {...field} placeholder="Latitude" /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="longitude" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Longitude</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <Input {...field} placeholder="Longitude" /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Number of Rooms" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  className="block"
                  {...field}
                  placeholder="Property Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormLabel>Enabled</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Upload Images </FormLabel>
          <Uploader fn={(e) => console.log(e)} />
        </div>
        <div>
          <FormField
            control={form.control}
            name="location"
            // disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input disabled {...field} placeholder="Property Location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8">
            <FormLabel>Attributes</FormLabel>
            <Table>
              <TableCaption>Add Attributes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <FormField
                        name={`attributes.${index}.key`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell>
                      <FormField
                        name={`attributes.${index}.value`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TrashIcon
                        color="red"
                        size={16}
                        className="cursor-pointer"
                        onClick={() => remove(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell className="text-right" colSpan={4}>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() =>
                        append({
                          key: "",
                          value: "",
                        })
                      }
                    >
                      Add More
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-8">
            <Map
              location={
                property
                  ? {
                      latitude: property?.latitude,
                      longitude: property?.longitude,
                      address: property?.location,
                    }
                  : undefined
              }
              handleSelect={(e: Location) => {
                form.setValue("longitude", e.longitude);
                form.setValue("latitude", e.latitude);
                form.setValue("location", e.address);
              }}
            />
          </div>
        </div>

        <LoadingButton
          type="submit"
          loading={isPending}
          defaultText="Save"
          loadingText="Saving.."
          disabled={isPending || !form.formState.isValid}
        />
      </form>
    </Form>
  );
};
