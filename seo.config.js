import { siteDescription, siteName, siteTitle, siteUrl } from "constants/seo";

const SEOConfig = {
  defaultTitle: `${siteName} - ${siteTitle}`,

  openGraph: {
    site_name: "MovieSite",
    type: "website",
  },
  twitter: {
    handle: "@MovieSite.org",
    site: "@MovieSite.org",
    cardType: "summary_large_image",
  },
};
export default SEOConfig;
