import { hot } from 'react-hot-loader/root'
import '../styl/index.styl'

import React, { Component } from 'react'
import { IntlProvider, FormattedDate, FormattedTime } from 'react-intl'
import propTypes, { string } from 'prop-types'
import Datetimepicker from './Datetimepicker'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: undefined,
            options: {
                mintime:undefined,
                maxtime:undefined
            }
        }
        this.hideInput = React.createRef()
    }

    componentDidMount() {
        // this.hideInput.current.focus()
    }

    submit(e) {
        e.preventDefault()
        this.setState({value: e.target['birth'].value})
        e.persist()
    }

    set(e) {
        e.preventDefault()
        var form = e.target
        var options = {}
        Object.values(form.elements).map(input=>
            {
                if(input.id=='mintime'||input.id=='maxtime'){
                    if(!!input.value){
                        var d = input.value.split('T')[0].split('-')
                        var t = input.value.split('T')[1].split(':')
                        options[input.id] = { year: Number(d[0]), month: Number(d[1]), date: Number(d[2]), ampm: Number(t[0])/12>=1, hour: Number(t[0])%12, min: Number(t[1])}
                    }
                    else options[input.id] = undefined
                }
                else{
                    if(input.type=='checkbox'){
                        options[input.id] = input.cheked
                    }
                    else{
                        options[input.id] = input.value
                    }
                }
            }
        )
        this.setState({options, value: !!form['value'].value? form['value'].value:undefined})
        console.log(options)
    }

    setValue = () => {
        this.setState({value:this.hideInput.current.value})
    }

    render() {
        const { intl: { language }, history } = this.props
        const { value, options } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.set(e)}>
                    <label>min</label><input type="text" id="mintime"></input><br/>
                    <label>max</label><input type="text" id="maxtime"></input><br/>
                    <label>value</label><input type="text" id="value"></input><br/>
                    <input type="checkbox" id="nodate"></input><label>nodate</label><br/>
                    <input type="checkbox" id="notime"></input><label>notime</label><br/>
                    <input type="checkbox" id="autofocus"></input><label>autofocus</label><br/>
                    <label>disabled</label>
                    <input type="text" id="disabled"></input>
                    <input type="submit"></input>
                </form>
                <form onSubmit={(e) => this.submit(e)} id="datetime">
                    <Datetimepicker
                        // min={{ year:2030, month:7, date:20, ampm:0, hour:9, min:0}}
                        // max={{ year:2040, month:7, date:20, ampm:0, hour:9, min:0}}
                        min={options.mintime}
                        max={options.maxtime}
                        value={value}
                        nodate={options.nodate}
                        notime={options.notime}
                        autoFocus={options.autofocus}
                        disabled={!!options.disabled? options.disabled.split(' '): undefined}
                        // disabled={['month','date']}
                        // value={'2030-6-27T03:24'}
                        // value={{ year:2030, month:6, date:20, ampm:0, hour:9, min:0}}
                        onChange={(e) => this.setValue(e)}
                        id="birth"
                        name="birth"
                        inputRef={this.hideInput}
                        // nodate
                        // notime
                        // autofocus
                        // disabled
                    ></Datetimepicker>
                </form>
                <input type="submit" form="datetime"></input>
                <div>
                    {value}
                </div>
            </IntlProvider>
        )
    }

    static propTypes = {
        intl: propTypes.object.isRequired,
    }
}

export default hot(App)