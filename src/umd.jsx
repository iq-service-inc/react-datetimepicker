import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider, ReactReduxContext } from 'react-redux'
import configureStore, { history } from "./store"
import InstallFontAwesome from './lib/icon'
import { IntlProvider } from 'react-intl'
import rootSaga from "./sagas"
import { Datetimepicker } from '../module/main.js'
// import '../module/main.css'


class AppComp extends Component {
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
                        // nodate
                        // notime
                        // autofocus
                        // disabled
                    ></Datetimepicker>
                </form>
                <input type="submit" form="datetime"></input>
                <div>
                    {`value: ${value}`}
                </div>
            </IntlProvider>
        )
    }
}


function mapStateToProps(state) {
    const { intl } = state
    return { intl }
}

function mapDispatchToProps(dispatch) {
    return {}
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComp)


const data = [{ "mg_sid": 0, "msg": [{ "type": "text", "bodyText": "歡迎使用IQ客服機器人，請輸入「信用卡」...等關鍵字來進行測試" }], "issend": true, "ischatbot": true, "datetime": "2020-05-27T11:34:19.5907643+08:00" }, { "mg_sid": 5384, "msg": [{ "type": "text", "bodyText": "顯示訊息種類" }], "issend": true, "ischatbot": false, "datetime": "2020-05-27T11:34:24.5927273+08:00" }, { "msg": [{ "type": "mediaCard", "headerText": "我是Media Card", "imageSrc": "https://www.taiwanhot.net/wp-content/uploads/2017/03/58bd1d909b342.jpg", "bodyText": "台北市 內湖區 溫度: 19°c  濕度: 74%  雨量: 0.0mm\n更新時間：04/07 17:00", "actions": [], "extensions": { "showFeedbackButtons": false }, "customPayload": { "data": "5384" }, "traceId": 11917, "withVoice": false }], "issend": true, "ischatbot": true, "error": false, "datetime": "2020-05-27T11:34:25.6886104+08:00" }, { "msg": [{ "type": "cardCarousel", "customPayload": { "data": "5384" }, "elements": [{ "type": "textCard", "headerText": "Card Carousel 區塊1", "bodyText": "我是Text Card", "extensions": { "showFeedbackButtons": false }, "defaultAction": { "type": "postback", "payload": "" }, "actions": [{ "type": "message", "label": "文字按鈕1", "text": "文字按鈕1" }, { "type": "message", "label": "文字按鈕2", "text": "文字按鈕2" }, { "type": "message", "label": "文字按鈕3", "text": "文字按鈕3" }] }, { "type": "textCard", "headerText": "Card Carousel 區塊2", "bodyText": "我是Text Card", "extensions": { "showFeedbackButtons": false }, "defaultAction": { "type": "postback", "payload": "" }, "actions": [{ "type": "uri", "label": "超連結按鈕1", "uri": "http://www.iqs-t.com" }, { "type": "uri", "label": "超連結按鈕2", "uri": "http://www.iqs-t.com/?tag=about" }, { "type": "uri", "label": "超連結按鈕3", "uri": "http://www.iqs-t.com/?tag=technology" }] }], "traceId": 11917, "withVoice": false }], "issend": true, "ischatbot": true, "error": false, "datetime": "2020-05-27T11:34:25.7354727+08:00" }, { "msg": [{ "type": "text", "bodyText": "我是Text" }], "issend": true, "ischatbot": true, "error": false, "datetime": "2020-05-27T11:34:25.7510943+08:00" }, { "mg_sid": 5388, "msg": [{ "type": "text", "bodyText": "文字按鈕1" }], "issend": true, "ischatbot": false, "datetime": "2020-05-27T11:34:44.8563753+08:00" }, { "msg": [{ "type": "text", "bodyText": "我聽不懂!" }], "issend": true, "ischatbot": true, "error": false, "datetime": "2020-05-27T11:34:45.6681749+08:00" }]


if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill')
    require('@formatjs/intl-pluralrules/dist/locale-data/en')
    require('@formatjs/intl-pluralrules/dist/locale-data/zh')
}

if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill')
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en')
    require('@formatjs/intl-relativetimeformat/dist/locale-data/zh')
}

const store = configureStore()
store.runSaga(rootSaga)
let signalR = store.runSignalR()
InstallFontAwesome()

render(
    <Provider store={store} context={ReactReduxContext}>
        <App />
    </Provider>
    , document.getElementById('root')
)



