import { OwnerProperty } from "@/components/properties/owner-property";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const GharpetiProperties = () => {
  return (
    <div className="px-12 bg-muted py-8 relative">
      <h1 className="text-3xl font-semibold">Your Properties</h1>
      <h5 className="text-muted-foreground font-medium">
        Properties that you have listed for rent.{" "}
        {/* <span className="text-sm"> */}
        {/*   (Only a maximum of 4 properties are allowed to be listed) */}
        {/* </span> */}
      </h5>

      <OwnerProperty />

      <Link
        href="/profile/gharbheti/properties/create
        "
      >
        <Button className="absolute right-8 top-8 flex gap-2">
          <PlusIcon />
          Add
        </Button>
      </Link>
    </div>
  );
};

export default GharpetiProperties;
