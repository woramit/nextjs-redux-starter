// import withRedux from 'next-redux-wrapper'
// import { withRouter } from 'next/router'
// import { Provider } from 'react-redux'
// import App, { Container } from 'next/app'
// import Layout from 'components/Layout'
// import createStore from 'store/createStore'

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     return {
//       pageProps: Component.getInitialProps
//         ? await Component.getInitialProps(ctx)
//         : {}
//     }
//   }
//   render() {
//     const { Component, pageProps, store, router } = this.props
//     return (
//       <Container>
//         <Provider store={store}>
//           <Layout>
//             <Component router={router} {...pageProps} />
//           </Layout>
//         </Provider>
//       </Container>
//     )
//   }
// }

// export default withRedux(createStore)(withRouter(MyApp))

import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/getPageContext'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import createStore from 'store/createStore'
import withRedux from 'next-redux-wrapper'
import Layout from 'components/Layout'

class MyApp extends App {
  constructor() {
    super()
    this.pageContext = getPageContext()
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store, router } = this.props
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <Provider store={store}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
              <Layout>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Layout>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

// export default MyApp
export default withRedux(createStore)(withRouter(MyApp))
