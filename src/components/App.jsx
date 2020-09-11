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

    submit(e) {
        e.preventDefault()
        console.log(Object.values(e.target.elements))
        var value = {}
        Object.values(e.target.elements).map(input =>
            input.type!="submit" && (value[input.id]=input.value) )
        this.setState({value})
        e.persist()
    }

    render() {
        const { intl: { language }, history } = this.props
        const { value } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.submit(e)}>
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
                    ></Datetimepicker>
                    <input type="submit"></input>
                    <div>
                        { Object.keys(value).map(i => i+":"+value[i]+" ") }
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