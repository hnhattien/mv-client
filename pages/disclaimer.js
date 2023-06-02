import Layout from 'components/Layout'
import { siteEmail } from 'constants/seo'
import { NextSeo, WebPageJsonLd } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { siteDescription, siteKeyword, siteName, siteFullUrl } from 'constants/seo';
import { siteUrl } from 'next-sitemap.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
export default function Disclaimer() {
    const {t} = useTranslation('common');
    return (
        <Layout>
            <Head>
                <title>Disclaimer - {siteName}</title>
                <link name="keywords" content={`disclaimer fbflix fbflix, ${t('keywordsSite')}`}></link>
            </Head>

            <NextSeo
                openGraph={{
                    title: `${siteName} - ${t('siteTitle')}`,
                    description: t('siteDescription'),
                    images: [
                    {
                        url: `${siteUrl}/logo.png`,
                        alt: `${t('siteDescription')} - ${siteName}`,
                        type: 'image/png'
                    }
                    ],
                }}
                twitter={{
                    cardType: 'summary_large_image',
                    site: '@fbflix.org',
                    handle: '@fbflix.org'
                }}
            />

            <WebPageJsonLd
                id={`${siteUrl}/disclaimer`}
                description={`Disclaimer - ${siteName}`}
                lastReviewed={'2022-07-26T05:59:02.085Z'}
                reviewedBy={{ type: 'Person', name: 'fbflix.org phim moi Administrator' }}></WebPageJsonLd>
            <div className='landing-content'>
                
                <h1 className='text-5xl text-white text-center mt-20'>Disclaimer</h1>
                <div className='disclaimer-page-content'>
                    <h1 className='text-xxl'>Disclaimer</h1>
                    <p>If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email: {siteEmail}</p>

                    <h2>Disclaimers for fbflix.org</h2>
                    <p>All the information on this website - https://www.fbflix.org - is published in good faith and for general information purpose only. fbflix.org does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (fbflix.org), is strictly at your own risk. fbflix.org will not be liable for any losses and/or damages in connection with the use of our website.</p>
                    <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone bad.</p>
                    <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the <Link href={"/privacy"}><a>Privacy Policies</a></Link> of these sites as well as their <Link href={"/terms-of-service"}><a>Terms of Service</a></Link> before engaging in any business or uploading any information.</p>


                    <h2>Consent</h2>
                    <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>

                    <h2>Update</h2>

                    <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>

                </div>
            </div>

        </Layout>
    )
}

export const getStaticProps = async (ctx) => {
    return {
        props: {
            locale: ctx.locale,
            ...(await serverSideTranslations(ctx.locale, [ 'common']))
        }
    }
}