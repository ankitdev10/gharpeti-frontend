"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/auth-context";
import {
  getOwnerApplications,
  getUserApplications,
} from "@/lib/providers/applications";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { Badge } from "../ui/badge";

export const ApplicationsTable = () => {
  const { user } = useContext(AuthContext);
  const type = user?.type;

  const { data } = useQuery({
    queryKey: ["applications", type, user?.id],
    queryFn: () =>
      type === "gharpeti" ? getOwnerApplications() : getUserApplications(),
  });

  console.log(data);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>{type === "customer" ? "Feedback" : "User"}</TableHead>
            <TableHead>Offered Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((data) => (
            <TableRow className="" key={data?.id}>
              <TableCell className="font-medium">{data?.id}</TableCell>
              <TableCell>{data.property?.title}</TableCell>
              <TableCell className="">
                {data?.property.location.split(",")?.splice(0, 3).join("")}
              </TableCell>
              <TableCell className="align-middle">
                {type === "customer"
                  ? data?.feedback.substring(0, 15) + "..."
                  : data?.user?.fullName}
              </TableCell>
              <TableCell className="">
                {formatPrice(data?.offeredPrice)}
              </TableCell>
              <TableCell>
                <Status status={data?.status} />
              </TableCell>
              <TableCell>
                <Link href={`/profile/me/application/${data?.id}`}>
                  <EyeIcon size={20} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Status = ({
  status,
}: {
  status: "Pending" | "Rejected" | "Approved";
}) => {
  return (
    <Badge
      className={cn({
        "bg-yellow-400 hover:bg-yellow-300": status === "Pending",
        "bg-green-400 hover:bg-green-300": status === "Approved",
        "bg-red-400 hover:bg-red-300": status === "Rejected",
      })}
    >
      {status}
    </Badge>
  );
};
