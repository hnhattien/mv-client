import NotFoundBackground from 'components/Icons/NotFoundBackground'
import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'

export default function NotFound() {
  return (
    <Layout>
        <Head>
        
          <meta name='robots' content='nofollow,noindex'></meta>
  
            <title>Page Not Found</title>
        </Head>
        <NotFoundBackground />
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