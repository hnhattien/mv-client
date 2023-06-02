import Layout from 'components/Layout'
import { NextSeo, WebPageJsonLd } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { siteDescription, siteFullUrl, siteKeyword, siteName } from 'constants/seo';
import { siteUrl } from 'next-sitemap.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


const Links = () => {

  <WebPageJsonLd
    id={`${siteUrl}/about`}
    description={`About - ${siteName}`}
    lastReviewed={'2022-07-26T05:59:02.085Z'}
  ></WebPageJsonLd>

  return linksData.map((link) => {
    return (
      <>
        <a key={link.link} className='text-white' style={{ display: 'inline-block', marginRight: '4px' }} target={"_blank"} rel="noreferrer" href={link.link}> {`${link.name}`}</a>
      </>
    );
  })
}
export default function About() {
   const { t } = useTranslation('common');

  return (
    <Layout>
      <Head>
        <title>{`About - ${siteName}`}</title>
        <link name="keywords" content={`about fbflix.org, ${t('keywordsSite')}`}></link>

      </Head>

      <NextSeo
        title={`About - ${siteName}`}
        openGraph={{
          title: `${siteName} - ${t('siteTitle')}`,
        description: t('siteDescription'),
        images: [
          {
            url: `${siteUrl}/logo.png`,
            alt: `${t('siteDescription')} - ${siteName}`,
            type: 'image/png'
          }
        ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@fbflix.org',
          handle: '@fbflix.org'
        }}
      />
      <div className='landing-content'>

        <h1 className='text-5xl text-white text-center mt-20'>About {siteName}</h1>
        <div className='about-page-content pb-5 mt-5' itemProp='text'>
          <h5 className='text-4xl font-semibold mt-5 mb-5'>
            fbFlix - Watch TV-Series and Movies Online For Free
          </h5>
          <p>
            How many tv-series have you watched on your computer, tablet or phone? If the answer is "a lot," then fbFlix is a site for you! You can watch tv-series and movies online for free. There are over thousands of tv-serials available with subtitles in more than 100 languages. All of them are free to watch without registration and download limits, so there's no need to worry about buffering or bandwidth issues - just click play and enjoy!
          </p> 
          <p>
            fbFlix is a tv-series and movies website that allows you to watch 
            tv shows online for free. The site was launched years ago, but the content has been expanding ever since then. Apart from tv series, it also offers many other types of entertainment including cartoons, anime, and documentaries.</p> <p>Finding tv-series on fbFlix is easy! Just type the name of your favorite tv show in the search bar and press enter. If it's not available, you can suggest a tv series that isn't included on the website yet.</p> <p>fbFlix works very simply: you just have to select the tv series you want to watch and click on the play button. The site is available in more than 100 languages, so you can choose your favorite subtitle.</p> <p>You can download all the tv-series episodes you want without any registration or limits. Just click on the download link and start watching tv-series offline!</p> <p>fbFlix offers subtitles for all tv series, so you can watch your favorite tv show even if you don't understand English. For that reason, this site is one of the best options to enjoy tv shows online without registration or limits.&nbsp;</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>Easy to Use</h5> <p>Finding tv series on fbFlix is easy. All you have to do is type the name of your favorite tv show in the search bar and press enter. If it's not available, you can suggest a tv series that isn't included on the website yet.</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>Fast Streaming</h5> <p>fbFlix tv shows website works very simply. You just have to select the tv series you want to watch and click on the play button. The site is available in more than 100 languages, so you can choose your favorite subtitle.</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>Download Option</h5> <p>You can download all episodes of tv-series without any registration or limits with fbFlix. Just click on the download link and start watching tv-series offline!</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>User-Friendly Interface</h5> <p>fbFlix offers subtitles for all tv series, so you can watch your favorite tv show even if you don't understand English. For that reason, this site is one of the best options to enjoy tv shows online without registration or limits.&nbsp;</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>No Ads</h5> <p>fbFlix tv-series website is free of ads, so you can enjoy tv shows online without any interruptions.</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>No Subscription Required</h5> <p>You don't have to sign up or pay anything in order to watch 
            tv-series on fbFlix! It's one of the best tv shows websites for free tv 
            series.&nbsp;
            </p> 
            <h5 className='text-4xl font-semibold mt-5 mb-5'>
            Safe to Use
            </h5>
             <p>fbFlix is a safe tv-series website to use. It doesn't include any
              viruses or malware, so you can watch tv shows online without any worries.
              </p> 
              <h5 className='text-4xl font-semibold mt-5 mb-5'>Thousands of TV Series and Movies
              </h5> 
              <p>You can watch tv series and movies on fbFlix for free! The site offers thousands
               of tv series and movies with subtitles in more than 100 languages, 
               so you'll never get bored.
               </p> 
               <p>fbFlix tv-series website offers subtitles for all tv series and movies, 
               so whether your first language is English or not doesn't matter! 
               You can enjoy tv shows online without registration or limits no matter 
               where are you from.&nbsp;
               </p> 
               <h5 className='text-4xl font-semibold mt-5 mb-5'>Watch TV Shows Online for Free</h5> 
               <p>You don't have to pay anything in order to watch tv shows on 
                fbFlix tv-series website. It's one of the best tv shows 
                websites for free tv series!</p> 
                <h5 className='text-4xl font-semibold mt-5 mb-5'>Watch Movies Online Free</h5> 
                <p>fbFlix is a great site to watch movies online without 
                  registration or limits, so if you want to enjoy new films 
                  then this tv shows website is perfect for you.&nbsp;
                  </p> 
                  <h5 className='text-4xl font-semibold mt-5 mb-5'>Available in more than 100 Languages</h5> 
                  <p>fbFlix tv-series website is available in more than 100 languages, 
                    so you can choose your favorite subtitle and watch tv shows online without 
                    registration or limits.</p> 
                    <h5 className='text-4xl font-semibold mt-5 mb-5'>FAQs</h5> 
                    <p>
                      <b>Q: What devices can I use to watch tv series on fbFlix?</b>
                    </p> <p>A: You can use any device that has a web browser and an internet connection. 
                      That includes computers, smartphones, and tablets.&nbsp;
                      </p> <p><b>Q: What's the quality of the videos on fbFlix?</b></p> <p>A: The quality of the videos depends on your internet connection. Most of the videos on fbFlix are in HD quality.&nbsp;</p> <p><b>Q: Is it legal to watch tv series on fbFlix?</b></p> <p>A: Yes, it is legal to watch tv series on fbFlix. The site includes only movies and tv shows that have been released legally.&nbsp;</p> <p><b>Q: Do I need to create an account in order to watch tv series on fbFlix?</b></p> <p>A: No, you don't need to create an account or pay anything. You can enjoy tv shows online without registration or limits!&nbsp;</p> <p><b>Q: What tv-series does fbFlix have?</b></p> <p>A: fbFlix has a lot of tv series and movies for you to watch online for free! The site offers subtitles in more than 100 languages, so you can choose your favorite subtitle.&nbsp;</p> <p><b>Q: Is it possible to download tv series on fbFlix?</b></p> <p>A: Yes, it is possible to download tv series on fbFlix without any registration or limits. Just click on the download link and you can start watching tv-series offline!&nbsp;</p> <p><b>Q: Is it legal to watch movies on fbFlix?</b></p> <p>A: Yes, all the tv series and movies included in this tv show's website are free of viruses or malware. You don't have any worries when using fbFlix because it's a safe site for you to enjoy tv shows online.</p> <h5 className='text-4xl font-semibold mt-5 mb-5'>In Conclusion</h5> <p>Enjoy tv series online without registration or limits with the fbFlix tv-series website! It's free of ads and free of viruses or malware. You can watch tv shows online without registration and limits for free!</p>
        </div>
      </div>

    </Layout>
  )
}

export const getStaticProps = async (ctx) => {
  return {
      props: {
          locale: ctx.locale,
          ...(await serverSideTranslations(ctx.locale, [ 'common']))
      }
  }
}