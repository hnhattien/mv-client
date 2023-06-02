import { Pagination } from 'antd'
import FilmPostLayout from 'components/Common/FilmPostLayout'
import MovieList from 'components/Common/MovieList'
import Widget from 'components/Common/Widget'
import Layout from 'components/Layout'
import { IMAGE_CDN_BASE_URL } from 'constants/config'
import { siteDescription, siteFullUrl, siteKeyword, siteName, siteTitle, subDomainSiteUrl } from 'constants/seo'
import requester from 'lib/api/requester'
import { filter, get, lowerCase, replace, unionBy, uniqBy } from 'lodash'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CarouselJsonLd, NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function FilmByCountry({
  data, 
  genre, 
  pagination,
  topAnimationMovies,
  topHorrorMovies,
  topIMDBMovies,
  topMonthlyMovies,
  topSciMovies,
  topWeekendMovies}) {
  const router = useRouter();
  const {page} = router.query;
  const { t, i18n } = useTranslation('common'); 
  
  const limit = 20;

  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
        <link name="keywords" content={t('keywordsSite')}></link>
        
        
      </Head>
      
     <div className='inner-content'>
        {data && <div className={`${genre}-films`}>
        <CarouselJsonLd
      ofType='movie'
      data={
        uniqBy(data, 'slug').map((film) => {
          return {
            name: film.title,
            url: `${siteFullUrl}/${i18n.language}/film/${film.slug}/`,
            image: `${IMAGE_CDN_BASE_URL}/${get(film, 'slug')}`,
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
      title={`${replace(t('watchOnTemplate2'), '{}', t(lowerCase(genre)))}`}
      description={t('siteDescription')}
      canonical={`${subDomainSiteUrl}/${i18n.language}/country/${encodeURIComponent(genre)}`}
      openGraph={{
        type: 'website',
        url: `${siteFullUrl}/${i18n.language}/country/${encodeURIComponent(genre)}`,
        title: `${replace(t('watchOnTemplate2'), '{}', t(lowerCase(genre)))}`,
        site_name: siteName,
        description: siteDescription
      }}
        twitter={{
          cardType: 'summary_large_image',
          site:'@fbflix.org',
          handle: '@fbflix.org'
        }}
      />
          <h1 className='text-white font-semibold lg:text-4xl text-2xl px-5 py-5'>{t('movie')} {t(lowerCase(genre))}</h1>
          <MovieList className='list-inside flex flex-wrap'>
            {
              data && data.map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
        </div>}

        <div className='pagination-wrap text-white'>
        <Pagination pageSize={pagination.limit} onChange={(page, pageSize) => {
          window.location = `${router.basePath}?${new URLSearchParams({page: page})}`
        }} total={pagination.total} defaultCurrent={page} responsive={true} pageSizeOptions={[]}/>
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
  const limit = 20;
  const page = ctx.query.page || 0;
  let post = await requester.getSync(`/film/country/${ctx.params.slug}`, 'en', {
    page: page,
    limit: limit,
    only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
    exclude_film_link: true,
    exclude_film_server: true
  });
  let rows = post.rows;
  if (!post) {
    return {
      notFound: true
    }
  }
  let topIMDBMovies = await requester.getSync(`/films`, 'en', {
    ratingFrom: 8,
    limit: 6,
    only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
    exclude_film_link: true,
    exclude_film_server: true
  })
  let topAnimationMovies = await requester.getSync(`/films`, 'en' , {
    ratingFrom: 8, 
    limit: 6,
    category: 'animation',
    only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
    exclude_film_link: true,
    exclude_film_server: true
  });
  let topWeekendMovies = await requester.getSync(`/films`, 'en', {
    ratingFrom: 8,
    limit: 6,
    rand: true,
    only_select: 'title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl',
    exclude_film_link: true,
    exclude_film_server: true
  })
  let topMonthlyMovies = await requester.getSync(`/films`, 'en', {
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
  let topHorrorMovies = await requester.getSync(`/films`, 'en', {
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
      ...(await serverSideTranslations(ctx.locale, [ 'common'])),
      data: rows,
      genre: ctx.params.slug,
      pagination: {total: post.count, limit},
      topAnimationMovies,
      topHorrorMovies,
      topIMDBMovies,
      topMonthlyMovies,
      topSciMovies,
      topWeekendMovies,
      locale: ctx.locale
    },

  }

}

// export async function getStaticPaths() {
//   const allGenres = await requester.getSync(`/getallcategorytext`);
//   let paths = allGenres.map(({category}) => {
//     return {
//       params: { slug: category }
//     }
//   });

//   return {
//     paths,
//     fallback: false
//   }
// }
