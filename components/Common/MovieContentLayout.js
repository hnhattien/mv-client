import { IMAGE_CDN_BASE_URL, YOUTUBE_EMBED_BASE_URL } from "constants/config";
import { getValueByLocale } from "lib/util";
import { get, groupBy, isNil, keys, map } from "lodash";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ExternalLinkList from "./ExternalLinkList";
import ImageWithFallback from "./ImageWithFallback";
import ReportModal from "./ReportModal";

export default function MovieContentLayout({
  film,
  t,
  onEpisodeChange,
  onPlay,
  locale,
}) {
  const openLink = (link) => {
    let aEl = document.createElement("a");
    aEl.rel = "noopener noreferrer";
    aEl.href = link;
    aEl.click();
  };
  const [movieSeriesGroup, setIsMovieSeriesGroup] = useState([]);
  const [isMovieSeries, setIsMovieSeries] = useState(false);
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  let keywordsTemplate = [
    "{{}} MovieSite",
    "Watch film {{}} for free streaming online Full HD",
    "Xem phim {{}} phát trực tuyến miễn phí Full HD",
    "Смотрите фильм {{}} бесплатно в потоковом режиме онлайн Full HD",
    "觀看電影 {{}} 以免費在線觀看 Full HD",
    "观看电影 {{}} 以免费在线观看 Full HD",
    "映画 {{}} をオンラインで無料ストリーミングで見る Full HD",
    "온라인에서 무료 스트리밍으로 영화 {{}} 보기 Full HD",
    "Sehen Sie sich Film {{}} kostenlos online an Full HD",
    "ชมภาพยนตร์ {{}} สำหรับการสตรีมออนไลน์ฟรี Full HD",
    "Bekijk film {{}} voor gratis streaming online Full HD",
    "{{}} phim moi",
  ];
  return (
    <div className="film-content m-5">
      <div className="content flex md:flex-row flex-col">
        <div className="film-img mr-5 md:w-2/5 mb-5">
          <div className="rounded-md">
            <ImageWithFallback
              fallbackSrc={`${IMAGE_CDN_BASE_URL}/default_movie.png`}
              src={`${IMAGE_CDN_BASE_URL}/${film.imgCDNUrl}`}
              alt={film.title}
              className="rounded-md w-full"
              layout="responsive"
              width={"450px"}
              height={"450px"}
              objectFit="contain"
            />
          </div>
        </div>
        <div className="film-text md:w-3/5 text-xs">
          <h1 className="text-xl font-semibold mb-5">
            <span className="text-gray-400">{t("title")}: </span>
            {getValueByLocale(film, "title", locale)}
          </h1>
          <p className="text-white mb-5">
            <span className="text-gray-400">IMDB:</span> {film.ratingScore}
          </p>
          <p className="text-white mb-5">
            <span className="text-gray-400">{t("year")}</span> {film.year}
          </p>
          <p className="text-white mb-5">
            <span className="text-gray-400">{t("genre")}:</span>{" "}
            {film.categoryText}
          </p>
          <p className="text-white mb-5">
            <span className="text-gray-400">{t("star")}:</span> {film.starText}
          </p>
          <p className="text-white  mb-5">
            <span className="text-gray-400">{t("description")}: </span>
            {getValueByLocale(film, "description", locale)}
          </p>
          <p className="text-white  mb-5">
            <span className="text-gray-400">{t("country")}: </span>
            {film.countryText}
          </p>
          <p className="text-white  mb-5">
            <span className="text-gray-400">{t("film-type")}: </span>
            {t(film.movieType)}
          </p>
          <ul className="list-inside flex items-center">
            {/* <li className='list-item mr-5'>
                        <button onClick={() => {onPlay(get(film, 'sunwarder_filmServers.0.iframeEmbed'))}} className="bg-red-600 hover:bg-red-500 text-white mt-5 font-bold py-2 px-4 rounded-full inline-flex items-center">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                            <p>{t('watch-movie')}</p>
                        </button>
                        
                    </li> */}
            <li className="list-item mr-5">
              <button
                onClick={() => {
                  if (document) {
                    let el = document.querySelector("#trailers");
                    if (el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }
                }}
                className="bg-slate-500 hover:bg-slate-500 text-white mt-5 font-bold py-2 px-4 rounded-full inline-flex items-center"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                <p>{t("watch-trailer")}</p>
              </button>
            </li>
            <li className="list-item mr-5">
              <button
                onClick={() => {
                  setIsOpenReportModal(true);
                }}
                className=" text-white mt-5 font-bold rounded-full inline-flex items-center"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0c53 0 96 43 96 96v3.6c0 15.7-12.7 28.4-28.4 28.4H188.4c-15.7 0-28.4-12.7-28.4-28.4V96c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4H312c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6V240c0-8.8-7.2-16-16-16s-16 7.2-16 16V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.3c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z" />
                </svg>
                <p>{t("report-film")}</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="trailers mt-10" id="trailers">
        <h4 className="lg:text-xl text-lg text-white">Trailer</h4>
        <div className="iframe-container">
          {get(film, "trailer") && (
            <iframe
              src={`${YOUTUBE_EMBED_BASE_URL}/${get(film, "trailer")}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      <div className="keywords mt-10">
        <h3>{t("keyword")}</h3>
        <div className="keyword-content flex flex-wrap">
          {keywordsTemplate.map((keywordTemplate, index) => {
            return (
              <h4 key={keywordTemplate} className="text-slate-500 p-2">
                {keywordTemplate.replace("{{}}", film.title)}
              </h4>
            );
          })}
        </div>
      </div>

      {isOpenReportModal && (
        <ReportModal
          filmId={get(film, "id")}
          filmTitle={get(film, "title")}
          t={t}
          visible={isOpenReportModal}
          onClose={() => {
            setIsOpenReportModal(false);
          }}
        />
      )}
    </div>
  );
}
