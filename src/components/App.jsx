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
                        disable:{
                            day: [0,6],
                            date: [{ year:2020, month:9, date:16 }],
                            time: [{ from:{ampm:1, hour:6, minute:0}, to:{ampm:0, hour:9, minute:0} }],
                        },
                        // { year, month, date, ampm, hour, min }
                        max: { year:2020, month:10, date:1, ampm:0, hour:9, min:10 },
                        min: { year:2019, month:9, date:7, ampm:0, hour:9, min:10 },
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