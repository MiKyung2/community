import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, minuser-scalable=no'
          />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type='text/javascript'
            src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
            charset='utf-8'
          ></script>
        </body>
      </Html>
    );
  }
}
