import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "solvia",
    short_name: "solvia",
    description: "配信を見て、次の一手まで返すライバー事務所",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e9",
    theme_color: "#e93d73",
    lang: "ja",
  };
}
