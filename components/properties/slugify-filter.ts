export type FIlterQueryParams = {
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  price?: {
    minPrice: string;
    maxPrice: string;
  };
  rooms?: string;
};

export const slugifyFilter = (input: FIlterQueryParams) => {
  let str = "";

  for (const type in input) {
    if (type === "location" && input[type]) {
      str += `&lat=${input[type]?.lat}&lng=${input[type]?.lng}`;
    } else if (type === "price") {
      str += `&minPrice=${input[type]?.minPrice}&maxPrice=${input[type]?.maxPrice}`;
    } else if (type === "rooms") {
      str += `&rooms=${input[type]}`;
    }
  }

  // we have appended '&' for each query params but here we simply replace the first one with '?' to build proper query string
  return "?" + str.substring(1);
};
