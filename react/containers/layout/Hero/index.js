/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import css from './styles.css'

const BackgroundVideo = ({ bgImageStyle, image, video }) => (
  <div className={css.bgImage} style={bgImageStyle}>
    <div className={css.videoBg} poster={image}>
      <video loop autoPlay>
        <source src={video.WEB} type="video/webm" />
        <source src={video.MP4} type="video/mp4" />
          Your browser does not support the video tag.
      </video>
    </div>
  </div>
)
const BackgroundImage = ({ bgImageStyle }) => <div className={css.bgImage} style={bgImageStyle} />

const Background = ({ bgImageStyle, image, video }) => (
  video ?
    <BackgroundVideo
      bgImageStyle={bgImageStyle}
      image={image}
      video={video}
    />
    :
    <BackgroundImage
      bgImageStyle={bgImageStyle}
    />
)

const Hero = (
  {
    backgroundColor,
    backgroundPosition,
    height,
    image,
    video,
    bgOpacity,
    children,
  }) => {
  const rootStyle = {
    height: height,
  }
  // style for the background component
  const bgImageStyle = {
    background: `transparent url(${image})`,
    backgroundPosition: backgroundPosition ? backgroundPosition :'no-repeat top',
    opacity: bgOpacity,
  }

  return (
    <div className={css.hero} style={rootStyle}>
      <Background
        bgImageStyle={bgImageStyle}
        image={image}
        video={video}
      />
      <div className={css.heroChildren}>
        {children}
      </div>
    </div>

  )
}

Hero.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
  image: PropTypes.string,
  video: PropTypes.shape({
    WEB: PropTypes.string,
    MP4: PropTypes.string,
  }),
  bgOpacity: PropTypes.number,
  // propName: PropTypes.string.isRequired,
}


Hero.defaultProps = {
  height: '65vh',
  bgOpacity: 1,
}
/* eslint-enable */

export default Hero
