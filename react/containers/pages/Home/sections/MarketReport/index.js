import { connect } from 'react-redux'
import MarketReport from './MarketReport'


export default connect(
  state => ({
    userCurrentArea: {},
  }),
  {
  },
)(MarketReport)
