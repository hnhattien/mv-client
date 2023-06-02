import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function NextButtonPagination({data, page, baseHref}) {
    // if(data && (((page) * 5 - data.count) >= 0)){
    //     return  <div className='pagination-page-wrapper'><span className={`pagination-buttons disable next cursor-not-allowed  font-bold py-2 px-4 rounded`}>Next</span></div>
    // }
    // else{
    //     return <><Head>{!(data && (((page) * 5 - data.count) >= 0)) && <link rel="next" href={`${baseHref}/${Number(page)+1}`}></link>}</Head>
    //     <div className='pagination-page-wrapper'><Link href={`${baseHref}/${Number(page)+1}`} ><a className={`pagination-buttons next font-bold py-2 px-4 rounded`}>Next</a></Link></div>
    //     </>
    // }
    return <></>
}
