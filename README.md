# Datetimepicker

A simple and reusable Datepicker component for React 

![Datetimepicker](https://github.com/iq-service-inc/react-datetimepicker/blob/master/demo.png?raw=true)


## Quick Start 


**Install**
```
npm i @iqs/react-datetimepicker --save
```

**Install peerDependencies**

```
npm install --save @fortawesome/react-fontawesome prop-types react-intl
```

### 依賴圖示

使用：[@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)

使用到的 Icon : `faArrowUP`, `faArrowDown`, `farCalendar`，需要事先被引入

```
npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
```

```jsx
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faArrowUp,
    faArrowDown,
} from '@fortawesome/free-solid-svg-icons'

import {
    faCalendar as farCalendar
} from '@fortawesome/free-regular-svg-icons'

export default () => library.add(
    farCalendar,
    faArrowUp,
    faArrowDown,
)
```


### 多國語系

使用：[react-intl](https://www.npmjs.com/package/react-intl)

部分字詞使用`<FormattedMessage>`

* `datetime.today` : `今天`
* `datetime.am` : `上午`
* `datetime.pm` : `下午`

#### 可從套件匯入
目前僅有中文、英文
```js
    import 'datetimepicker/src/locale/en'
    import 'datetimepicker/src/locale/zh'
```
#### 或手動新增
* zh

```json
{
    "datetime.today": "今天",
    "datetime.am": "上午",
    "datetime.pm": "下午"
}
```
* en

```json
{
    "datetime.today": "Today",
    "datetime.am": "AM",
    "datetime.pm": "PM"
}
```

### Usage 

```jsx
import { Datetimepicker } from '@iqs/datetimepicker'
import '@iqs/datetimepicker/index.styl'
```

* `<Datetimepicker>` 需要在 `<IntlProvider>` 之下才能運作
* `Datetimepicker`的time為am 00:00 ~ pm 11:59，0顯示為12

```jsx
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { Datetimepicker } from '@iqs/datetimepicker'
import '@iqs/datetimepicker/index.styl'

class AppComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '2030-6-27T03:24',
        }
        this.hideInput = React.createRef()
    }

    submit(e) {
        e.preventDefault()
        this.setState({value: e.target['birth'].value})
        e.persist()
    }

    setValue = (value) => {
        this.setState({value})
    }

    render() {
        const { intl: { language } } = this.props
        const { value } = this.state
        return (
            <IntlProvider defaultLocale='zh' {...language}>
                <form onSubmit={(e) => this.submit(e)} id="datetime">
                    <Datetimepicker
                        max='+022030-05-27T03:24'
                        min='2030-07-27T03:24'
                        value={value}
                        // value='2030-06-27T03:24'
                        id="birth"
                        name="birth"
                        classname="birthinput"
                        inputRef={this.hideInput}
                        onChange={(value) => this.setValue(value)}
                        // nodate
                        // notime
                        // autofocus
                        disabled={['month','date']}
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
}
```

### `Datetimepicker` props

* `max`、`min` : 選填，預設1970/1/1 am 00:00 ~ 275759/12/31 pm 11:59，使用解析字串的方式建立Date物件，格式依照瀏覽器不同可能會出錯，格式錯誤無法解析會使用預設值，建議格式`yyyy-mm-ddThh:mm`，若年大於4位數格式寫為`+yyyyyy-mm-ddThh:mm`
  ```
    max='+022030-05-27T03:24'
    min='2030-07-27T03:24'
  ```
* `value` : 選填，預設為`min`，格式錯誤無法解析會使用預設值，( 可利用onChange取值更新，寫成Controlled Component )
  ```
    value='2030-06-27T03:24'
    value='+022030-06-27T03:24'
  ```
* `id` : 選填，預設為`datetime`，datetime field的id
* `name` : 選填，預設為`datetime`，datetime field的name
* `classname` : 選填，用於調整input欄位樣式，調整focus樣式使用`:focus-within`
* `inputRef` : 選填，當作datetime field的ref，( datetime field的value為string，e.g. `2020-01-22T13:20` )
* `onChange` : 選填，datetime field的值變動時會執行該function，回傳datetime field的value ( e.g. `2020-10-22T13:20` )
* `nodate` : 選填，是否開啟Date(年、月、日)的部分，回傳值的格式`hh:mm`
* `notime` : 選填，是否開啟Time(上/下午、時、分)的部分，回傳值的格式`yyyy-mm-dd`或`+yyyyyy-mm-dd`
* `autofocus` : 選填，focus可填的第一格input
* `disabled` : 選填，bool時禁用全部欄位，array時可禁用特定欄位
  ```
    disabled={['year,'month','date','ampm','hour','min']}
  ```


## Dev Mode 

**Install**

```
git clone https://github.com/iq-service-inc/react-datetimepicker.git
cd react-datetimepicker
npm install --save @fortawesome/react-fontawesome prop-types react-intl
npm install
npm run start
```

**Pack Component**

### 打包 datetimepicker
```
npm run umd
```

**Test Pack Component**

啟動 port 999 dev server

```
npm run umdtest
```


## License
Datetimepicker is [MIT licensed](https://github.com/iq-service-inc/react-datetimepicker/blob/master/LICENSE.md)
