import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes, { object, objectOf } from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import Dateinput from './Dateinput'
import Timeinput from './Timeinput'
import shallowEqual from '../lib/shallowEqual'
import '../styl/lib/datetimepicker.styl'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * @typedef {import('./Datetimepicker').DatetimepickerProps} DatetimepickerProps
 * @typedef {import('./Datetimepicker').DatetimepickerState} DatetimepickerState
 * @extends React.Component<DatetimepickerProps, DatetimepickerState>
 */
export default class Datetimepicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCalendar: false,
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                hour: new Date().getHours() % 12,
                min: new Date().getMinutes(),
                ampm: new Date().getHours() / 12 >= 1 ? 1 : 0,
            },
            input: {
                year: new Date().getFullYear(),
                month: this.format(new Date().getMonth() + 1, 10, '0'),
                date: this.format(new Date().getDate(), 10, '0'),
                hour: this.format(new Date().getHours() % 12, 10, '0'),
                min: this.format(new Date().getMinutes(), 10, '0'),
                ampm: new Date().getHours() / 12 >= 1 ? 1 : 0,
            },
            max: { year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59 },
            min: { year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0 },
            openYearMonth: false,
            keyin: true
        }
        this.DatetimeInputRef = React.createRef()
        this.datetimepicker = React.createRef()
    }

    componentDidUpdate(prevProps, prevState) {
        const { select } = this.state
        const { value, onChange, max, min } = this.props
        const use24hours = this.getEffectiveUse24hours()

        if (prevProps.value !== value || prevProps.min !== min || prevProps.max !== max) {
            this.setselectinput()
        }

        if (!shallowEqual(prevState.select, select) || prevProps.use24hours !== this.props.use24hours || prevProps.displayPattern !== this.props.displayPattern) {
            this.setState({
                input: {
                    year: select.year,
                    month: this.format(select.month, 10, '0'),
                    date: this.format(select.date, 10, '0'),
                    hour: this.format(this.getHourDisplayValue(select, use24hours), 10, '0'),
                    min: this.format(select.min, 10, '0'),
                    ampm: select.ampm
                }
            }, () => {
                if (typeof onChange !== 'function') return false
                onChange(this.getDateTime())
            })           
        }
    }

    componentDidMount() {
        this.setselectinput()
    }

    getDateTime = () => {
        const { nodate, notime, valuePattern } = this.props
        const { select } = this.state
        const year = (select.year > 9999 && (select.year > 99999 ? '+' : '+0')) + select.year
        const hour = select.ampm * 12 + Number(select.hour)
        var date = new Date(year, select.month - 1, select.date, hour, select.min)

        if (valuePattern) {
            return this.formatByPattern(date, valuePattern)
        }

        if(!nodate & notime){
            return `${date.getFullYear()}-${this.format(date.getMonth() + 1, 10, '0')}-${this.format(date.getDate(), 10, '0')}`
        }
        else if(!notime & nodate){
            return `${this.format(date.getHours(), 10, '0')}:${this.format(date.getMinutes(), 10, '0')}`
        }
        else if(!nodate & !notime){
            return `${date.getFullYear()}-${this.format(date.getMonth() + 1, 10, '0')}-${this.format(date.getDate(), 10, '0')}T${this.format(date.getHours(), 10, '0')}:${this.format(date.getMinutes(), 10, '0')}`
        }
        else return ''
    }

    formatByPattern = (date, pattern) => {
        const hour24 = date.getHours()
        const hour12 = hour24 % 12
        const ampm = hour24 >= 12 ? 1 : 0
        const replacements = {
            'yyyy': String(date.getFullYear()),
            'MM': this.format(date.getMonth() + 1, 10, '0'),
            'dd': this.format(date.getDate(), 10, '0'),
            'HH': this.format(hour24, 10, '0'),
            'hh': this.format(hour12, 10, '0'),
            'mm': this.format(date.getMinutes(), 10, '0'),
            'ss': this.format(date.getSeconds(), 10, '0'),
            'tt': ampm ? 'PM' : 'AM'
        }
        let result = ''
        let i = 0
        while (i < pattern.length) {
            let matched = false
            for (const token of ['yyyy', 'MM', 'dd', 'HH', 'hh', 'mm', 'ss', 'tt']) {
                if (pattern.substr(i, token.length) === token) {
                    result += replacements[token]
                    i += token.length
                    matched = true
                    break
                }
            }
            if (!matched) {
                result += pattern[i]
                i++
            }
        }
        return result
    }

    getHourDisplayValue = (select, use24hours) => {
        if (use24hours) {
            return select.ampm * 12 + Number(select.hour)
        }
        return Number(select.hour)
    }

    isValidDate = (v) => {
        return v instanceof Date && !isNaN(v)
    }

    setInitDate = (v, d, state) => {
        var r = {}
        if (this.isValidDate(v)) {
            r = {
                year: v.getFullYear(),
                month: v.getMonth() + 1,
                date: v.getDate(),
                hour: v.getHours() % 12,
                min: v.getMinutes(),
                ampm: v.getHours() / 12 >= 1 ? 1 : 0
            }
        }
        else {
            r = d
        }
        this.setState({ [state]: r })
        return r
    }

    yearFormat = (v) => {
        var year = ""
        if (v.search('-') != -1) {
            var y = v.split('-')[0]
            if (y.search(/\+/) == -1) {
                if (Number(y) > 9999) year = "+0"
                if (Number(y) > 99999) year = "+"
            }
        }
        return year
    }

    parseValueByPattern = (valueStr, pattern) => {
        const fields = {}
        let vi = 0
        let pi = 0
        const tokens = ['yyyy', 'MM', 'dd', 'HH', 'hh', 'mm', 'ss', 'tt']
        while (pi < pattern.length && vi < valueStr.length) {
            let matched = false
            for (const token of tokens) {
                if (pattern.substr(pi, token.length) === token) {
                    const len = token === 'yyyy' ? 4 : 2
                    const raw = valueStr.substr(vi, len)
                    if (token === 'tt') {
                        fields[token] = raw.toUpperCase()
                    } else {
                        fields[token] = Number(raw)
                    }
                    vi += len
                    pi += token.length
                    matched = true
                    break
                }
            }
            if (!matched) {
                vi++
                pi++
            }
        }
        const year = fields['yyyy'] || 1970
        const month = (fields['MM'] || 1) - 1
        const day = fields['dd'] || 1
        let hour = fields['HH'] != null ? fields['HH'] : (fields['hh'] != null ? fields['hh'] : 0)
        if (fields['tt'] && fields['hh'] != null) {
            if (fields['tt'] === 'PM' && hour < 12) hour += 12
            if (fields['tt'] === 'AM' && hour === 12) hour = 0
        }
        const minute = fields['mm'] || 0
        const second = fields['ss'] || 0
        const date = new Date(year, month, day, hour, minute, second)
        date.setFullYear(year)
        return date
    }

    setselectinput = () => {
        const { value, max, min, valuePattern } = this.props

        var MIN = { year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0 }
        var MAX = { year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59 }

        if (typeof min == "string") {
            var v = new Date(this.yearFormat(min) + min + (min.includes("T") ? "" : "T00:00"))
            MIN = this.setInitDate(v, MIN, "min")
        }

        if (typeof max == "string") {
            var v = new Date(this.yearFormat(max) + max + (max.includes("T") ? "" : "T00:00"))
            MAX = this.setInitDate(v, MAX, "max")
        }

        if (typeof value == "string") {
            var v
            if (valuePattern) {
                v = this.parseValueByPattern(value, valuePattern)
            } else {
                v = new Date(this.yearFormat(value) + value + (value.includes("T") ? "" : "T00:00"))
            }
            this.setInitDate(v, MIN, "select")
        }
        else if (!value) {
            this.setState({ select: MIN })
        }
    }

    createarr = (start, end) => {
        var arr = []
        for (var i = start; i <= end; i++) {
            arr.push(i)
        }
        return arr
    }

    toggle = (state, on) => {
        switch (state) {
            case "openYearMonth":
                this.setState({
                    openYearMonth: !this.state.openYearMonth
                })
                break;
            case "openCalendar":
                this.setState({
                    openCalendar: !!on ? on : !this.state.openCalendar,
                    openYearMonth: false
                })
        }
    }

    selectDay = (year, month, date, hour, minute, ampm) => {   //合法化
        const { select, max, min } = this.state
        const use24hours = this.getEffectiveUse24hours()
        var y = !!year? year: select.year
        var m = !!month ? month : select.month
        var d = !!date ? date : select.date
        var n = minute != undefined ? minute : select.min
        var h = 0
        if (use24hours) {
            h = hour != undefined ? Number(hour) : (select.ampm * 12 + Number(select.hour))
        }
        else {
            h = (hour != undefined ? hour : select.hour) + (ampm != undefined ? ampm : select.ampm)*12
        }
        var temp = new Date(y,m-1,d,h,n)
        var start = new Date(min.year, min.month - 1, min.date, min.hour + (min.ampm) * 12, min.min)
        var end = new Date(max.year, max.month - 1, max.date, max.hour + (max.ampm) * 12, max.min)
        if (temp - start >= 0 && end - temp >= 0){
            this.setState({
                select: {
                    year: temp.getFullYear(),
                    month: temp.getMonth()+1,
                    date: temp.getDate(),
                    hour: temp.getHours() % 12,
                    min: temp.getMinutes(),
                    ampm: temp.getHours() / 12 >= 1 ? 1 : 0
                },
            })
        }
        else if(temp - start >= 0){
            this.setState({
                select: max
            })
        }
        else if (end - temp >= 0){
            this.setState({
                select: min
            })
        }
    }

    checkhour = (hour) => {
        const use24hours = this.getEffectiveUse24hours()
        const { select, input, min, max } = this.state
        var start = new Date(min.year, min.month - 1, min.date, min.hour + (min.ampm) * 12)
        var end = new Date(max.year, max.month - 1, max.date, max.hour + (max.ampm) * 12)
        var hourValue = use24hours ? hour : hour + (select.ampm) * 12
        var t = new Date(select.year, select.month - 1, select.date, hourValue)
        if (t - start >= 0 && end - t >= 0 && (use24hours ? hour < 24 : hour < 13)) {
            return hour
        }
        else {
            var mindate = select.date == min.date && select.month == min.month && select.year == min.year
            var maxdate = select.date == max.date && select.month == max.month && select.year == max.year
            var minHour24 = min.hour + min.ampm * 12
            var maxHour24 = max.hour + max.ampm * 12
            if (use24hours) {
                if (hour < minHour24 && mindate) hour = minHour24
                else if (hour > maxHour24 && maxdate) hour = maxHour24
                else if (hour > 23) hour = 23
                else hour = 0
            }
            else {
                if (hour + select.ampm * 12 < minHour24 && mindate) hour = min.hour
                else if (hour + select.ampm * 12 > maxHour24 && maxdate) hour = max.hour
                else if (hour > 12) hour = 12
                else hour = 0
            }
            return hour
        }
    }

    input = (e) => {    //輸入或按上下鍵的值
        const use24hours = this.getEffectiveUse24hours()
        let targetValue = e.target.value
        if (e.target.className == 'hourinput') {
            if (this.state.keyin) {
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.className.replace('input', '')]: use24hours ? Number(targetValue) : (targetValue == 12 ? '00' : Number(targetValue))
                    },
                }, () => this.focusnext(e))
            }
            else {
                // 自動補0
                var hour = use24hours ? Number(targetValue) : (targetValue == 12 ? 0 : Number(targetValue, 10, '0'))
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.className.replace('input', '')]: this.format(this.checkhour(hour), 10, '0')
                    },
                    keyin: true
                })
            }
        }
        else {
            if (this.state.keyin) {
                if (e.target.className == 'yearinput' && targetValue == 0){
                    this.setState({
                        input: {
                            ...this.state.input,
                            [e.target.className.replace('input', '')]: ''
                        },
                    })
                }
                else {
                    this.setState({
                        input: {
                            ...this.state.input,
                            [e.target.className.replace('input', '')]: Number(targetValue)
                        },
                    }, () => this.focusnext(e))
                }
            }
            else {
                // 自動補0
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.className.replace('input', '')]: this.format(Number(targetValue), 10, '0')
                    },
                    keyin: true
                })
            }
        }
        e.persist()
    }

    focusNextSibling = (target) => {
        target.blur()
        var next = target.nextElementSibling
        while (!!next) {
            if (next.nodeName == "INPUT" || next.nodeName == "SELECT") {
                next.focus()
                break
            }
            next = next.nextElementSibling
        }
    }

    focusnext = (e) => {    //判定完成
        const use24hours = this.getEffectiveUse24hours()
        var target = e.target
        var max = Number(target.max)
        var min = Number(target.min)
        var v = Number(target.value)
        if (target.className.replace('input', '') != 'hour') {
            if (v * 10 > max || (target.value.length >= 2 && target.className.replace('input', '') != 'year')) {
                this.focusNextSibling(target)
            }
        }
        if (e.target.className.replace('input', '') == 'hour') {
            const hourValue = Number(target.value)
            const shouldAdvance = use24hours ?
                (target.value.length >= 2 || hourValue > 2) :
                (target.value.length >= 2 || hourValue > 1)
            if (shouldAdvance) {
                this.focusNextSibling(target)
            }
        }
        if (e.target.className.replace('input', '') == 'ampm') {
            this.focusNextSibling(target)
        }
    }

    check = (e) => {    //blur存入select或調整input變成合法值
        const { select, input, min, max } = this.state
        const use24hours = this.getEffectiveUse24hours()
        const value = Number(e.target.value)
        var start = new Date(min.year, min.month - 1, min.date, min.hour + (min.ampm) * 12, min.min)
        var end = new Date(max.year, max.month - 1, max.date, max.hour + (max.ampm) * 12, max.min)
        var hour = select.ampm * 12 + Number(select.hour)
        var date = new Date(select.year, select.month - 1, select.date, hour, select.min)
        var nextdate = date
        switch (e.target.className.replace('input', '')) {
            case 'year':
                nextdate.setFullYear(value)
                break
            case 'month':
                nextdate.setMonth(value - 1)
                break
            case 'date':
                nextdate.setDate(value)
                break
            case 'ampm':
                nextdate.setHours(value * 12 + select.hour)
                break
            case 'hour':
                if (use24hours) {
                    nextdate.setHours(value)
                }
                else {
                    nextdate.setHours(select.ampm * 12 + (value == 12 ? 0 : value))
                }
                break
            case 'min':
                nextdate.setMinutes(value)
            default:
                break;
        }
        if (nextdate - start >= 0 && end - nextdate >= 0) {
            this.setState({
                select: {
                    year: nextdate.getFullYear(),
                    month: nextdate.getMonth()+1,
                    date: nextdate.getDate(),
                    hour: nextdate.getHours()%12,
                    min: nextdate.getMinutes(),
                    ampm: nextdate.getHours()/12>=1? 1:0
                },
                input: {
                    year: nextdate.getFullYear(),
                    month: this.format(nextdate.getMonth()+1, 10, '0'),
                    date: this.format(nextdate.getDate(), 10, '0'),
                    hour: this.format(this.getHourDisplayValue({
                        hour: nextdate.getHours()%12,
                        ampm: nextdate.getHours()/12>=1? 1:0
                    }, use24hours), 10, '0'),
                    min: this.format(nextdate.getMinutes(), 10, '0'),
                    ampm: nextdate.getHours()/12>=1? 1:0
                }
            })
        }
        else if (nextdate - start >= 0) {
            this.setState({
                input: {
                    year: max.year,
                    month: this.format(max.month, 10, '0'),
                    date: this.format(max.date, 10, '0'),
                    hour: this.format(this.getHourDisplayValue(max, use24hours), 10, '0'),
                    min: this.format(max.min, 10, '0'),
                    ampm: max.ampm
                },
                select: max
            })
        }
        else if (end - nextdate >= 0) {
            this.setState({
                input: {
                    year: min.year,
                    month: this.format(min.month, 10, '0'),
                    date: this.format(min.date, 10, '0'),
                    hour: this.format(this.getHourDisplayValue(min, use24hours), 10, '0'),
                    min: this.format(min.min, 10, '0'),
                    ampm: min.ampm
                },
                select: min
            })
        }

    }

    format = (num, max, char) => {
        return Number(num) < max ? char + String(Number(num)) : String(num)
    }

    selectall = (e) => {
        e.target.select()
    }

    enter = (e) => {
        if (["ArrowUp", "ArrowDown"].includes(e.key)) {
            this.setState({
                keyin: false
            })
        }
        if (["Enter", "ArrowRight"].includes(e.key)) {
            e.preventDefault()
            e.target.blur()
            var next = e.target.nextElementSibling
            while (!!next) {
                if (next.nodeName == "INPUT") {
                    next.focus()
                    break
                }
                next = next.nextElementSibling
            }
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault()
            e.target.blur()
            var prev = e.target.previousElementSibling
            while (!!prev) {
                if (prev.nodeName == "INPUT") {
                    prev.focus()
                    break
                }
                prev = prev.previousElementSibling
            }
        }
        e.persist()
    }

    getEffectivePattern = () => {
        const { displayPattern, nodate, notime, use24hours } = this.props
        if (displayPattern) return displayPattern

        let p = ''
        if (!nodate) p += 'yyyy/MM/dd'
        if (!notime) {
            if (!use24hours) p += 'tthh:mm'
            else p += 'HH:mm'
        }
        return p
    }

    getEffectiveUse24hours = () => {
        const effectivePattern = this.getEffectivePattern()
        return effectivePattern.includes('HH')
    }

    parsePattern = (pattern) => {
        const tokens = []
        let i = 0
        while (i < pattern.length) {
            if (pattern.substr(i, 4) === 'yyyy') {
                tokens.push({ type: 'field', field: 'year' })
                i += 4
            } else if (pattern.substr(i, 2) === 'MM') {
                tokens.push({ type: 'field', field: 'month' })
                i += 2
            } else if (pattern.substr(i, 2) === 'dd') {
                tokens.push({ type: 'field', field: 'date' })
                i += 2
            } else if (pattern.substr(i, 2) === 'HH') {
                tokens.push({ type: 'field', field: 'hour' })
                i += 2
            } else if (pattern.substr(i, 2) === 'hh') {
                tokens.push({ type: 'field', field: 'hour' })
                i += 2
            } else if (pattern.substr(i, 2) === 'mm') {
                tokens.push({ type: 'field', field: 'min' })
                i += 2
            } else if (pattern.substr(i, 2) === 'ss') {
                tokens.push({ type: 'field', field: 'sec' })
                i += 2
            } else if (pattern.substr(i, 2) === 'tt') {
                tokens.push({ type: 'field', field: 'ampm' })
                i += 2
            } else {
                if (tokens.length > 0 && tokens[tokens.length - 1].type === 'separator') {
                    tokens[tokens.length - 1].value += pattern[i]
                } else {
                    tokens.push({ type: 'separator', value: pattern[i] })
                }
                i++
            }
        }
        return tokens
    }

    splitPatternTokens = (tokens) => {
        const dateFields = new Set(['year', 'month', 'date'])
        const dateTokens = []
        const timeTokens = []
        const renderOrder = []

        let lastFieldType = null

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            if (token.type === 'field') {
                const fieldType = dateFields.has(token.field) ? 'date' : 'time'
                const target = fieldType === 'date' ? dateTokens : timeTokens
                target.push(token)

                if (lastFieldType !== fieldType) {
                    renderOrder.push({ type: fieldType })
                    lastFieldType = fieldType
                }
            } else if (token.type === 'separator') {
                let nextFieldType = null
                for (let j = i + 1; j < tokens.length; j++) {
                    if (tokens[j].type === 'field') {
                        nextFieldType = dateFields.has(tokens[j].field) ? 'date' : 'time'
                        break
                    }
                }

                if (nextFieldType === lastFieldType) {
                    const target = lastFieldType === 'date' ? dateTokens : timeTokens
                    target.push(token)
                } else {
                    renderOrder.push({ type: 'separator', value: token.value })
                }
            }
        }

        return { dateTokens, timeTokens, renderOrder }
    }

    detectPosition = () => {
        var input = this.DatetimeInputRef.current,
            ele = input.parentNode.getBoundingClientRect(),
            style = getComputedStyle(input),
            bodyRect = document.body.getBoundingClientRect()
        var font = {
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontStyle: style.fontStyle
        }
        let top, left
        if (window.innerHeight - ele.bottom > 310) top = ele.bottom + window.scrollY
        else if (ele.top > 310) top = ele.top + window.scrollY - 310
        else top = ele.bottom + window.scrollY
        left = ele.left + window.scrollX
        return { top, left, zIndex: 6666666, ...font }
    }

    testIE = () => {
        var userAgent = navigator.userAgent,
            isMSIE = /MSIE|Trident/i.test(userAgent)
        return isMSIE
    }

    render() {
        const { openCalendar, openYearMonth, select, max, min, input } = this.state
        const { nodate, notime, autofocus, value, id, name, disabled, inputRef, classname, onChange, use24hours, displayPattern } = this.props
        const exception = ['autofocus', 'nodate', 'notime', 'value', 'min', 'max', 'disabled', 'inputRef', 'classname', 'onChange', 'use24hours', 'displayPattern', 'valuePattern']
        var props = {}
        Object.keys(this.props).filter(key => exception.indexOf(key)==-1).map(k => props[k] = this.props[k])

        const effectivePattern = this.getEffectivePattern()
        const effectiveUse24hours = this.getEffectiveUse24hours()
        const tokens = this.parsePattern(effectivePattern)
        const { dateTokens, timeTokens, renderOrder } = this.splitPatternTokens(tokens)

        const patternFields = new Set(tokens.filter(t => t.type === 'field').map(t => t.field))
        const effectiveNodate = nodate || !patternFields.has('year') && !patternFields.has('month') && !patternFields.has('date')
        const effectiveNotime = notime || !patternFields.has('hour') && !patternFields.has('min') && !patternFields.has('sec') && !patternFields.has('ampm')

        const patternDisabledFields = []
        if (!patternFields.has('year')) patternDisabledFields.push('year')
        if (!patternFields.has('month')) patternDisabledFields.push('month')
        if (!patternFields.has('date')) patternDisabledFields.push('date')
        if (!patternFields.has('hour')) patternDisabledFields.push('hour')
        if (!patternFields.has('min')) patternDisabledFields.push('min')
        if (!patternFields.has('ampm')) patternDisabledFields.push('ampm')

        const effectiveDisabled = typeof disabled === 'boolean'
            ? disabled
            : [...new Set([...(Array.isArray(disabled) ? disabled : []), ...patternDisabledFields])]

        return (
            <div className="datetime-container">
                <div className={`${!!classname ? classname : "defaultinput"} datetimeinput datetimeinputposition`}>
                    <div id="hideinput">
                        <input {...props} value={this.getDateTime()}
                                ref={inputRef} readOnly></input>
                    </div>
                    <div ref={this.DatetimeInputRef}>
                        {
                            !!this.DatetimeInputRef.current &&
                            renderOrder.map((item, i) => {
                                if (item.type === 'separator') {
                                    return <span key={i} className="disable-selection">{item.value}</span>
                                }
                                if (item.type === 'date') {
                                    return <Dateinput
                                        key={`date-${i}`}
                                        DatetimeInputRef={this.DatetimeInputRef}
                                        select={select}
                                        input={input}
                                        max={max}
                                        min={min}
                                        patternTokens={dateTokens}
                                        format={(n, m, c) => this.format(n, m, c)}
                                        setinput={(e) => this.input(e)}
                                        selectall={(e) => this.selectall(e)}
                                        check={(e) => this.check(e)}
                                        enter={(e) => this.enter(e)}
                                        autofocus={autofocus}
                                        disabled={disabled}
                                    />
                                }
                                if (item.type === 'time') {
                                    return <Timeinput
                                        key={`time-${i}`}
                                        DatetimeInputRef={this.DatetimeInputRef}
                                        select={select}
                                        input={input}
                                        max={max}
                                        min={min}
                                        use24hours={effectiveUse24hours}
                                        patternTokens={timeTokens}
                                        format={(n, m, c) => this.format(n, m, c)}
                                        setinput={(e) => this.input(e)}
                                        selectall={(e) => this.selectall(e)}
                                        check={(e) => this.check(e)}
                                        enter={(e) => this.enter(e)}
                                        autofocus={!dateTokens.length && autofocus}
                                        disabled={disabled}
                                    />
                                }
                                return null
                            })
                        }
                    </div>
                    <div className="calendar onclick" onClick={() => this.toggle("openCalendar")}>
                        <Icon icon={["far", "calendar"]} />
                    </div>
                </div>
                {
                    openCalendar && !(typeof disabled == 'boolean' && disabled) &&
                    ReactDOM.createPortal(
                    <div className="datetime-modal" style={this.detectPosition()} ref={this.datetimepicker}>
                        <div className="bk" onClick={() => this.toggle("openCalendar", false)} />
                        {
                            !effectiveNodate &&
                            <div className="datebox">
                                <div className="box-title">
                                    {
                                        (typeof effectiveDisabled == 'object' && (effectiveDisabled.indexOf('year') == -1 || effectiveDisabled.indexOf('month') == -1)) ?
                                            <div className={`year-month onclick hover ${openYearMonth? 'disabled': ''}`} onClick={() => this.toggle("openYearMonth")}>
                                                {
                                                    select.year>9999 && this.testIE()?
                                                    <div>{new Date(select.year, select.month - 1).getFullYear()+'/'+(new Date(select.year, select.month - 1).getMonth()+1)}</div>
                                                    :<FormattedDate
                                                        value={new Date(select.year, select.month - 1)}
                                                        year="numeric"
                                                        month="short"
                                                    />
                                                }
                                                <span className="arrow"></span>
                                            </div>
                                            : <div className="year-month">
                                                {
                                                    select.year>9999 && this.testIE()?
                                                    <div>{new Date(select.year, select.month - 1).getFullYear()+'/'+(new Date(select.year, select.month - 1).getMonth()+1)}</div>
                                                    :<FormattedDate
                                                        value={new Date(select.year, select.month - 1)}
                                                        year="numeric"
                                                        month="short"
                                                    />
                                                }
                                            </div>
                                    }
                                    {
                                        !openYearMonth &&
                                        <div className="month-btns">
                                            {
                                                new Date(select.year, select.month - 2) - new Date(min.year, min.month - 1) >= 0 && effectiveDisabled.indexOf('month') == -1 ?
                                                    <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month - 2).getFullYear(), new Date(select.year, select.month - 2).getMonth() + 1)}>
                                                        <Icon icon="arrow-up" />
                                                    </div>
                                                    : <div className="previousmonth disabled-arrow">
                                                        <Icon icon="arrow-up" />
                                                    </div>
                                            }
                                            {
                                                new Date(max.year, max.month - 1) - new Date(select.year, select.month) >= 0 && effectiveDisabled.indexOf('month') == -1 ?
                                                    <div className="nextmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month).getFullYear(), new Date(select.year, select.month).getMonth() + 1)}>
                                                        <Icon icon="arrow-down" />
                                                    </div>
                                                    : <div className="nextmonth disabled-arrow">
                                                        <Icon icon="arrow-down" />
                                                    </div>
                                            }
                                        </div>
                                    }
                                </div>
                                {
                                    openYearMonth ?
                                        <YearSelect
                                            select={select}
                                            max={max}
                                            min={min}
                                            selectDay={(year, month, date, hour, min, ampm) => {this.selectDay(year, month, date, hour, min, ampm); this.toggle("openYearMonth")}}
                                            disabled={effectiveDisabled}
                                        ></YearSelect>

                                        : <Days
                                            select={select}
                                            selectDay={(year, month, date, hour, min, ampm) => this.selectDay(year, month, date, hour, min, ampm)}
                                            max={max}
                                            min={min}
                                            disabled={effectiveDisabled}
                                        ></Days>
                                }
                            </div>
                        }

                        {
                            !effectiveNotime &&
                            <Time
                                select={select}
                                selectDay={(year, month, date, hour, min, ampm) => this.selectDay(year, month, date, hour, min, ampm)}
                                max={max}
                                min={min}
                                disabled={effectiveDisabled}
                                format={(n, m, c) => this.format(n, m, c)}
                                use24hours={effectiveUse24hours}
                            ></Time>
                        }
                    </div>, document.body)
                }
            </div>
        )
    }

    static defaultProps = {
        // max: {year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59},
        // min: {year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0},
        max: '+275759-12-31T23:59',
        min: '1970-01-01T00:00',
        disabled: [],
        id: 'datetime',
        name: 'datetime',
        use24hours: false
    }

    static propTypes = {
        max: propTypes.string,
        min: propTypes.string,
        value: propTypes.oneOfType([propTypes.object, propTypes.string]),
        nodate: propTypes.bool,
        notime: propTypes.bool,
        autoFocus: propTypes.bool,
        disabled: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.bool]),
        inputRef: propTypes.object,
        onChange: propTypes.func,
        id: propTypes.string,
        name: propTypes.string,
        use24hours: propTypes.bool
    }
}
