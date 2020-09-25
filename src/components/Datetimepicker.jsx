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
    constructor(props){
        super(props)
        this.state = {
            openCalendar: false,
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours()%12,
                min: new Date().getMinutes(),
                ampm: new Date().getHours()/12>=1? 1: 0,
            },
            input: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours()%12,
                min: new Date().getMinutes(),
                ampm: new Date().getHours()/12>=1? 1: 0,
            },
            max: {year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59},
            min: {year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0},
            openYearMonth: false,
        }
        this.calender = React.createRef()
    }

    componentDidUpdate(prevProps, prevState) {
        const { select } = this.state
        const { value, onChange, max, min } = this.props
        
        if(prevProps.value!==value || prevProps.min!==min || prevProps.max!==max){
            this.setselectinput()
        }

        if (prevState.select !== select) {
            this.setState({input:select})
            if (typeof onChange !== 'function') return false
            onChange(this.getDateTime())
        }
    }

    componentDidMount() {
        this.setselectinput()
    }

    getDateTime = () => {
        const { select } = this.state
        const year = (select.year>9999&&(select.year>99999?'+':'+0'))+select.year
        const hour = select.hour==12? (select.ampm*12+Number(select.hour))-12:(select.ampm*12+Number(select.hour))
        return `${year}-${this.format(select.month, 10, '0')}-${this.format(select.date, 10, '0')}T${this.format(hour, 10, '0')}:${this.format(select.min, 10, '0')}`
    }

    isValidDate = (v) => {
        return v instanceof Date && !isNaN(v)
    }

    setInitDate = (v, d, state) => {
        var r = {}
        if(this.isValidDate(v)){
            r = {
                year: v.getFullYear(),
                month: v.getMonth()+1,
                date: v.getDate(),
                hour: v.getHours()%12,
                min: v.getMinutes(),
                ampm: v.getHours()/12>=1? 1:0
            }
        }
        else{
            r = d
        }
        this.setState({[state]: r})
        return r
    }

    yearFormat = (v) => {
        var year = ""
        if(v.search('-')!=-1){
            var y = v.split('-')[0]
            if(y.search(/\+/)==-1){
                if(Number(y)>9999) year = "+0"
                if(Number(y)>99999) year = "+"
            }
        }
        return year
    }

    setselectinput = () => {
        const { value,max,min } = this.props

        var MIN = {year: 1970, month: 1, date: 1, ampm: 0, hour: 0, min: 0}
        var MAX = {year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59}
        
        if(typeof min == "string"){
            var v = new Date(this.yearFormat(min)+min)
            MIN = this.setInitDate(v, MIN, "min")
        }

        if(typeof max == "string"){
            var v = new Date(this.yearFormat(max)+max)
            MAX = this.setInitDate(v, MAX, "max")
        }

        if(typeof value == "string"){
            var v = new Date(this.yearFormat(value)+value)
            this.setInitDate(v, MIN, "select")
        }
        else if(!value){
            this.setState({select: MIN})
        }
    }

    createarr = (start, end) => {
        var arr = []
        for(var i=start; i<=end; i++){
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
                    openCalendar: !!on? on: !this.state.openCalendar
                })
        }
    }

    selectDay = (year,month,date,hour,min,ampm) => {
        this.setState({
            select:{
                year: !!year? year: this.state.select.year,
                month: !!month? month: this.state.select.month,
                date: !!date? date: this.state.select.date,
                hour: hour!=undefined? hour: this.state.select.hour,
                min: min!=undefined? min: this.state.select.min,
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
            },
        })
    }

    input = (e) => {
        if(e.target.id=='ampm'){
            this.setState({
                input: {
                    ...this.state.input,
                    [e.target.id]: Number(e.target.value)
                },
                select: {
                    ...this.state.input,
                    [e.target.id]: Number(e.target.value)
                },
            })
        }
        else if(e.target.id=='hour'){
            this.setState({
                input: {
                    ...this.state.input,
                    [e.target.id]: e.target.value==12? 0: Number(e.target.value)
                },
            })
        }
        else{
            this.setState({
                input: {
                    ...this.state.input,
                    [e.target.id]: Number(e.target.value)
                },
            })
        }
    }

    check = (e) => {
        const value = Number(e.target.value)
        var valid = true
        if(!!e.target.min && !!e.target.max) {valid = value>=Number(e.target.min) && value<=Number(e.target.max)}
        if(valid){
            this.setState({
                select: this.state.input,
            })
        }
        else{
            this.setState({
                input: this.state.select,
            })

        }
    }

    format = (num, max, char) => {
        return Number(num)<max? char+String(Number(num)): String(num)
    }

    selectall = (e) => {
        e.target.select()
    }

    enter = (e) => {
        if(e.keyCode === 13){
            e.preventDefault()
            e.target.blur()
            var next = e.target.nextElementSibling
            while(next.nodeName != "INPUT" && next.nodeName != "SELECT"){
                next = next.nextElementSibling
                if(next == null) break
                next.focus()
            }
        }
        e.persist()
    }

    render() {
        const { openCalendar, openYearMonth, select, max, min, input } = this.state
        const { nodate, notime, autofocus, value, id, name, disabled, inputRef, className } = this.props
        return (
            <div>
                <div id="hideinput">
                    <input id={id} name={name} value={this.getDateTime()}
                        ref={inputRef} readOnly></input>
                </div>
                <div className={`${!!className? className:"defaultinput"} datetimeinput`}>
                    {
                        !nodate &&
                        <Dateinput
                            select={select}
                            input={input}
                            max={max}
                            min={min}
                            format={(n,m,c)=>this.format(n,m,c)}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
                            autofocus={autofocus}
                            disabled={disabled}
                        ></Dateinput>
                    }

                    {
                        !notime &&
                        <Timeinput
                            select={select}
                            input={input}
                            max={max}
                            min={min}
                            format={(n,m,c)=>this.format(n,m,c)}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
                            autofocus={nodate&&autoFocus}
                            disabled={disabled}
                        ></Timeinput>
                    }
                    <label className="calendar onclick" onClick={()=>this.toggle("openCalendar")}>
                        <Icon icon={["far", "calendar"]}/>
                    </label>

                </div>
                {
                    openCalendar && !(typeof disabled=='boolean' && disabled) &&
                    <div className="datetime">
                        {ReactDOM.createPortal(<div className="bk" onClick={()=>this.toggle("openCalendar", false)}/>, document.body)}
                        {
                            !nodate &&
                            <div className="datebox">
                                <div className="box-title">
                                    {
                                        (typeof disabled=='object' && (disabled.indexOf('year')==-1 || disabled.indexOf('month')==-1))?
                                        <div className="year-month onclick hover" onClick={()=>this.toggle("openYearMonth")}>
                                            <FormattedDate
                                                value={new Date(select.year, select.month-1)}
                                                year="numeric"
                                                month="short"
                                            />
                                        </div>
                                        :<div className="year-month">
                                            <FormattedDate
                                                value={new Date(select.year, select.month-1)}
                                                year="numeric"
                                                month="short"
                                            />
                                        </div>
                                    }
                                    {
                                        !openYearMonth&&
                                        <div className="month-btns">
                                            {
                                                new Date(select.year,select.month-2)-new Date(min.year, min.month-1)>=0 && disabled.indexOf('month')==-1?
                                                <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month-2).getFullYear(),new Date(select.year, select.month-2).getMonth()+1)}>
                                                    <Icon icon="arrow-up"/>
                                                </div>
                                                :<div className="previousmonth disabled-arrow">
                                                    <Icon icon="arrow-up"/>
                                                </div>
                                            }
                                            {
                                                new Date(max.year, max.month-1)-new Date(select.year,select.month)>=0 && disabled.indexOf('month')==-1?
                                                <div className="nextmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month).getFullYear(),new Date(select.year, select.month).getMonth()+1)}>
                                                    <Icon icon="arrow-down"/>
                                                </div>
                                                :<div className="nextmonth disabled-arrow">
                                                    <Icon icon="arrow-down"/>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                {
                                    openYearMonth?
                                        <YearSelect
                                            select={select}
                                            max={max}
                                            min={min}
                                            selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                            disabled={disabled}
                                        ></YearSelect>
                                
                                        :<Days
                                            select={select}
                                            selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
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
                                    selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                    max={max}
                                    min={min}
                                    disabled={disabled}
                                ></Time>
                        }
                    </div>
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
