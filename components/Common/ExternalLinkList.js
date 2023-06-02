import { map } from 'lodash';
import React from 'react'

export default function ExternalLinkList({filmLinks, t}) {
  const openLink = (link) =>{
    let aEl = document.createElement('a');
    aEl.rel = 'noopener noreferrer';
    aEl.href = link;
    aEl.click();
  }
  return (
    <div className='server-list flex flex-wrap items-center'>
        <h1 className='text-white text-xl font-semibold'>
          {t('other-server')}: 
        </h1>
       {map(filmLinks,({link, serverName}, index) => {
        return <div className='flex items-center rounded-full m-2 bg-white px-6 py-2 cursor-pointer ' key={index} onClick={() => {openLink(link)}} >
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
          
          <p className='ml-2'>
            <span className='text-gray-400 text-sm mb-0 block'>Server</span>
            
            {serverName}
          </p>
          
          
        </div>   
       })}
    </div>
  )
}
