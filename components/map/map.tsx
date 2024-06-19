"use client";

import { cn } from "@/lib/utils";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export type MapProps = {
  className?: string;
  onLocationSelect: (location: any) => void;
};

type SearchProps = {
  provider: OpenStreetMapProvider;
  onResultSelect: (result: any) => void;
};

const Search = ({ provider, onResultSelect }: SearchProps) => {
  const map = useMap();

  useEffect(() => {
    //@ts-ignore
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter address",
      keepResult: true,
      updateMap: true,
      autoComplete: true,
      autoCompleteDelay: 250,
      searchBounds: [
        [26.347, 80.058],
        [30.447, 88.199],
      ],
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result: any) => {
      if (result && result.location) {
        const { x, y, label } = result.location;
        onResultSelect({ latitude: y, longitude: x, address: label });
      }
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, provider, onResultSelect]);

  return null;
};

export const MapComponent = ({
  className = undefined,
  onLocationSelect,
}: MapProps) => {
  const provider = new OpenStreetMapProvider({
    params: {
      countrycodes: "NP", // Country code for Nepal
      viewbox: "80.058,30.447,88.199,26.347", // Bounding box for Nepal
      bounded: 1, // Restrict results to the bounding box
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleResultSelect = (result: any) => {
    setSelectedLocation(result);
    onLocationSelect(result);
  };

  return (
    <MapContainer
      center={[28.3949, 84.124]}
      zoom={1}
      className={cn("h-full", className)}
    >
      <Search provider={provider} onResultSelect={handleResultSelect} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedLocation && (
        <Marker
          position={[selectedLocation.latitude, selectedLocation.longitude]}
        >
          <Popup>
            {selectedLocation.address} <br />
            Latitude: {selectedLocation.latitude} <br />
            Longitude: {selectedLocation.longitude}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
