import type { NextConfig } from "next";
import fs from "fs";
import yaml from "yaml";

const environment = process.env.NODE_ENV || "local";
const appConfig = yaml.parse(
  fs.readFileSync(`./config/${environment}.yaml`, "utf-8")
);

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: appConfig.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_TRACKING_ID: appConfig.NEXT_PUBLIC_TRACKING_ID
  }
};

export default nextConfig;
