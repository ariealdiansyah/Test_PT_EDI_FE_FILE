/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/user/:path*',
                destination: 'http://localhost:8090/:path*',
            },
        ]
    },
}

module.exports = nextConfig
