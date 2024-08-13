import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const ImagePreview = ({ link }: { link: string }) => {
  console.log(link);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative h-60 w-60">
          <Image
            src={link}
            alt={"Property Image"}
            quality={80}
            fill
            sizes="400px"
            className="absolute size-full object-cover hover:scale-105 rounded-sm transition-all duration-300 overflow-hidden"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 w-[600px] aspect-video">
        <div className="relative size-full">
          <Image
            src={link}
            alt="image"
            fill
            sizes="400px"
            className="rounded-sm absolute size-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
