import { connect } from 'react-redux'
import { loadHomePage } from 'Actions/pages'
import Home from './Home'

export default connect(
  state => ({

  }),
  {
    loadHomePage,
  },
)(Home)
