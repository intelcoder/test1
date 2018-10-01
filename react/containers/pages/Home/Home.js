
import React, { Component, Fragment } from 'react'
import ToTopOnMount from 'react-to-top-on-mount'
import SvgIcon from 'Components/SvgIcon'
import Hero from 'Layout/Hero'
import { NoPaddingGrid } from 'Components/EnhacedFlexboxGrid'

import importedComponent from 'react-imported-component'


import css from './styles.css'

const MarketReport = importedComponent(() => import(/* webpackChunkName:'MarketReport' */'./sections/MarketReport'))

class Home extends Component {

  getHeroContents = () => {
    return (
      <Fragment>
        <div className={css.title}>
          <SvgIcon name="#icon-re-search" width="100%" height="100%" />
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <main>
        <ToTopOnMount />
        <Hero
          image={`/static/images/property_blured_bg${false ? '_mobile' : ''}.jpg`}
          height={'50vh'}
        >
          {this.getHeroContents()}
        </Hero>

        <NoPaddingGrid fluid>
          <MarketReport />
        </NoPaddingGrid>
      </main>
    )
  }
}

/* eslint-enable */

export default Home
