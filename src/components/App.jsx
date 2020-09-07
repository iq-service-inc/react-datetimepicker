import { hot } from 'react-hot-loader/root'
import '../styl/index.styl'

import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import propTypes from 'prop-types'
import Datetimepicker from './Datetimepicker'

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { intl: { language }, history } = this.props
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <Datetimepicker
                    options = {{
                        years: [2010, 2011, 2012, 2019, 2020, 2021]
                    }}
                ></Datetimepicker>
            </IntlProvider>
        )
    }

    static propTypes = {
        intl: propTypes.object.isRequired,
    }
}

export default hot(App)