export default ({ app }) => {
   /*
   ** Only run on client-side and only in production mode
   */
   if (process.env.NODE_ENV === 'production' && process.client) {

       const analyticsID = process.env.GOOGLE_ANALYTICS_ID

       // first check to see if our script is already in the DOM
       const myScriptExists = Boolean(
           document.querySelector(
               `head > script[src="https://www.googletagmanager.com/gtag/js?id=${analyticsID}"]`
           )
       )

       if (!myScriptExists) {
           // if it isn't already in the DOM, create and insert our script
           const myScript = document.createElement('script')
           myScript.type = 'text/javascript'
           myScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsID}`
           myScript.hid = 'gtm'
           myScript.async = true
           document.head.appendChild(myScript);
       }

       // part 2 of Google Analytics script
       window.dataLayer = window.dataLayer || [];
       // eslint-disable-next-line no-undef
       function gtag() { dataLayer.push(arguments); }
       gtag('js', new Date());
       gtag('set', { cookie_flags: 'SameSite=None;Secure' });
       gtag('config', `${analyticsID}`);
   }
}