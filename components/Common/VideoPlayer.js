import { get, groupBy, keys, map } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import "@vime/core/themes/default.css";
import { Player, Hls, DefaultUi } from "@vime/react";
export default function VideoPlayer({
  filmServers,
  t,
  onPlay,
  sourcePlaying,
  onEpisodeChange,
  film,
  isMovieSeries,
  currentEpisode,
}) {
  const { i18n } = useTranslation("common");
  const [movieSeriesGroup, setIsMovieSeriesGroup] = useState([]);
  const [sourceType, setSourceType] = useState(
    String(sourcePlaying).indexOf("m3u8") >= 0 ? "M3U8" : "IFRAME"
  );
  const router = useRouter();
  let { episode } = router.query;
  useEffect(() => {
    if (isMovieSeries) {
      setIsMovieSeriesGroup(
        groupBy(get(film, "sunwarder_filmServers"), (SV) => SV.episode)
      );
    }
  }, []);
  return (
    <div className="movie-player">
      <div className="player-wrap">
        {sourcePlaying ? (
          sourceType === "IFRAME" ? (
            <Iframe
              key={sourcePlaying}
              id={sourcePlaying}
              onLoadedMetadata={(ev) => {
                let track = document.createElement("track");
                track.label = "English";
                track.kind = "subtitles";
                track.srclang = "en";
                track.src = "/DC.League.of.Super-Pets.2022.1080p.WEBRip.vtt";
                ev.currentTarget.querySelector("video").appendChild(track);
              }}
              src={sourcePlaying}
              allowFullScreen={true}
              width={"100%"}
              height={"500px"}
            ></Iframe>
          ) : (
            <Player theme="dark">
              <Hls version="latest" config={{}}>
                <source data-src={sourcePlaying} type="application/x-mpegURL" />
              </Hls>
              <DefaultUi />
            </Player>
          )
        ) : null}

        <div className="subtitle-wrap"></div>
      </div>

      <div className="server-list flex flex-wrap items-center mt-9">
        <h1 className="text-white lg:text-xl text-lg font-semibold">
          {t("other-server")} :
        </h1>
        {filmServers &&
          filmServers.map(({ iframeEmbed, serverName, m3u8 }, index) => {
            if (iframeEmbed) {
              return (
                <div
                  style={{ maxHeight: "54px" }}
                  className="flex items-center rounded-full m-2 bg-white lg:px-6 py-2 px-2 cursor-pointer "
                  key={index}
                  onClick={() => {
                    onPlay(iframeEmbed);
                    setSourceType("IFRAME");
                  }}
                >
                  <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                  <p className="ml-2 text-sm">
                    <span className="text-gray-400 text-sm mb-0 block">
                      Server
                    </span>

                    {serverName}
                  </p>
                </div>
              );
            } else if (m3u8) {
              return (
                <div
                  style={{ maxHeight: "54px" }}
                  className="flex items-center rounded-full m-2 bg-white lg:px-6 py-2 px-2 cursor-pointer "
                  key={index}
                  onClick={() => {
                    onPlay(m3u8);
                    setSourceType("M3U8");
                  }}
                >
                  <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                  <p className="ml-2 text-sm">
                    <span className="text-gray-400 text-sm mb-0 block">
                      Server
                    </span>

                    {serverName}
                  </p>
                </div>
              );
            }
          })}
      </div>

      <div className="episodes-wrap">
        {isMovieSeries && movieSeriesGroup && (
          <ul className="list-inside flex episodes flex-wrap">
            {map(keys(movieSeriesGroup), (episode, episodeIndex) => {
              return (
                <li className="list-item mr-4" key={episodeIndex}>
                  <div
                    className={`font-semibold episode-btn ${
                      episode == currentEpisode ? "active" : ""
                    }`}
                    onClick={(ev) => {
                      onEpisodeChange(movieSeriesGroup[episode], episode);
                    }}
                  >
                    {t("episode")} {episode}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
