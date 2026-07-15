import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.60"],
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
