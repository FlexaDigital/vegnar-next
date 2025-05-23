import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-KyZXEAg3QhqLMpG8r+Knujsl5+5hb7x+qE9+lq6+Tz4pX8mRsvF+eQ2Lg3LrU9qD7oE7e/Jz9gn0JZ6jY2N0xQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 