import IMDB from 'components/Icons/IMDB'
import { IMAGE_CDN_BASE_URL } from 'constants/config'
import { siteFullUrl, siteTitle } from 'constants/seo'
import { getValueByLocale } from 'lib/util'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'

export default function FilmPostLayout({data, locale}) {
  return (
    <li style={{width: '160px'}} className='film-post-item list-item lg:m-5 mb-5 hover:scale-105 transition-transform relative'>
        <Link href={`/film/${data.slug}`} title={`${getValueByLocale(data, 'title', locale)}`}>
            <a>
              <div className='image-wrap' style={{width: '100%', height: '230px'}}>
                <ImageWithFallback layout='fill'
                fallbackSrc={`${IMAGE_CDN_BASE_URL}/default_movie.png`}
                // placeholder='blur'
                // blurDataURL=''
    objectFit='contain' 
    className='post-image rounded-md w-full' 
    src={`${IMAGE_CDN_BASE_URL}/${data.imgCDNUrl}`} alt={data.title}></ImageWithFallback>
              </div>
            </a>
        </Link>
        <div style={{backgroundColor: 'rgba(0,0,40,0.9)'}} className='px-2 py-2 blur-0 flex flex-col space-y-2 film-info-wrap absolute bottom-0 left-0 w-full'>
          <Link href={`/film/${data.slug}`} title={data.title}>
                <a>
                  <h4 title={data.title} className='post-title text-sm font-black text-white w-full text-ellipsis overflow-hidden whitespace-nowrap'>
                    {getValueByLocale(data, 'title', locale)}
                  </h4>
                </a>
          </Link>
          <div className='rating flex flex-row items-center' >
            <p className='mr-2'><Image width={30} height={'15.14px'} src='/imdb.png' alt={`IMDB Rating for ${data.title} - ${siteTitle}`}/></p>
            <span className='text-white text-sm font-semibold'>{data.ratingScore}/10</span>
          </div>
          <div className='film-genre' style={{lineHeight: '0.9'}}>
              {data.categoryText && data.categoryText.split(/,\s?/g).map((el, index, arr) => {
                let genre = el.trim();
                return <Link key={index} href={`/genre/${genre.toLowerCase()}`}>
                  <a style={{paddingLeft: '0', padding:'10px'}} className='text-gray-300 text-xs hover:text-white font-medium'>{genre}{index < arr.length - 1 ? ', ' : ''}</a>
                  
                </Link>
              })}
          </div>
        </div>
    </li>
  )
}
