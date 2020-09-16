# Datetimepicker

Datetimepicker為日期及時間的選擇器

## Install

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
* 利用form可以抓input值，分別有年、月、日、上/下午、時、分

```jsx
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { Datetimepicker } from 'datetimepicker'
import 'datetimepicker/index.styl'

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
    ```
        {max: { year: 2020, month: 10, date: 7, ampm: 0, hour: 9, min: 10 },
         min: { year: 2000, month: 9, date: 7, ampm: 0, hour: 9, min: 10 }}
    ```
* `date` : 選填，預設為true，是否開啟Date(年、月、日)的部分
* `time` : 選填，預設為true，是否開啟Time(上/下午、時、分)的部分

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