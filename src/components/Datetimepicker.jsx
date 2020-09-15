import React, { Component } from 'react'
import propTypes, { object, objectOf } from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import Dateinput from './Dateinput'
import { FormattedDate } from 'react-intl'
import Timeinput from './Timeinput'

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
            openMonth: new Date().getFullYear(),
            yearmonth: [{year:2019, month:this.createarr(1, 12)}, {year:2020, month:this.createarr(1, 12)}],
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

    componentDidMount() {
        const { options } = this.props
        const { disabled, max, min } = options
        if(!!max && !!min){
            var ym = []
            for(var y=min.year; y<=max.year; y++){
                if(y==min.year) var m = min.month
                else var m = 1
                if(y==max.year) var limit = max.month
                else var limit = 12
                
                var month = []
                for(m; m<=limit; m++){
                    month.push(m)
                }
                ym.push({year:y, month:month})
            }
            this.setState({
                yearmonth: ym,
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

    openMonth(y) {
        this.setState({
            openMonth: y
        })
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
            this.setState({
                alert: e.target.id
            })
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
        const { openCalendar, openYearMonth, openMonth, select, yearmonth, input, alert } = this.state
        const { options, date, time } = this.props
        return (
            <div>
                <div className="datetimeinput">
                    {
                        date!=false &&
                        <Dateinput
                            input={input}
                            select={select}
                            options={options}
                            alert={alert}
                            yearmonth={yearmonth}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
                        ></Dateinput>
                    }

                    {
                        time!=false &&
                        <Timeinput
                            input={input}
                            select={select}
                            options={options}
                            alert={alert}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
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
                            date!=false &&
                            <div className="datebox">
                                <div className="box-title">
                                    <div className="year-month onclick hover" onClick={()=>this.toggle("openYearMonth")}>
                                        <FormattedDate
                                            value={new Date(select.year, select.month-1)}
                                            year="numeric"
                                            month="short"
                                        />
                                    </div>
                                    {
                                        !openYearMonth&&
                                        <div className="month-btns">
                                            {
                                                new Date(select.year,select.month-2)-new Date(options.min.year, options.min.month-1)>=0?
                                                <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month-2).getFullYear(),new Date(select.year, select.month-2).getMonth()+1)}>
                                                    <Icon icon="arrow-up"/>
                                                </div>
                                                :<div className="previousmonth disabled-arrow">
                                                    <Icon icon="arrow-up"/>
                                                </div>
                                            }
                                            {
                                                new Date(options.max.year, options.max.month-1)-new Date(select.year,select.month)>=0?
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
                                            yearmonth={yearmonth}
                                            open={openMonth}
                                            openMonth={(y)=>this.openMonth(y)}
                                            selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                        ></YearSelect>
                                
                                        :<Days
                                            select={select}
                                            selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                            max={options.max}
                                            min={options.min}
                                        ></Days>
                                }
                            </div>
                        }

                        {
                            time!=false &&
                                <Time
                                select={select}
                                selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                max={options.max}
                                min={options.min}
                                ></Time>
                        }
                    </div>
                }
            </div>
        )
    }

    static propTypes = {
        options: propTypes.shape({
            max: propTypes.object.isRequired,
            min: propTypes.object.isRequired,
        }),
    }
}
