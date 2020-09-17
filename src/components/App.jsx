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
            value: "",
            options: {
                mintime:{ year:2030, month:7, date:20, ampm:0, hour:9, min:0},
                maxtime:{ year:2040, month:7, date:20, ampm:0, hour:9, min:0}
            }
        }
    }

    submit(e) {
        e.preventDefault()
        // console.log(Object.values(e.target.elements))
        // var value = {}
        // Object.values(e.target.elements).map(input =>
        //     value[input.id]=input.value)
        // this.setState({value})
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
                        options[input.id] = { year: d[0], month: d[1], date: d[2], ampm: t[0]/12>=1, hour: t[0]%12, min: t[1]}
                    }
                    else options[input.id] = {}
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
        this.setState({options})
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
                        // min={options.mintime}
                        // max={options.maxtime}
                        value={options.value}
                        nodate={options.nodate}
                        notime={options.notime}
                        autofocus={options.autofocus}
                        disabled={!!options.disabled? options.disabled.split(' '): []}
                        // value={'2030-6-27T03:24'}
                        onChange={()=>console.log('input changed!')}
                        id="birth"
                        name="birth"
                        // value={{ year:2030, month:6, date:20, ampm:0, hour:9, min:0}}
                        // nodate
                        // notime
                        // autofocus
                        // disabled={['month','date']}
                    ></Datetimepicker>
                </form>
                <input type="submit" form="datetime"></input>
                <div>
                    {/* { Object.keys(value).map(i => i+":"+value[i]+" ") } */}
                    {/* { !!value && <FormattedDate
                        value={new Date(value.year,(value.month-1),value.date)}
                    />}
                    <br/>
                    { !!value && <FormattedTime value={new Date(0,0,0,value.ampm*12+Number(value.hour),value.min)} />} */}
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