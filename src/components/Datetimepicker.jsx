import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes, { object, objectOf } from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import Dateinput from './Dateinput'
import Timeinput from './Timeinput'
import '../styl/lib/datetimepicker.styl'
import { FormattedDate, FormattedTime } from 'react-intl'

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
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                hour: new Date().getHours() % 12,
                min: new Date().getMinutes(),
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

        if (prevProps.value !== value || prevProps.min !== min || prevProps.max !== max) {
            this.setselectinput()
        }

        if (prevState.select !== select) {
            this.setState({
                input: {
                    year: select.year,
                    month: this.format(select.month, 10, '0'),
                    date: this.format(select.date, 10, '0'),
                    hour: this.format(select.hour, 10, '0'),
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
        const { nodate, notime } = this.props
        const { select } = this.state
        const year = (select.year > 9999 && (select.year > 99999 ? '+' : '+0')) + select.year
        const hour = select.ampm * 12 + Number(select.hour)
        var date = new Date(year, select.month - 1, select.date, hour, select.min)
        if(!nodate & !!notime){
            return `${date.getFullYear()}-${this.format(date.getMonth() + 1, 10, '0')}-${this.format(date.getDate(), 10, '0')}`
        }
        else if(!notime & !!nodate){
            return `${this.format(date.getHours(), 10, '0')}:${this.format(date.getMinutes(), 10, '0')}`
        }
        else if(!nodate & !notime){
            return `${date.getFullYear()}-${this.format(date.getMonth() + 1, 10, '0')}-${this.format(date.getDate(), 10, '0')}T${this.format(date.getHours(), 10, '0')}:${this.format(date.getMinutes(), 10, '0')}`
        }
        else return ''
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

    setselectinput = () => {
        const { value, max, min } = this.props

        var MIN = { year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0 }
        var MAX = { year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59 }

        if (typeof min == "string") {
            var v = new Date(this.yearFormat(min) + min)
            MIN = this.setInitDate(v, MIN, "min")
        }

        if (typeof max == "string") {
            var v = new Date(this.yearFormat(max) + max)
            MAX = this.setInitDate(v, MAX, "max")
        }

        if (typeof value == "string") {
            var v = new Date(this.yearFormat(value) + value)
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
                    openCalendar: !!on ? on : !this.state.openCalendar
                })
        }
    }

    selectDay = (year, month, date, hour, minute, ampm) => {   //合法化
        const { select, max, min } = this.state
        var y = !!year? year: select.year
        var m = !!month ? month : select.month
        var d = !!date ? date : select.date
        var h = (hour != undefined ? hour : select.hour) + (ampm != undefined ? ampm : select.ampm)*12
        var n = minute != undefined ? minute : select.min
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
        const { select, input, min, max } = this.state
        var start = new Date(min.year, min.month - 1, min.date, min.hour + (min.ampm) * 12)
        var end = new Date(max.year, max.month - 1, max.date, max.hour + (max.ampm) * 12)
        var t = new Date(select.year, select.month - 1, select.date, hour + (select.ampm) * 12)
        if (t - start >= 0 && end - t >= 0 && hour < 13) {
            return hour
        }
        else {
            var mindate = select.date == min.date && select.month == min.month && select.year == min.year
            var maxdate = select.date == max.date && select.month == max.month && select.year == max.year
            if (hour + select.ampm * 12 < min.hour + min.ampm * 12 && mindate) hour = min.hour
            else if (hour + select.ampm * 12 > max.hour + max.ampm * 12 && maxdate) hour = max.hour
            else if (hour > 12) hour = 12
            else hour = 0
            return hour
        }
    }

    input = (e) => {    //輸入或按上下鍵的值
        if (e.target.className == 'hourinput') {
            if (this.state.keyin) {
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.className.replace('input', '')]: e.target.value == 12 ? '00' : Number(e.target.value)
                    },
                }, () => this.focusnext(e))
            }
            else {
                var hour = e.target.value == 12 ? 0 : Number(e.target.value, 10, '0')
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
                if (e.target.className == 'yearinput' && e.target.value == 0){
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
                            [e.target.className.replace('input', '')]: Number(e.target.value)
                        },
                    }, () => this.focusnext(e))
                }
            }
            else {
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.className.replace('input', '')]: this.format(Number(e.target.value), 10, '0')
                    },
                    keyin: true
                })
            }
        }
        e.persist()
    }

    focusnext = (e) => {    //判定完成
        var target = e.target
        var max = Number(target.max)
        var min = Number(target.min)
        var v = Number(target.value)
        if (target.className.replace('input', '') != 'hour') {
            if (v * 10 > max || (target.value.length >= 2 && target.className.replace('input', '') != 'year')) {
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
        }
        if (e.target.className.replace('input', '') == 'hour') {
            if (target.value.length >= 2 || target.value > 1) {
                target.blur()
                this.DatetimeInputRef.current.getElementsbyClassName('mininput')[0].focus()
            }
        }
        if (e.target.className.replace('input', '') == 'ampm') {
            target.blur()
            this.DatetimeInputRef.current.getElementsByClassName('hourinput')[0].focus()
        }
    }

    check = (e) => {    //blur存入select或調整input變成合法值
        const { select, input, min, max } = this.state
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
                nextdate.setHours(select.ampm * 12 + (value == 12 ? 0 : value))
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
                    hour: this.format(nextdate.getHours()%12, 10, '0'),
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
                    hour: this.format(max.hour, 10, '0'),
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
                    hour: this.format(min.hour, 10, '0'),
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
        if (e.keyCode === 38 || e.keyCode === 40) {
            this.setState({
                keyin: false
            })
        }
        if (e.keyCode === 13) {
            e.preventDefault()
            e.target.blur()
            var next = e.target.nextElementSibling
            while (!!next) {
                if (next.nodeName == "INPUT" || next.nodeName == "SELECT") {
                    next.focus()
                    break
                }
                next = next.nextElementSibling
            }
        }
        e.persist()
    }

    detectHeight = () => {
        var input = this.DatetimeInputRef.current,
            ele = input.closest('.datetimeinputposition').getBoundingClientRect()
        if(window.innerHeight - ele.top > 310) return {top: ele.bottom}
        else return {top: ele.top - 310}
    }

    render() {
        const { openCalendar, openYearMonth, select, max, min, input } = this.state
        const { nodate, notime, autofocus, value, id, name, disabled, inputRef, classname, onChange } = this.props
        const exception = ['autofocus', 'nodate', 'notime', 'value', 'min', 'max', 'disabled', 'inputRef', 'classname', 'onChange']
        var props = {}
        Object.keys(this.props).filter(key => exception.indexOf(key)==-1).map(k => props[k] = this.props[k])
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
                            !nodate &&
                            <Dateinput
                                DatetimeInputRef={this.DatetimeInputRef}
                                select={select}
                                input={input}
                                max={max}
                                min={min}
                                format={(n, m, c) => this.format(n, m, c)}
                                setinput={(e) => this.input(e)}
                                selectall={(e) => this.selectall(e)}
                                check={(e) => this.check(e)}
                                enter={(e) => this.enter(e)}
                                autofocus={autofocus}
                                disabled={disabled}
                            ></Dateinput>
                        }

                        {
                            !!this.DatetimeInputRef.current &&
                            !notime &&
                            <Timeinput
                                DatetimeInputRef={this.DatetimeInputRef}
                                select={select}
                                input={input}
                                max={max}
                                min={min}
                                format={(n, m, c) => this.format(n, m, c)}
                                setinput={(e) => this.input(e)}
                                selectall={(e) => this.selectall(e)}
                                check={(e) => this.check(e)}
                                enter={(e) => this.enter(e)}
                                autofocus={nodate && autofocus}
                                disabled={disabled}
                            ></Timeinput>
                        }
                    </div>
                    <div className="calendar onclick" onClick={() => this.toggle("openCalendar")}>
                        <Icon icon={["far", "calendar"]} />
                    </div>
                </div>
                {
                    openCalendar && !(typeof disabled == 'boolean' && disabled) &&
                    ReactDOM.createPortal(
                    <div className="datetime" style={this.detectHeight()} ref={this.datetimepicker}>
                        <div className="bk" onClick={() => this.toggle("openCalendar", false)} />
                        {
                            !nodate &&
                            <div className="datebox">
                                <div className="box-title">
                                    {
                                        (typeof disabled == 'object' && (disabled.indexOf('year') == -1 || disabled.indexOf('month') == -1)) ?
                                            <div className="year-month onclick hover" onClick={() => this.toggle("openYearMonth")}>
                                                <FormattedDate
                                                    value={new Date(select.year, select.month - 1)}
                                                    year="numeric"
                                                    month="short"
                                                />
                                            </div>
                                            : <div className="year-month">
                                                <FormattedDate
                                                    value={new Date(select.year, select.month - 1)}
                                                    year="numeric"
                                                    month="short"
                                                />
                                            </div>
                                    }
                                    {
                                        !openYearMonth &&
                                        <div className="month-btns">
                                            {
                                                new Date(select.year, select.month - 2) - new Date(min.year, min.month - 1) >= 0 && disabled.indexOf('month') == -1 ?
                                                    <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month - 2).getFullYear(), new Date(select.year, select.month - 2).getMonth() + 1)}>
                                                        <Icon icon="arrow-up" />
                                                    </div>
                                                    : <div className="previousmonth disabled-arrow">
                                                        <Icon icon="arrow-up" />
                                                    </div>
                                            }
                                            {
                                                new Date(max.year, max.month - 1) - new Date(select.year, select.month) >= 0 && disabled.indexOf('month') == -1 ?
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
                                            selectDay={(year, month, date, hour, min, ampm) => this.selectDay(year, month, date, hour, min, ampm)}
                                            disabled={disabled}
                                        ></YearSelect>

                                        : <Days
                                            select={select}
                                            selectDay={(year, month, date, hour, min, ampm) => this.selectDay(year, month, date, hour, min, ampm)}
                                            max={max}
                                            min={min}
                                            disabled={disabled}
                                        ></Days>
                                }
                            </div>
                        }

                        {
                            !notime &&
                            <Time
                                select={select}
                                selectDay={(year, month, date, hour, min, ampm) => this.selectDay(year, month, date, hour, min, ampm)}
                                max={max}
                                min={min}
                                disabled={disabled}
                                format={(n, m, c) => this.format(n, m, c)}
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
        name: 'datetime'
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
        name: propTypes.string
    }
}
