import React, { Component } from 'react'
import propTypes, { object, objectOf } from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import Dateinput from './Dateinput'
import { FormattedDate } from 'react-intl'
import Timeinput from './Timeinput'
import '../styl/lib/datetimepicker.styl'

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
            openYearMonth: false,
            input: {
                year: new Date().getFullYear(),
                month: this.format(new Date().getMonth()+1,10,"0"),
                date: this.format(new Date().getDate(),10,"0"),
                hour: this.format(new Date().getHours()%12,10,"0"),
                min: this.format(new Date().getMinutes(),10,"0"),
                ampm: new Date().getHours()/12>=1? 1: 0,
            },
        }
    }

    componentDidUpdate() {
        const { value, max, min } = this.props
        if(value!==this.state.value || max!==this.state.max || min!==this.state.min){
            this.setselectinput()
            this.setState({
                value,
                max,
                min
            })
        }
    }

    componentDidMount() {
        this.setselectinput()
        const { value, max, min } = this.props
        this.setState({
            value,
            max,
            min
        })
    }

    setselectinput() {
        const { value } = this.props
        const { max={year: 275759, month: 12, date: 31, ampm: 1, hour: 12, min: 59} } = this.props
        const { min={year: 1970, month: 1, date: 1, ampm: 0, hour: 1, min: 0} } = this.props
        new Date(max.year,max.month-1,max.date,max.ampm*12+max.hour,max.min)-new Date(min.year,min.month-1,min.date,min.ampm*12+min.hour,min.min) < 0 && console.error('min 必須小於 max')
        if(typeof value == "string"){
            var datetime = value.split('T')
            var date = datetime[0].split('-')
            var time = datetime[1].split(':')
            this.setState({
                select: {
                    year: date[0],
                    month: date[1],
                    date: date[2],
                    hour: time[0]%12,
                    min: time[1],
                    ampm: time[0]/12>=1? 1: 0,
                },
                input: {
                    year: date[0],
                    month: this.format(date[1],10,"0"),
                    date: this.format(date[2],10,"0"),
                    hour: this.format(time[0]%12,10,"0"),
                    min: this.format(time[1],10,"0"),
                    ampm: time[0]/12>=1? 1: 0,
                }
            })
        }
        if(typeof value == "object"){
            this.setState({
                select: value,
                input: {
                    year: value.year,
                    month: this.format(value.month,10,"0"),
                    date: this.format(value.date,10,"0"),
                    hour: this.format(value.hour,10,"0"),
                    min: this.format(value.min,10,"0"),
                    ampm: value.ampm,
                }
            })
        }
        if(value == undefined){
            this.setState({
                select: min,
                input: {
                    year: min.year,
                    month: this.format(min.month,10,"0"),
                    date: this.format(min.date,10,"0"),
                    hour: this.format(min.hour,10,"0"),
                    min: this.format(min.min,10,"0"),
                    ampm: min.ampm,
                }
            })
        }
    }

    createarr(start, end) {
        var arr = []
        for(var i=start; i<=end; i++){
            arr.push(i)
        }
        return arr
    }

    toggle = (state) => {
        switch (state) {
            case "openYearMonth":
                this.setState({
                    openYearMonth: !this.state.openYearMonth
                })
                break;
            case "openCalendar":
                this.setState({
                    openCalendar: !this.state.openCalendar
                })
        }
    }

    selectDay = (year,month,date,hour,min,ampm) => {
        this.setState({
            alert: undefined,
            select:{
                year: !!year? year: this.state.select.year,
                month: !!month? month: this.state.select.month,
                date: !!date? date: this.state.select.date,
                hour: !!hour? hour: this.state.select.hour,
                min: min!=undefined? min: this.state.select.min,
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
            },
            input:{
                year: !!year? year: this.state.select.year,
                month: !!month? this.format(month, 10, '0'): this.format(this.state.select.month, 10, '0'),
                date: !!date? this.format(date, 10, '0'): this.format(this.state.select.date, 10, '0'),
                hour: !!hour? this.format(hour, 10, '0'): this.format(this.state.select.hour, 10, '0'),
                min: min!=undefined? this.format(min, 10, '0'): this.format(this.state.select.min, 10, '0'),
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
            }
        })
    }

    input = (e) => {
        this.setState({
            select: {
                ...this.state.select,
                [e.target.id]: e.target.value
            },
            input: {
                ...this.state.input,
                [e.target.id]: e.target.value
            }
        })
    }

    check = (e) => {
        const value = Number(e.target.value)
        var valid = true
        if(!!e.target.min && !!e.target.max) {valid = value>=Number(e.target.min) && value<=Number(e.target.max)}
        if(!valid) {
            // this.setState({
            //     alert: e.target.id
            // })
        }
        else {
            this.setState({
                alert: undefined
            })
            this.setState({
                select: {
                    ...this.state.select,
                    [e.target.id]: value
                },
                input: {
                    ...this.state.input,
                    [e.target.id]: this.format(value, 10, '0')
                }
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
        const { openCalendar, openYearMonth, select, input, alert } = this.state
        const { nodate, notime, autofocus, value, disabled } = this.props
        const { max={year: 275759, month: 12, date: 31, ampm: 1, hour: 12, min: 59} } = this.props
        const { min={year: 1970, month: 1, date: 1, ampm: 0, hour: 1, min: 0} } = this.props
        return (
            <div>
                <div className="datetimeinput">
                    {
                        !nodate &&
                        <Dateinput
                            input={input}
                            select={select}
                            max={max}
                            min={min}
                            alert={alert}
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
                            input={input}
                            select={select}
                            max={max}
                            min={min}
                            alert={alert}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
                            autofocus={nodate&&autofocus}
                            disabled={disabled}
                        ></Timeinput>
                    }
                    <label className="calendar onclick" onClick={()=>this.toggle("openCalendar")}>
                        <Icon icon={["far", "calendar"]}/>
                    </label>

                </div>
                {
                    openCalendar &&
                    <div className="datetime">
                        {
                            !nodate &&
                            <div className="datebox">
                                <div className="box-title">
                                    {
                                        disabled.indexOf('year')==-1?
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

    static propTypes = {
        max: propTypes.object,
        min: propTypes.object,
        value: propTypes.oneOfType([propTypes.object, propTypes.string]),
        nodate: propTypes.bool,
        notime: propTypes.bool,
        disabled: propTypes.arrayOf(propTypes.string)
    }
}
