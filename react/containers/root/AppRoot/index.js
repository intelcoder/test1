import React, { Component } from 'react'
import { browserStorage } from 'Redux/services/storage'
import Routes from '../../../routes'

if(typeof window !== 'undefined') require('lazysizes')


require('../../../../config/styles/app.css')

class AppRoot extends Component {
  render() {
    return (
      <div className="reactroot">
        <Routes />
      </div>
    )
  }
}

export default AppRoot
