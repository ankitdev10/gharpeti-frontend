import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

export const ProperyCardSkeleton = ({ num = 3 }) => {
  return (
    <div className={cn("grid grid-cols-3 gap-16", {})}>
      {Array.from({
        length: num,
      }).map((_, i) => (
        <Card className="flex flex-col space-y-3" key={i}>
          <CardContent className="p-0">
            <Skeleton className="h-[224px] rounded-lg" />
            <div className="space-y-4 p-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[220px]" />

              <Skeleton className="h-[2px] rounded-sm w-full" />
              <div className="flex gap-2">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
