# Datetimepicker

Datetimepicker為日期及時間的選擇器

## Install
### 依賴套件
```
npm install --save @fortawesome/react-fontawesome prop-types react-intl
```

### 開發人員模式
```
git clone http://10.9.173.136/SideProject/react-datetimepicker
cd react-datetimepicker
npm install
```

### 使用 Component 模式
```
npm install --save git+http://10.9.173.136/SideProject/react-datetimepicker.git
```

## 開發人員模式 npm Script

### 開發 datetimepicker
啟動 port 888 dev server
```
npm run start
```

### 打包 datetimepicker
```
npm run umd
```

### 測試 umd
啟動 port 999 dev server
```
npm run umdtest
```

## Datetimepicker Component

```jsx
import { Datetimepicker } from 'datetimepicker'
import 'datetimepicker/index.styl'
```

* `<Datetimepicker>` 需要在 `<IntlProvider>` 之下才能運作
* `Datetimepicker`的time為am 00:00 ~ pm 11:59，0顯示為12

```jsx
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { Datetimepicker } from 'datetimepicker'
import 'datetimepicker/index.styl'

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
                        // min={{ year:2030, month:7, date:20, ampm:0, hour:9, min:0}}
                        max={{ year:2040, month:7, date:20, ampm:0, hour:9, min:0}}
                        value={value}
                        // value={'2030-6-27T03:24'}
                        // value={{ year:2030, month:6, date:20, ampm:0, hour:9, min:0}}
                        id="birth"
                        name="birth"
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

* `max`、`min` : 選填，預設1970/1/1 am 00:00 ~ 275759/12/31 pm 11:59，包含年、月、日、上/下午、時、分
  ```
    max= {{ year: 2030, month: 9, date: 7, ampm: 0, hour: 9, min: 10 }}
    min= {{ year: 2000, month: 9, date: 7, ampm: 0, hour: 9, min: 10 }}
  ```
* `value` : 選填，預設為`min`，可傳String或Object，皆會轉成String，( 建議使用String，可利用onChange取值更新，寫成Controlled Component )
  ```
    value={'2030-6-27T03:24'}
    value={{ year:2030, month:6, date:20, ampm:0, hour:9, min:0}}
  ```
* `id` : 選填，預設為`datetime`，datetime field的id
* `name` : 選填，預設為`datetime`，datetime field的name
* `inputRef` : 選填，當作datetime field的ref，( datetime field的value為string，ex: `2020-10-22T13:20` )
* `onChange` : 選填，datetime field的值變動時會執行該function，回傳datetime field的value ( ex: `2020-10-22T13:20` )
* `nodate` : 選填，是否開啟Date(年、月、日)的部分
* `notime` : 選填，是否開啟Time(上/下午、時、分)的部分
* `autofocus` : 選填，focus可填的第一格input
* `disabled` : 選填，bool時禁用全部欄位，array時可禁用特定欄位
  ```
    disabled={['year,'month','date','ampm','hour','min']}
  ```

### FontAwesome Icon
模組使用到的 Icon : `faArrowUP`, `faArrowDown`, `farCalendar`，需要事先被引入
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