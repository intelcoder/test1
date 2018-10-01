/* eslint-disable */



const pkgVersion = require('../../../package.json').version
export const renderDom = (html, devPort, domain, initialState = null, head) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const jsExt = isProduction ? '.js' : '.js'
  const cssExt = isProduction ? '.css' : '.css'

  return `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes">  
        <meta name="mobile-web-app-capable" content="yes"> 
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        ${head ? head.link.toString() : ''}
        ${head ? head.script.toString() : ''}  
        
        ${isProduction ? `<link rel="stylesheet" type="text/css" href="/dist/styles${cssExt}" />` : ''}
      
      </head>
      <body>
        <div id="root">${html || ''}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})};
        </script>

        <script src="/dist/main${jsExt}"></script>
        <script src="/dist/styles${jsExt}"></script>
      </body>
    </html>
  `
}
