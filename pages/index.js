import Head from "next/head";
import requester from "../lib/api/requester";
import Layout from "../components/Layout";
import {
  CarouselJsonLd,
  CollectionPageJsonLd,
  NextSeo,
  WebPageJsonLd,
} from "next-seo";
import {
  siteDescription,
  siteFullUrl,
  siteKeyword,
  siteName,
  siteTitle,
  subDomainSiteUrl,
} from "constants/seo";
import { siteUrl } from "next-sitemap.config";
import _, { get } from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FilmPostLayout from "components/Common/FilmPostLayout";
import Widget from "components/Common/Widget";
import MovieList from "components/Common/MovieList";
import { useTranslation } from "next-i18next";
import { IMAGE_CDN_BASE_URL } from "constants/config";
import { getValueByLocale } from "lib/util";

export default function Home({
  data,
  topAnimationMovies,
  topHorrorMovies,
  topIMDBMovies,
  topMonthlyMovies,
  topSciMovies,
  topWeekendMovies,
}) {
  const { t, i18n } = useTranslation("common");
  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
        <link name="keywords" content={t("keywordsSite")}></link>
      </Head>
      <CarouselJsonLd
        ofType="movie"
        data={Object.keys(data)
          .map((key) => {
            return data[key].map((film) => {
              return {
                name: `${getValueByLocale(
                  film,
                  "title",
                  i18n.language
                )} | fblix phim moi`,
                url: `${siteFullUrl}/${i18n.language}/film/${film.slug}/`,
                image: `${IMAGE_CDN_BASE_URL}/${get(film, "slug")}`,
                description: `${getValueByLocale(
                  film,
                  "description",
                  i18n.language
                )} phim moi`,
                aggregateRating: {
                  bestRating: 10,
                  worstRating: 1,
                  ratingValue: film.ratingScore,
                  reviewCount: 10,
                },
              };
            });
          })
          .flat()}
      ></CarouselJsonLd>
      <NextSeo
        languageAlternates={[
          {
            hrefLang: "en",
            href: `${siteFullUrl}/en/`,
          },
          {
            hrefLang: "vi-vn",
            href: `${siteFullUrl}/vi/`,
          },
        ]}
        title={`${t("siteTitle")}`}
        description={t("siteDescription")}
        canonical={subDomainSiteUrl}
        openGraph={{
          type: "website",
          url: siteFullUrl,
          title: `${siteName} - ${t("siteTitle")}`,
          description: t("siteDescription"),
          images: [
            {
              url: `${siteUrl}/logo.png`,
              alt: `${t("siteDescription")} - ${siteName}`,
              type: "image/png",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@fbflix.org",
          handle: "@fbflix.org",
        }}
      />
      <div className="inner-content lg:w-11/12 w-full p-4">
        {Object.keys(data).map((cat, index) => {
          return (
            <div key={index} className={`${cat}-films`}>
              <MovieList
                slugCat={cat}
                title={cat.toUpperCase()}
                className="list-inside flex flex-wrap justify-around"
              >
                {data &&
                  data[cat].map((el, index) => {
                    return <FilmPostLayout key={index} data={el} />;
                  })}
              </MovieList>
            </div>
          );
        })}
        {/* <div className='action-films'>
          <MovieList title={'Action'} className='list-inside flex flex-wrap justify-around'>
            {
              data && data['action'].map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
        </div>

        <div className='sci-fi-films'>
          
          <MovieList title={'SCI-FI'} className='list-inside flex flex-wrap justify-around'>
            {
              data && data['sci-fi'].map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
        </div>

        <div className='horror-films'>
          <MovieList title={'Horror'} className='list-inside flex flex-wrap justify-around'>
            {
              data && data['horror'].map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
        </div>

        <div className='animation-films'>
          <MovieList title={'Animation'} className='list-inside flex flex-wrap justify-around'>
            {
              data && data['animation'].map((el, index) => {
                return <FilmPostLayout key={index} data={el}/>
              })
            }
          </MovieList>
        </div> */}
      </div>

      <Widget
        t={t}
        topWeekendMovies={topWeekendMovies}
        topAnimationMovies={topAnimationMovies}
        topHorrorMovies={topHorrorMovies}
        topIMDBMovies={topIMDBMovies}
        topMonthlyMovies={topMonthlyMovies}
        topSciMovies={topSciMovies}
      />
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  let data = await requester.getSync(`/film/categoryGroup`, "vi", {
    category: "action,sci-fi,horror,animation",
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  // action = action.rows;
  // let sci = await requester.getSync(`/film/category/sci-fi`);
  // sci = sci.rows;

  // let horror = await requester.getSync(`/film/category/horror`);
  // horror = horror.rows;

  // let animation = await requester.getSync(`/film/category/animation`);
  // animation = animation.rows;
  let topIMDBMovies = await requester.getSync(`/films`, "en", {
    ratingFrom: 8,
    limit: 6,
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  let topAnimationMovies = await requester.getSync(`/films`, "vi", {
    ratingFrom: 8,
    limit: 6,
    category: "animation",
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  let topWeekendMovies = await requester.getSync(`/films`, "vi", {
    ratingFrom: 8,
    limit: 6,
    rand: true,
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  let topMonthlyMovies = await requester.getSync(`/films`, "vi", {
    ratingFrom: 8,
    limit: 6,
    rand: true,
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  let topSciMovies = await requester.getSync(`/films`, "vi", {
    ratingFrom: 8,
    limit: 6,
    category: "sci-fi",
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  let topHorrorMovies = await requester.getSync(`/films`, "vi", {
    ratingFrom: 8,
    limit: 6,
    category: "horror",
    only_select:
      "title,slug,img,ratingScore,categoryText,starText,id,season,imgCDNUrl",
    exclude_film_link: true,
    exclude_film_server: true,
  });
  topAnimationMovies = topAnimationMovies.rows;
  topIMDBMovies = topIMDBMovies.rows;
  topWeekendMovies = topWeekendMovies.rows;
  topMonthlyMovies = topMonthlyMovies.rows;
  topSciMovies = topSciMovies.rows;
  topHorrorMovies = topHorrorMovies.rows;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      data: data,
      topAnimationMovies,
      topHorrorMovies,
      topIMDBMovies,
      topMonthlyMovies,
      topSciMovies,
      topWeekendMovies,
      locale: ctx.locale,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 300, // In seconds
  };
};
