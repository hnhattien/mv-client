import Header from "./Header";
import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { siteDescription, siteFullUrl, siteName, subDomainSiteUrl } from "constants/seo";
import { SocialProfileJsonLd } from "next-seo";
import Widget from "components/Common/Widget";
import { useTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
export default function Layout({ children }) {
  const router = useRouter();
  const {t} = useTranslation('common');

  return (
    <div className='wrapper'>
      
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      <Header t={t} />

      <NextNProgress color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{

        }}/>
  
      <div className='main-content lg:m-auto'>
        {
          children
        }  
      </div>
      
      
      <Footer t={t} />
    </div>
  )
}
