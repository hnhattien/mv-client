import Layout from 'components/Layout'
import { NextSeo, WebPageJsonLd } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { siteDescription, siteKeyword, siteName, siteFullUrl } from 'constants/seo';
import { siteUrl } from 'next-sitemap.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
export default function TermsOfService() {
    const { t } = useTranslation('common');
    return (
        <Layout>
            <Head>
                <title>Terms Of Service - {siteName}</title>
                <link name="keywords" content={`terms of service, ${t('keywordsSite')}`}></link>
            </Head>
            <NextSeo
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
                    handle: '@fbflix'
                }}
            />
            <WebPageJsonLd
                id={`${siteUrl}/terms-of-service`}
                description={`Terms Of Services - ${siteName}`}
                lastReviewed={'2022-07-26T05:59:02.085Z'}
                reviewedBy={{ type: 'Person', name: 'fbflix.org phim moi Administrator' }}></WebPageJsonLd>

            <div className='landing-content'>
                
                <h1 className='text-5xl text-white text-center mt-20'>Terms Of Service</h1>
                <div className='terms-page-content'>
                    <h1 className='text-xxl'>Terms and Conditions</h1>
                    <p>Welcome to fbflix.org</p>
                    <p>These terms and conditions outline the rules and regulations for the use of fbflix Website, located at https://www.fbflix.org.</p>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use fbflix.org if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: <span className='font-bold'>Client</span>, <span className='font-bold'>You</span> and <span className='font-bold'>Your</span> refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. <span className='font-bold'>The Company</span>, <span className='font-bold'>Ourselves</span>, <span className='font-bold'>We</span>, <span className='font-bold'>Our</span> and <span className='font-bold'>Us</span>, refers to our Company. <span className='font-bold'>Party</span>, <span className='font-bold'>Parties</span>, or <span className='font-bold'>Us</span>, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                    <h2>Cookies</h2>
                    <p>We employ the use of cookies. By accessing fbflix , you agreed to use cookies in agreement with the fbflix <Link href="/privacy"><a>Privacy Policy</a></Link>.</p>
                    <p>Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                    <h2>License</h2>
                    <p>Unless otherwise stated, fbflix  and/or its licensors own the intellectual property rights for all material on fbflix . All intellectual property rights are reserved. You may access this from fbflix  for your own personal use subjected to restrictions set in these terms and conditions.</p>

                    <p className='text-lg font-semibold mb-5'>You must not:</p>
                    <ul className='list-disc pl-4 mb-5'>

                        <li>Republish material from fbflix </li>
                        <li>Sell, rent or sub-license material from fbflix </li>
                        <li>Reproduce, duplicate or copy material from fbflix </li>
                        <li>Redistribute content from fbflix </li>
                    </ul>

                    <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. fbflix  does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of fbflix ,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, fbflix  shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
                    <p>fbflix  reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                    <p className='text-lg font-semibold mb-5'>You warrant and represent that:</p>
                    <ul className='list-disc pl-4 mb-5'>

                        <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                        <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                        <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                        <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    </ul>
                    <p>You hereby grant fbflix  a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

                    <h2>Hyperlinking to our Content</h2>


                    <p className='text-lg font-semibold mb-5'>The following organizations may link to our Website without prior written approval:</p>

                    <ul className='list-disc pl-4 mb-5'>

                        <li>Government agencies;</li>
                        <li>Search engines;</li>
                        <li>News organizations;</li>
                        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;</li>
                        <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                    </ul>

                    <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

                    <p className='text-lg font-semibold mb-5'>We may consider and approve other link requests from the following types of organizations:</p>

                    <ul className='list-disc pl-4 mb-5'>

                        <li>Commonly-known consumer and/or business information sources;</li>
                        <li>Dot.com community sites;</li>
                        <li>Associations or other groups representing charities;</li>
                        <li>Online directory distributors;</li>
                        <li>Internet portals;</li>
                        <li>Accounting, law and consulting firms; and</li>
                        <li>Educational institutions and trade associations.</li>
                    </ul>

                    <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of fbflix  and (d) the link is in the context of general resource information.</p>
                    <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>


                    <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to fbflix . Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>


                    <p className='text-lg font-semibold mb-5'>Approved organizations may hyperlink to our Website as follows:</p>

                    <ul className='list-disc pl-4 mb-5'>

                        <li>By use of our corporate name; or</li>
                        <li>By use of the uniform resource locator being linked to</li>
                        <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                    </ul>

                    <p>No use of fbflix logo or other artwork will be allowed for linking absent a trademark license agreement.</p>


                    <h2>iFrames</h2>

                    <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
                    <h2>Content Liability</h2>
                    <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                    <h2>Your Privacy</h2>
                    <p>Please read <Link href="/privacy"><a>Privacy Policy</a></Link></p>

                    <h2>Reservation of Rights</h2>
                    <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                    <h2>Removal of links from our website</h2>
                    <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.

                        We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.

                    </p>

                    <h2>Disclaimer</h2>

                    <p className='text-lg font-semibold mb-5'>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

                    <ul className='list-disc pl-4 mb-5'>

                        <li>Limit or exclude our or your liability for death or personal injury;</li>
                        <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>

                    <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

                    <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
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