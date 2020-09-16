# IQ-React 2 (Plus+)

Webpack 4 + Babel 7 + React 16 新版前端初始包  
使用新版 Webpack 體驗極速的 bundle 速度!

## Install

```
cd iq-react2
npm install
```

## Dev Mode

```
npm run start
```

## Prod Mode

```
npm run build
```

## Test umd

```
npm run umdtest
```

## Datetimepicker Component

```jsx
import { Datetimepicker } from '../module/main.js'
import '../module/main.css'
```

* Datetimepicker需要在 `<IntlProvider>` 之下才能運作
* 利用form可以抓input值，分別有年、月、日、上/下午、時、分
```jsx
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
            value: ""
        }
    }
    
    submit(e) {
        e.preventDefault()
        var value = {}
        Object.values(e.target.elements).map(input =>
            value[input.id]=input.value)
        this.setState({value})
        e.persist()
    }

    render() {
        const { intl: { language } } = this.props
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.submit(e)} id="datetime">
                    <Datetimepicker
                        options={{
                            max: { year: 2020, month: 10, date: 7, ampm: 0, hour: 9, min: 10 },
                            min: { year: 2000, month: 9, date: 7, ampm: 0, hour: 9, min: 10 },
                        }}
                        date={true}
                        time={false}
                    ></Datetimepicker>
                </form>
                <input type="submit" form="datetime"></input>
                <div>
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
```

### `Datetimepicker` props

* `options` : 設定時間範圍
  * `max`、`min` : 必填，包含年、月、日、上/下午、時、分
    ```json
    {
        max: { year: 2020, month: 10, date: 7, ampm: 0, hour: 9, min: 10 },
        min: { year: 2000, month: 9, date: 7, ampm: 0, hour: 9, min: 10 },
    }
    ```
* `date` : 選填，是否開啟Date(年、月、日)的部分
* `time` : 選填，是否開啟Time(上/下午、時、分)的部分

### FontAwesome Icon
模組使用到的 Icon : `faArrowUP`, `faArrowDown`, `farCalendar`，需要事先被引入
```jsx
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faArrowUp,
    faArrowDown,
} from '@fortawesome/free-solid-svg-icons'

import {
    faEye as farEye,
    faCalendar as farCalendar
} from '@fortawesome/free-regular-svg-icons'

export default () => library.add(
    farCalendar,
    faArrowUp,
    faArrowDown,
)
```

## Reference

本專案升級自 [IQ-react](http://10.9.173.136/SideProject/IQ-react)，如果你已經在使用它，請繼續使用，不需要進行更新


## ENV Version

* **Node.js: v9.7.1**
* **npm: 5.6.0**


## Package Version

* **react: 16**
* **redux: 4** 
* **react-router-dom: 4** 
* **connected-react-router: 6** (棄用react-router-redux)
* **postcss-loader: 3**
* **react-intl: 4**
* **@fortawesome/react-fontawesome: 0.19**

## Dev Package Version

* **babel: 7**
* **webpack: 4**
