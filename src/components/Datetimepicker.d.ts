import * as React from 'react'

export interface DatetimepickerProps {
    /**
     * 時間輸入的最小值，
     * 格式為 `YYYY-MM-DDTHH:MM`，
     * 如果年份超過四位數則為 `+YYYYYY-MM-DDTHH:MM`，
     * 預設為 `1970-01-01T00:00`
     */
    min?: string
    /**
     * 時間輸入的最小值，
     * 格式為 `YYYY-MM-DDTHH:MM`，
     * 如果年份超過四位數則為 `+YYYYYY-MM-DDTHH:MM`，
     * 預設為 `+275759-12-31T23:59`
     */
    max?: string
    /**
     * 當前顯示的值，
     * 格式為 `YYYY-MM-DDTHH:MM`，
     * 預設為 `min`，
     * 可搭配 `onChange` 取值更新
     */
    value?: string
    /**
     * `datetime` field 的 id，
     * 預設為 `datetime`
     */
    id?: string
    /**
     * `datetime` field 的 name，
     * 預設為 `datetime`
     */
    name?: string
    /**
     * 用於調整 input 欄位樣式，
     * 調整 focus 樣式使用 `:focus-within`
     */
    classname?: string
    /**
     * 當作 datetime field 的 ref
     */
    inputRef?: React.RefObject<unknown>
    /**
     * datetime field 的值變動時會執行該 function
     * @param value datetime field 的 value
     */
    onChange?: (value: string) => void
    /**
     * `true` 時會關閉年、月、日的部分，
     * 預設為 `false`
     */
    nodate?: boolean
    /**
     * `true` 時會關閉上午下午、時、分的部分，
     * 預設為 `false`
     */
    notime?: boolean
    /**
     * `true` 時會自動 focus` 到可填的第一格 input，
     * 預設為 `false`
     */
    autofocus?: boolean
    /**
     * `true` 時會禁用所有欄位，
     * 傳入 array 則可以禁用指定欄位，
     * 可禁用的欄位為 `['year, 'month', 'date', 'ampm', 'hour', 'min']`，
     * 預設為 `false`
     */
    disabled?: boolean | (keyof DatetimeSelect) []
}

type DatetimeSelect = {
    year: number
    month: number
    date: number
    hour: number
    min: number
    ampm: 0 | 1
}

export interface DatetimepickerState {
    openCalendar: boolean
    select: DatetimeSelect
    input: DatetimeSelect
    max: DatetimeSelect
    min: DatetimeSelect
    openYearMonth: boolean
    keyin: boolean
}

declare class Datetimepicker extends React.Component<DatetimepickerProps, DatetimepickerState> {}

export default Datetimepicker
