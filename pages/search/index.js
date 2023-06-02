import FilmPostLayout from 'components/Common/FilmPostLayout';
import MovieList from 'components/Common/MovieList';
import Widget from 'components/Common/Widget';
import Layout from 'components/Layout';
import { siteDescription, siteFullUrl, siteKeyword, siteName, siteTitle, subDomainSiteUrl } from 'constants/seo';
import requester from 'lib/api/requester';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CarouselJsonLd, NextSeo } from 'next-seo';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import React from 'react'
import { IMAGE_CDN_BASE_URL } from 'constants/config';
import { get } from 'lodash';
import { getValueByLocale } from 'lib/util';

export default function SearchPage({data,
    topAnimationMovies, 
    topHorrorMovies, 
    topIMDBMovies, 
    topMonthlyMovies, 
    topSciMovies, 
    topWeekendMovies}) {
      const {t, i18n} = useTranslation('common');
  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
        <link name="keywords" content={t('keywordsSite')}></link>
        
        
      </Head>
      <CarouselJsonLd
      ofType='movie'
      data={
        data.map((film) => {
          return {
            name: `${getValueByLocale(film, 'title', i18n.language)} | fblix phim moi`,
            url: `${siteFullUrl}/${i18n.language}/film/${film.slug}/`,
            image: `${IMAGE_CDN_BASE_URL}/${get(film, 'slug')}`,
            description: `${getValueByLocale(film, 'description', i18n.language)} phim moi`,
            aggregateRating: {
              bestRating: 10,
              worstRating: 1,
              ratingValue: film.ratingScore,
              reviewCount: 10
            }
          }
        })
        
      }
      >

      </CarouselJsonLd>
      <NextSeo
      
      languageAlternates={
        [
          {
            hrefLang: 'en',
            href: `${siteFullUrl}/en/search/`
          },
          {
            hrefLang: 'vi-vn',
            href: `${siteFullUrl}/vi/search/`
          }
        ]
      }
      title={`${siteTitle}`}
      description={t('siteDescription')}
      
      canonical={`${subDomainSiteUrl}/${i18n.language}/search`}
      openGraph={{
        type: 'website',
        url: `${siteFullUrl}/search`,
        title: `Search on ${siteName} ${t('siteTitle')}`,
        description: t('siteDescription'),
        images: [
          {
            url: `${siteFullUrl}/logo.png`,
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
     <div className='inner-content lg:w-11/12 w-full p-4'>
     <div className={`search-result`}>
              <MovieList title={"Search Result: "} className='list-inside flex flex-wrap justify-around'>
            {
              data && data.map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
          </div>

     </div>
     <Widget
        t={t}
        topWeekendMovies={topWeekendMovies}
        topAnimationMovies={topAnimationMovies} 
        topHorrorMovies={topHorrorMovies} 
        topIMDBMovies={topIMDBMovies}
        topMonthlyMovies={topMonthlyMovies}
        topSciMovies={topSciMovies} />
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
    const { q } = ctx.query;
    let result = [];
    if(q){
      result = await requester.getSync(`/search`, ctx.locale, {
        q: q,
        select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      });
    }

    let topIMDBMovies = await requester.getSync(`/films`, 'en', {
      ratingFrom: 8,
      limit: 6,
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    })
    let topAnimationMovies = await requester.getSync(`/films`, 'vi' , {
      ratingFrom: 8, 
      limit: 6,
      category: 'animation',
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    });
    let topWeekendMovies = await requester.getSync(`/films`, 'vi', {
      ratingFrom: 8,
      limit: 6,
      rand: true,
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    })
    let topMonthlyMovies = await requester.getSync(`/films`, 'vi', {
      ratingFrom: 8,
      limit: 6,
      rand: true,
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    })
    let topSciMovies = await requester.getSync(`/films`, 'vi', {
      ratingFrom: 8,
      limit: 6,
      category: 'sci-fi',
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    })
    let topHorrorMovies = await requester.getSync(`/films`, 'vi', {
      ratingFrom: 8,
      limit: 6, 
      category: 'horror',
      only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
      exclude_film_link: true,
      exclude_film_server: true
    })
    topAnimationMovies = topAnimationMovies.rows;
    topIMDBMovies = topIMDBMovies.rows;
    topWeekendMovies = topWeekendMovies.rows;
    topMonthlyMovies = topMonthlyMovies.rows;
    topSciMovies = topSciMovies.rows;
    topHorrorMovies = topHorrorMovies.rows;

    return {
        props: {
          locale: ctx.locale,
          ...(await serverSideTranslations(ctx.locale, [ 'common'])),
          data: result,
          topAnimationMovies,
          topHorrorMovies,
          topIMDBMovies,
          topMonthlyMovies,
          topSciMovies,
          topWeekendMovies
        }
    }
}
