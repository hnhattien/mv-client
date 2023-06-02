import React from 'react'
import Link from 'next/link';
import { siteTitle } from 'constants/seo';
import { IMAGE_CDN_BASE_URL } from 'constants/config';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';
export default function FilmPostLayoutSmall({data, index}) {
  return (
    <li key={index} style={{minWidth: '100%'}} className='flex-row flex film-post-item p-2 hover:scale-105 transition-transform relative'>
    
    <Link href={`/film/${data.slug}`} title={data.title}>
        <a>
          <div className='h-full'>
            <ImageWithFallback fallbackSrc={`${IMAGE_CDN_BASE_URL}/default_movie.png`} className='post-image rounded-md h-full' style={{maxWidth: '100px', minWidth: '100px'}} width={'100px'} height={'146px'} objectFit='contain' layout='fixed' src={`${IMAGE_CDN_BASE_URL}/${data.imgCDNUrl}`} alt={data.title}/>
          </div>
        </a>
    </Link>

    <div style={{backgroundColor: 'rgba(0,0,0,0)'}} className='px-2 py-2 blur-0 flex flex-col space-y-2 film-info-wrap left-0 w-full'>
      <Link href={`/film/${data.slug}`} title={data.title}>
            <a>
              <h4 title={data.title} className='post-title text-sm font-black text-white w-48 text-ellipsis overflow-hidden whitespace-nowrap'>
                {data.title}
              </h4>
            </a>
      </Link>
      <div className='rating flex flex-row items-center' >
        <p className='mr-2'><Image width={30} height={'15.14px'} src='/imdb.png' alt={`IMDB Rating for ${data.title} - ${siteTitle}`}/></p>
        <span className='text-white text-sm font-semibold'>{data.ratingScore}/10</span>
      </div>
      <div className='film-genre' style={{lineHeight: '0.9'}}>
          {data.categoryText.split(/,\s?/g).map((el, index, arr) => {
            let genre = el.trim();
            return <Link key={index} href={`/genre/${genre.toLowerCase()}`}>
              <a className='text-gray-300 text-xs hover:text-white font-medium'>{genre}{index < arr.length - 1 ? ', ' : ''}</a>
              
            </Link>
          })}
      </div>
    </div>
</li>
  )
}
