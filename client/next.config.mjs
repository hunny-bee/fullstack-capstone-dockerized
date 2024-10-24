/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ["source.unsplash.com", "picsum.photos", "images.unsplash.com"],
    },
    i18n: {
      locales: ["en", "pt", "es", "ar", "zh"],
      defaultLocale: "en",
      localeDetection: true,
    },
  };
  
  export default nextConfig;
  