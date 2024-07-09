"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loading-button";
import { useMutation } from "@tanstack/react-query";
import { createApplications } from "@/lib/providers/applications";
import { toast } from "sonner";
const sendApplicationSchema = z.object({
  contactNumber: z
    .string()
    .regex(/^\d{10}$/)
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value), {
      message: "Contact number must be a numeric value",
    }),
  offeredPrice: z.number().int().positive(),
  moveinDate: z.coerce.date(),
  propertyId: z.number().int().positive(),
  status: z.enum(["Pending", "Approved", "Rejected"]),
});

type SendApplicationSchema = z.infer<typeof sendApplicationSchema>;
export const Apply = ({
  propertyId,
  price,
}: {
  propertyId: number;
  price: number;
}) => {
  const form = useForm<SendApplicationSchema>({
    resolver: zodResolver(sendApplicationSchema),
    defaultValues: {
      status: "Pending",
      propertyId,
      offeredPrice: price,
      contactNumber: 0,
      moveinDate: new Date(),
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["apply", propertyId],
    mutationFn: createApplications,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: SendApplicationSchema) => {
    const res = await mutateAsync(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Apply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send applications</DialogTitle>
          <DialogDescription>
            You can view your applications later.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="offeredPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offerd Price p/m</FormLabel>
                    <FormControl>
                      <Input placeholder="1000" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact number</FormLabel>
                    <FormControl>
                      <Input placeholder="1000" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moveinDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Move In Date</FormLabel>
                    <FormDescription className="text-xs">
                      Your prefered date to move in if application approved.
                    </FormDescription>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                loading={true}
                loadingText="Sending..."
                defaultText="Send"
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
