import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/sponsors/prospectus",
                destination: "/firehacks/prospectus",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
