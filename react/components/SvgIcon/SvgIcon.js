import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

import spritesheet from 'Static/spritesheet.json'

import css from './styles.css'

const SvgIcon = ({ width = 32, height = 32, name, className = 'svg-icon', tooltip, tooltipPlace, mobileBrowser }) => {
  const style = {
    width: width === '100%' ? '' : `${width}px`,
    height: height === '100%' ? '' : `${height}px`,
  }
  const iconObj = spritesheet[name.substring(1)] && spritesheet[name.substring(1)]
  const innerHtml = iconObj && iconObj.content

  const svg = (
    <svg
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: innerHtml }}
      viewBox={iconObj && iconObj.viewbox}
      style={style}
      className={css.svgWrapper + ' ' + className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  )

  if(tooltip && !mobileBrowser) {
    return (
      <Tooltip
        placement={tooltipPlace}
        overlay={tooltip}
      >
        {svg}
      </Tooltip>
    )
  }
  return svg
}

SvgIcon.propTypes = {
  className: PropTypes.string, // .isRequired,
  name: PropTypes.string.isRequired,
  // width: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // height: PropTypes.number,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tooltip: PropTypes.string,
  tooltipPlace: PropTypes.string,
  mobileBrowser: PropTypes.string,
}


export default SvgIcon
