import { hot } from 'react-hot-loader/root'
import '../styl/index.styl'

import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import propTypes, { string } from 'prop-types'
import Datetimepicker from './Datetimepicker'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    setValue = (value) => {
        this.setState({
            value: value
        })
        console.log(this.state.value)
    }

    submit(e) {
        e.preventDefault()
        // console.log(this.state.value)
    }

    render() {
        const { intl: { language }, history } = this.props
        const { value } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form>
                    <Datetimepicker
                        options = {{
                            // disable:{
                            //     day: [0,6],
                            //     date: [{ year:2020, month:9, date:16 }],
                            //     time: [{ from:{ampm:1, hour:6, minute:0}, to:{ampm:0, hour:9, minute:0} }],
                            // },
                            // { year, month, date, ampm, hour, min }
                            max: { year:2020, month:10, date:1, ampm:0, hour:9, min:10 },
                            min: { year:2019, month:9, date:7, ampm:0, hour:9, min:10 },
                        }}
                        setValue = { (value) => this.setValue(value) }
                    ></Datetimepicker>
                    <input type="submit" onClick={(e) => this.submit(e)}></input>
                    <div>
                        { value }
                    </div>

                </form>
            </IntlProvider>
        )
    }

    static propTypes = {
        intl: propTypes.object.isRequired,
    }
}

export default hot(App)