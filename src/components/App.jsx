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
                if(input.type=='checkbox'){
                    options[input.id] = input.checked
                }
                else{
                    options[input.id] = input.value
                }
            }
        )
        this.setState({options, value: !!form['value'].value? form['value'].value:undefined})
        this.props.set_language({language:form['language'].checked? 'en':'zh'})
        console.log(options)
    }

    setValue = (value) => {
        this.setState({value:value})
    }

    render() {
        const { intl: { language }, history } = this.props
        const { value, options } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.set(e)}>
                    <label>language: <input type="checkbox" id="language"></input> en</label><br/>
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
                        // max='+022030-05-27T03:24'
                        // min='2030-07-27T03:24'
                        min={options.mintime}
                        max={options.maxtime}
                        value={value}
                        nodate={options.nodate}
                        notime={options.notime}
                        autoFocus={options.autofocus}
                        disabled={!!options.disabled? options.disabled.split(' '): undefined}
                        // disabled={['month','date']}
                        // value='2030-6-27T03:24'
                        onChange={(value) => this.setValue(value)}
                        id="birth"
                        name="birth"
                        inputRef={this.hideInput}
                        // classname="birthinput"
                        // nodate
                        // notime
                        autofocus
                        // disabled
                    ></Datetimepicker>
                </form>
                <input type="submit" form="datetime"></input>
                <div>
                    {`value: ${value}`}
                    {!!this.hideInput.current && `ref: ${this.hideInput.current.value}`}
                </div>
            </IntlProvider>
        )
    }

    static propTypes = {
        intl: propTypes.object.isRequired,
    }
}

export default hot(App)