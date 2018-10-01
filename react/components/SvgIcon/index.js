import { connect } from 'react-redux'
import SvgIcon from './SvgIcon.js'


export default connect(state => ({
  mobileBrowser: state.app.mobileBrowser,
}))(SvgIcon)
