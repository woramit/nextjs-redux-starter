import Document, { Head, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import styles from 'styles/base.scss'
import React from 'react'
import PropTypes from 'prop-types'
import flush from 'styled-jsx/server'

// from https://github.com/zeit/next.js/edit/canary/examples/with-react-helmet/pages/_document.js
class MyDocument extends Document {
  static async getInitialProps(...args) {
    // console.log(args, 'renderPage', args[0].renderPage(), 'documentProps')
    const documentProps = await super.getInitialProps(...args)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it

    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    let pageContext
    const page = args[0].renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      }

      return WrappedComponent
    })

    let css
    // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString()
    }

    return {
      ...documentProps,
      helmet: Helmet.renderStatic(),
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  // get helmetJsx() {
  //   const { pageContext } = this.props
  //   let title = 'Hello next.js Real World!'
  //   return (
  //     <Helmet>
  //       <title>{title}</title>
  //       <meta property="og:title" content={title} />
  //       <meta charSet="utf-8" />
  //       {/* Use minimum-scale=1 to enable GPU rasterization */}
  //       <meta
  //         name="viewport"
  //         content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
  //       />
  //       {/* PWA primary color */}
  //       <meta
  //         name="theme-color"
  //         content={pageContext ? pageContext.theme.palette.primary.main : null}
  //       />
  //       <link
  //         rel="stylesheet"
  //         href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
  //       />
  //     </Helmet>
  //   )
  // }

  render() {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        {/* <html> */}
        <Head>
          {/* {this.helmetJsx} */}
          {this.helmetHeadComponents}
        </Head>
        {/* <body> */}
        <body {...this.helmetBodyAttrComponents}>
          <style>{styles}</style>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
