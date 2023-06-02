import { lowerCase } from 'lodash';
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'

export default function MovieList({title, children, slugCat}) {
  const {t} = useTranslation('common');
  return (
    <>
    <h2 className='text-white flex justify-between font-semibold lg:text-4xl text-2xl pl-5 lg:pr-20 py-5'>{t(lowerCase(title))}
    {slugCat && <Link href={`/genre/${slugCat}`}>
        <a>{t('show-all')}</a>
    </Link>}
    </h2>
    <ul className={'list-inside flex flex-wrap lg:justify-start justify-around mb-10'}>
        {children}
    </ul>
    </>
    
  )
}
