import Layout from 'components/Layout'
import { siteEmail } from 'constants/seo'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { siteDescription, siteKeyword, siteName } from 'constants/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function UpComing() {
    return (
        <Layout>
            <Head>
                <title>Coming soon - {siteName}</title>
                <link name="keywords" content={`disclaimer fbflix fbflix, ${siteKeyword}`}></link>
                
                <meta name='robots' content='nofollow,noindex'></meta>
  
            </Head>

            <NextSeo
                twitter={{
                    cardType: 'summary_large_image',
                    site: '@fbflix.org',
                    handle: '@fbflix.org'
                }}
            />
            <div className='landing-content'>
                <h1 className='text-5xl text-white text-center mt-20'>Coming soon</h1>
                <div className='disclaimer-page-content'>
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