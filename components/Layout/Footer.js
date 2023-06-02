import { siteDescriptionFooter, siteFullUrl, siteName } from "constants/seo";
import Link from "next/link";
import React from "react";

export default function Footer({ t }) {
  return (
    <div className="footer">
      {/* <div className="desc p-10 text-slate-400"> 
      <p>
        <a href={siteFullUrl}>
        <strong>{siteName}</strong></a> {t('siteDescriptionFooter')}</p> 
        </div>
       <h4 className='text-center text-white'>&#169; 2022 {siteName} - All Rights Reserved</h4>
       <div className='flex justify-center about-site-links'>
        <Link href={"/about"}><a>{t('about-us')}</a></Link>
        <Link href={"/contact"}><a>{t('contact')}</a></Link>
        <Link href={"/privacy"}><a>{t('privacy')}</a></Link>
        <Link href={"/disclaimer"}><a>{t('disclaimer')}</a></Link>
        <Link href={"/terms-of-service"}><a>{t('terms-of-service')}</a></Link>
       </div> */}
    </div>
  );
}
