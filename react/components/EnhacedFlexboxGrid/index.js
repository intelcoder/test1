import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import css from './styles.css'

const EnhanceBaseStyleFlexbox = baseStyle => Component => (props) => {
  let className = props.className ? props.className : ' '    // eslint-disable-line
  if(className) {
    className += ` ${baseStyle}`
  }
  return <Component {...props} className={className} />
}

EnhanceBaseStyleFlexbox.propTypes = {
  className: PropTypes.string,
}

export const NoPaddingCol = EnhanceBaseStyleFlexbox(css.noPadding)(Col)
export const NoMarginRow = EnhanceBaseStyleFlexbox(css.noMargin)(Row)
export const NoPaddingGrid = EnhanceBaseStyleFlexbox(css.noPadding)(Grid)


export const TileCol = EnhanceBaseStyleFlexbox(css.tileCol)(Col)
