import App from '../components/App'
import { connect } from 'react-redux'
import { set_language } from 'actions'

function mapStateToProps(state) {
    const { intl } = state
    return {
        intl,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_language: data => dispatch(set_language(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
