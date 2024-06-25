import { Loader } from "lucide-react";

export const Loading = () => (
  <div className="min-h-[calc(100vh-65px)] grid place-items-center">
    <Loader className="animate-spin" />
  </div>
);
