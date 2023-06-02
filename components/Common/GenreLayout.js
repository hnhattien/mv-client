import { IMAGE_CDN_BASE_URL } from 'constants/config'
import { siteName } from 'constants/seo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageWithFallback from './ImageWithFallback'

export default function GenreLayout({data, t}) {
  
  return (
    <div className='genre-list'>
        <ul className='list-inside flex flex-wrap p-4'>
            {data.map(({category, img}, index) => {
            return <li key={index} className='list-item md:w-1/5 w-full m-5 hover:scale-105 transition-transform'>
                <Link href={`/genre/${category.toLocaleLowerCase()}`}>
            <a>
                <div className={'flex relative items-center justify-center'}>
                    <ImageWithFallback fallbackSrc={`${IMAGE_CDN_BASE_URL}/default_movie.png`} width={380} height={380} src={img} className='rounded-md brightness-50' alt={`Watch movie ${category} genre HD for free streaming on ${siteName}`} />
                    <h2 className='text-white text-2xl break-words uppercase font-semibold absolute'>{t(category.toLowerCase())}</h2>
                </div>
            </a>
            </Link>
            </li>
        })}
        </ul>
        
    </div>
  )
}
