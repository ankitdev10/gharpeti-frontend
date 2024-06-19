"use client";

import dynamic from "next/dynamic";

import { MapProps } from "./map";

const MapComponent = dynamic(
  () => import("./map").then((module) => module.MapComponent),
  {
    ssr: false,
  },
);

export const Map = (props: MapProps) => (
  <MapComponent {...props} className="min-h-[340px]" />
);
