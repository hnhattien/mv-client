import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>

      
      <script 
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T93G8HQ');`
        }}></script>

      </Head>
      <body>
        <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T93G8HQ"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }}>

        </noscript>
        <Main />
        <NextScript />


       
        
        

        <span id="backtopBtn" className="cursor-pointer backtop-button text-white text-lg p-2 rounded" style={{ width: '40px', height: '40px', position: 'fixed', bottom: '10px', left: '10px', background: "rgb(20, 110, 190)", zIndex: '2000', color: 'white' }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="#fff" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
    </svg>
  </span>
        
        <Script id="backtop-script" strategy='afterInteractive'>
          {`
          document.getElementById("backtopBtn").addEventListener('click', function(ev){
            try{
              if (document) {
                if (document.querySelector(".ant-modal")) {
                  document.querySelector(".ant-modal").scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                else {
                  document.querySelector("html").scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
          
              }
            }catch(err){
              console.log(err);
            }

          })
          `}
        </Script>
   
      </body>
    </Html>
  )
}