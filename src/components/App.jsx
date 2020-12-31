import { hot } from 'react-hot-loader/root'
// import '../styl/index.styl'

import React, { Component } from 'react'
import { IntlProvider, FormattedDate, FormattedTime } from 'react-intl'
import propTypes, { string } from 'prop-types'
import Datetimepicker from './Datetimepicker'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '2030-06-27T03:20',
            options: {
                mintime: undefined,
                maxtime: undefined
            }
        }
        this.hideInput = React.createRef()
    }

    componentDidMount() {
        this.setState({ value: '2020-10-29T03:20' })
        // this.hideInput.current.focus()
    }

    submit(e) {
        e.preventDefault()
        this.setState({ value: e.target['birth'].value })
        e.persist()
    }

    set(e) {
        e.preventDefault()
        var form = e.target
        var options = {}
        Object.values(form.elements).map(input => {
            if (input.type == 'checkbox') {
                options[input.id] = input.checked
            }
            else {
                options[input.id] = input.value
            }
        }
        )
        this.setState({ options, value: !!form['value'].value ? form['value'].value : undefined })
        this.props.set_language({ language: form['language'].checked ? 'en' : 'zh' })
        console.log(options)
    }

    setValue = (value) => {
        this.setState({ value: value })
    }

    componentDidMount(){
        window.myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    }

    render() {
        const { intl: { language }, history } = this.props
        const { value, options } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.set(e)}>
                    <label>language: <input type="checkbox" id="language"></input> en</label><br />
                    <label>min</label><input type="text" id="mintime"></input><br />
                    <label>max</label><input type="text" id="maxtime"></input><br />
                    <label>value</label><input type="text" id="value"></input><br />
                    <input type="checkbox" id="nodate"></input><label>nodate</label><br />
                    <input type="checkbox" id="notime"></input><label>notime</label><br />
                    <input type="checkbox" id="autofocus"></input><label>autofocus</label><br />
                    <label>disabled</label>
                    <input type="text" id="disabled"></input>
                    <input type="submit"></input>
                </form>


                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>myModal.show()}>
                    Launch demo modal
</button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div style={{ 'width': '500px' }}>
                                    <form onSubmit={(e) => this.submit(e)} id="datetime">
                                        <Datetimepicker
                                            // max='+022030-05-27T03:24'
                                            // min='2030-07-27T03:24'
                                            min={options.mintime}
                                            max={options.maxtime}
                                            value={value}
                                            nodate={options.nodate}
                                            notime={options.notime}
                                            autofocus={options.autofocus}
                                            disabled={!!options.disabled ? options.disabled.split(' ') : undefined}
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
                                </div>
                                <input type="submit" form="datetime"></input>
                                <div>
                                    {`value: ${value}`}
                                    {!!this.hideInput.current && `ref: ${this.hideInput.current.value}`}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


            </IntlProvider>
        )
    }

    static propTypes = {
        intl: propTypes.object.isRequired,
    }
}

export default hot(App)