import ExternalLinkList from "components/Common/ExternalLinkList";
import VideoPlayer from "components/Common/VideoPlayer";
import Layout from "components/Layout";
import { siteFullUrl, siteName, subDomainSiteUrl } from "constants/seo";
import requester from "lib/api/requester";
import {
  BreadcrumbJsonLd,
  CarouselJsonLd,
  NextSeo,
  VideoJsonLd,
} from "next-seo";
import { siteUrl } from "next-sitemap.config";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { generate } from "randomstring";
import MovieContentLayout from "components/Common/MovieContentLayout";
import FilmPostLayout from "components/Common/FilmPostLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  concat,
  forEach,
  get,
  keys,
  map,
  replace,
  split,
  truncate,
} from "lodash";
import {
  getSmallestEpisodeFromGroupEpisode,
  getValueByLocale,
  groupByEpisode,
} from "lib/util";
import VideoServerList from "components/Common/VideoServerList";
import {
  IMAGE_CDN_BASE_URL,
  VIDEO_HLS_PROVIDER,
  VIDEO_HLS_PROVIDER_URL,
  YOUTUBE_EMBED_BASE_URL,
} from "constants/config";
import { useRouter } from "next/router";
export default function Film({ data, relateFilms, e }) {
  const { t, i18n } = useTranslation("common");
  const onEpisodeChange = (filmServers, episode) => {
    if (filmServers?.length) {
      for (let i = 0; i < filmServers.length; i++) {
        let filmServer = filmServers[i];
        if (get(filmServer, "iframeEmbed")) {
          onPlay(get(filmServer, "iframeEmbed"));
        } else if (get(filmServer, "m3u8")) {
          onPlay(get(filmServer, "m3u8"));
        }
      }
    }
    setFilmServers(filmServers);
    if (episode) {
      setCurrentEpisode(episode);
    }
  };
  const [sourcePlaying, setSourcePlaying] = useState(null);
  const [filmServers, setFilmServers] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isMovieSeries, setIsMovieSeries] = useState(
    String(get(data, "movieType", "")).indexOf("TV Series") >= 0
  );

  useEffect(() => {
    if (filmServers?.length) {
      for (let i = 0; i < filmServers.length; i++) {
        let filmServer = filmServers[i];
        if (get(filmServer, "iframeEmbed")) {
          setSourcePlaying(get(filmServer, "iframeEmbed"));
        } else if (get(filmServer, "m3u8")) {
          setSourcePlaying(get(filmServer, "m3u8"));
        }
      }
    }
  }, [JSON.stringify(filmServers)]);
  useEffect(() => {
    if (isMovieSeries) {
      //setIsMovieSeries(true);
      let groupedEpisodeData = groupByEpisode(
        get(data, "sunwarder_filmServers"),
        "episode"
      );
      if (keys(groupedEpisodeData).length) {
        let smallEpisode =
          getSmallestEpisodeFromGroupEpisode(groupedEpisodeData);
        setFilmServers(smallEpisode);
        setCurrentEpisode(smallEpisode.episode);
      }
    } else {
      setFilmServers(get(data, "sunwarder_filmServers"));
    }
  }, []);
  useEffect(() => {
    if (isMovieSeries) {
      //setIsMovieSeries(true);
      let groupedEpisodeData = groupByEpisode(
        get(data, "sunwarder_filmServers"),
        "episode"
      );
      if (keys(groupedEpisodeData).length) {
        let smallEpisode =
          getSmallestEpisodeFromGroupEpisode(groupedEpisodeData);
        setFilmServers(smallEpisode);
        setCurrentEpisode(smallEpisode.episode);
      }
    } else {
      setFilmServers(get(data, "sunwarder_filmServers"));
    }
  }, [data]);
  const onPlay = (resourse) => {
    setSourcePlaying(resourse);

    if (document.querySelector(".player-wrap")) {
      setTimeout(() => {
        document.querySelector(".player-wrap")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 1000);
    }
  };
  // useEffect(() => {
  //   setFilmServers(get(data, 'sunwarder_filmServers', []));
  // }, [data]);

  return (
    <Layout>
      <Head>
        {data && (
          <link
            name="keywords"
            content={`${data.categoryText},${data.title}, watch ${data.title} online for free`}
          ></link>
        )}
        {data && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: (() => {
                let ldJSON = {};
                ldJSON["@context"] = "http://schema.org";
                ldJSON["@type"] = "Movie";
                ldJSON["name"] = `${getValueByLocale(
                  data,
                  "title",
                  i18n.language
                )} ${get(data, "year")} Full HD 4K | fbflix`;
                ldJSON["dateModified"] = "2021-10-4T09:00:41+00:00";
                ldJSON["url"] = `${siteFullUrl}/${i18n.language}/film/${get(
                  data,
                  "slug"
                )}`;
                ldJSON["dateCreated"] = new Date(
                  get(data, "year"),
                  10,
                  1
                ).toISOString();
                ldJSON["datePublished"] = new Date(
                  get(data, "year"),
                  10,
                  1
                ).toISOString();
                ldJSON["aggregateRating"] = {
                  "@type": "AggregateRating",
                  bestRating: 10,
                  worstRating: 1,
                  ratingValue: get(data, "ratingScore"),
                  reviewCount: 10,
                };
                ldJSON["image"] = `${IMAGE_CDN_BASE_URL}/${data.slug}`;
                ldJSON["countryOfOrigin"] = {
                  "@type": "Country",
                  name: get(split(data?.countryText, ", "), 0),
                };
                ldJSON["trailer"] = {
                  "@type": "VideoObject",
                  embedUrl: `${YOUTUBE_EMBED_BASE_URL}/${get(data, "trailer")}`,
                  name: `${getValueByLocale(
                    data,
                    "title",
                    i18n.language
                  )} trailer | fbflix`,
                  description: `${getValueByLocale(
                    data,
                    "description",
                    i18n.language
                  )} | fbflix`,
                  thumbnailUrl: `${IMAGE_CDN_BASE_URL}/${data.slug}`,
                  uploadDate: new Date(get(data, "year"), 10, 1).toISOString(),
                };

                ldJSON["genre"] = get(data, "categoryText");

                return JSON.stringify(ldJSON);
              })(),
            }}
          ></script>
        )}
      </Head>

      <div className="inner-content w-full h-full">
        {data && (
          <div className="movie-detail">
            <NextSeo
              languageAlternates={[
                {
                  hrefLang: "en",
                  href: `${siteFullUrl}/en/film/${data.slug}`,
                },
                {
                  hrefLang: "vi-vn",
                  href: `${siteFullUrl}/vi/film/${data.slug}`,
                },
              ]}
              canonical={`${subDomainSiteUrl}/${i18n.language}/film/${get(
                data,
                "slug"
              )}`}
              title={`${replace(
                t("watchOnTemplate2"),
                "{}",
                getValueByLocale(data, "title", i18n.language)
              )}`}
              description={`${getValueByLocale(
                data,
                "description",
                i18n.language
              )} | fbflix phim moi`}
              openGraph={{
                title: `${replace(
                  t("watchOnTemplate2"),
                  "{}",
                  getValueByLocale(data, "title", i18n.language)
                )}`,
                description: `${getValueByLocale(
                  data,
                  "description",
                  i18n.language
                )} | ${siteName} phim moi`,
                type: "video.movie",
                url: `${siteFullUrl}/${i18n.language}/film/${data.slug}`,
                video: {
                  actors: data.starText.split(/\,\s/g).map((el) => {
                    return {
                      role: el,
                    };
                  }),
                  tags: data.categoryText.split(/\,\s/g),
                },
                images: [
                  {
                    url: `${IMAGE_CDN_BASE_URL}/${get(data, "slug")}`,
                    alt: `${getValueByLocale(
                      data,
                      "title",
                      i18n.language
                    )} | fbflix`,
                    type: "image/jpg",
                  },
                ],
              }}
            ></NextSeo>

            {/* <VideoJsonLd
            name={`${replace(t('watchOnTemplate'), '{}', getValueByLocale(data, 'title', i18n.language))}`}
            description={data.description}
            uploadDate={new Date().toUTCString()}
            thumbnailUrls={[
              data.img
            ]}
            watchCount={Math.round(Math.random() * 50000)}
          >

          </VideoJsonLd> */}
            <BreadcrumbJsonLd
              itemListElements={[
                {
                  name: "Home",
                  item: siteUrl,
                  position: 1,
                },
                {
                  name: i18n.language,
                  item: `${siteUrl}/${i18n.language}`,
                  position: 2,
                },
                {
                  name: `${data.slug}`,
                  position: 3,
                  item: `${siteUrl}/${i18n.language}/film/${data.slug}`,
                },
              ]}
            />

            <div className="movie-header">
              {sourcePlaying && (
                <VideoPlayer
                  currentEpisode={currentEpisode || 1}
                  film={data}
                  t={t}
                  sourcePlaying={sourcePlaying}
                  onPlay={onPlay}
                  filmServers={filmServers}
                  setFilmServers={setFilmServers}
                  onEpisodeChange={onEpisodeChange}
                  isMovieSeries={isMovieSeries}
                ></VideoPlayer>
              )}
              {/* {sourcePlaying && <VideoServerList t={t} onPlay={onPlay} filmServers={filmServers}></VideoServerList>} */}
            </div>

            <div className="movie-content">
              <MovieContentLayout
                locale={i18n.language}
                t={t}
                film={data}
                onEpisodeChange={onEpisodeChange}
                onPlay={onPlay}
              ></MovieContentLayout>
            </div>
            <div className="relate-movie">
              <h2 className="text-white font-semibold text-4xl px-10 py-5">
                {t("related-movies")}
              </h2>
              <ul className="list-inside flex flex-wrap justify-center">
                {relateFilms &&
                  relateFilms.map((film, index) => {
                    return (
                      <FilmPostLayout
                        locale={i18n.language}
                        key={index}
                        data={film}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const allFilms = await requester.getSync(`/getallfilmsforseo`);

//   let enPaths = allFilms.map((film) => {
//     return {
//       params: { slug: film.slug },
//       locale: 'en'
//     }
//   });
//   let viPaths = allFilms.map(film => {
//     return {
//       params: { slug: film.slug },
//       locale: 'vi'
//     }
//   })
//   let paths = concat(enPaths, viPaths)
//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export const getServerSideProps = async (ctx) => {
  let post = await requester.getSync(`/films/${ctx.params.slug}`, ctx.locale, {
    exclude_film_link: true,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  let relateFilms = post.relatedFilms || [];
  relateFilms = relateFilms.rows || [];
  post.sunwarder_filmLinks = map(post.sunwarder_filmLinks, (el) => {
    return {
      link: el.link,
      serverName: generate({
        length: 4,
        charset: "alphabetic",
        capitalization: "uppercase",
      }),
    };
  });
  post.sunwarder_filmServers = map(post.sunwarder_filmServers, (el) => {
    el.serverName = generate({
      length: 4,
      charset: "alphabetic",
      capitalization: "uppercase",
    });
    switch (el.provider) {
      case VIDEO_HLS_PROVIDER.DOODSTREAM:
        {
          el.iframeEmbed = `${VIDEO_HLS_PROVIDER_URL[el.provider]}${
            el.iframeEmbed
          }`;
        }
        break;
      case VIDEO_HLS_PROVIDER.STREAMLARE:
        {
          el.iframeEmbed = `${VIDEO_HLS_PROVIDER_URL[el.provider]}${
            el.iframeEmbed
          }`;
        }
        break;
      case VIDEO_HLS_PROVIDER.VOE:
        {
          el.iframeEmbed = `${VIDEO_HLS_PROVIDER_URL[el.provider]}${
            el.iframeEmbed
          }`;
        }
        break;
      default: {
      }
    }
    return el;
  });

  return {
    props: {
      data: post,
      relateFilms,
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      locale: ctx.locale,
    },
  };
};
