import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function PreviousButtonPagination({dataExisted, page, baseHref}) {
    
    // if(dataExisted && (page <= 1)){
    //     return (
    //     <>
        
    //     <div className='pagination-page-wrapper'>
    //         <span className={`pagination-buttons disable previous bg-stone-500 cursor-not-allowed  hover:bg-stone-500 text-white font-bold py-2 px-4 rounded`}>Previous</span>

    //     </div>
    //     </>)
    // }
    // else{
    //     return <>
    //     <Head>{page > 1 && <link rel="prev" href={`${baseHref}/${Number(page)-1}`}></link>}</Head>
    //     <div className='pagination-page-wrapper'>
    //         <Link href={`${baseHref}/${Number(page) - 1}`} >
    //             <a className={`pagination-buttons previous bg-stone-500 cursor-not-allowed  hover:bg-stone-500 text-white font-bold py-2 px-4 rounded`}>Previous</a>
    //         </Link>
    //     </div>
    //     </>    
    // }
    
    return <></>

}
