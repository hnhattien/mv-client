import '../styles/globals.css'
import { DefaultSeo } from 'next-seo';
import { siteHostName, siteName, siteUrl } from 'constants/seo';
import SEOConfig from 'seo.config';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import GlobalStyle from '../components/Utils/globalstyles'
import { appWithTranslation, withTranslation } from "next-i18next";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  const router = useRouter();  

  return <>
      <DefaultSeo
      {...SEOConfig}
      />
      <Component {...pageProps} />
  </>
}

export default appWithTranslation(MyApp);
