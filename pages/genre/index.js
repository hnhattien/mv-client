import Head from 'next/head'
import requester from '../../lib/api/requester'
import Layout from '../../components/Layout'
import { CarouselJsonLd, CollectionPageJsonLd, NextSeo, WebPageJsonLd } from 'next-seo';
import { siteDescription, siteFullUrl, siteKeyword, siteName, siteTitle, subDomainSiteUrl } from 'constants/seo';
import { siteUrl } from 'next-sitemap.config';
import _ from 'lodash';
import FilmPostLayout from 'components/Common/FilmPostLayout';
import GenreLayout from 'components/Common/GenreLayout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MovieGenres } from 'constants/config';

export default function Gerne({data}) {
  const { t, i18n } = useTranslation('common');
  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
        <link name="keywords" content={t('keywordsSite')}></link>
        
        
      </Head>
      
      <NextSeo
      languageAlternates={
        [
          {
            hrefLang: 'en',
            href: `${siteFullUrl}/en/genre`
          },
          {
            hrefLang: 'vi-vn',
            href: `${siteFullUrl}/vi/genre`
          }
        ]
      }
      title={t('siteTitle')}
      description={t('siteDescription')}
      canonical={`${subDomainSiteUrl}/${i18n.language}/genre`}
      openGraph={{
        type: 'website',
        url: `${siteFullUrl}/${i18n.language}/genre`,
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
          site:'@fbflix.org',
          handle: '@fbflix.org'
        }}
      />
     <div className='inner-content'>
        <div className='movie-genres'>
            {data && <GenreLayout t={t} data={data}/>}
        </div>
     </div>
            

    </Layout>
  )
 
}

export const getStaticProps = async (ctx) => {
  
    let data = MovieGenres;

    
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, [ 'common'])),
       data: data,
       locale: ctx.locale
      },  
    }
  
}