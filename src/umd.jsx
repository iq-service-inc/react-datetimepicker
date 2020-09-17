import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider, ReactReduxContext } from 'react-redux'
import configureStore, { history } from "./store"
import InstallFontAwesome from './lib/icon'
import { IntlProvider } from 'react-intl'
import rootSaga from "./sagas"
import { Datetimepicker } from '../module/main.js'
import '../module/main.css'


class AppComp extends Component {
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
        var value = {}
        Object.values(e.target.elements).map(input =>
            value[input.id]=input.value)
        this.setState({value})
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
        const { intl: { language } } = this.props
        const { value } = this.state
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
                        value={options.value}
                        nodate={options.nodate}
                        notime={options.notime}
                        autofocus={options.autofocus}
                        disabled={!!options.disabled? options.disabled.split(' '): []}
                        // value={'2030-6-27T03:24'}
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
                    { !!value && <FormattedDate
                        value={new Date(value.year,(value.month-1),value.date)}
                    />}
                    <br/>
                    { !!value && <FormattedTime value={new Date(0,0,0,value.ampm*12+Number(value.hour),value.min)} />}
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



