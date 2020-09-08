import React, { Component } from 'react'
import propTypes from 'prop-types'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'

export default class Datetimepicker extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            months: this.createarr(1, 12),
            years: this.createarr(2000, 2020),
            hours: this.createarr(1, 12),
            minutes: this.createarr(0, 59),
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
        }
    }

    openMonth(y) {
        this.setState({
            openMonth: y
        })
    }

    selectDay = (year,month,date,hour,min,ampm) => {
        this.setState({
            select:{
                year: !!year? year: this.state.select.year,
                month: !!month? month: this.state.select.month,
                date: !!date? date: this.state.select.date,
                hour: !!hour? hour: this.state.select.hour,
                min: !!min? min: this.state.select.min,
                ampm: !!ampm? ampm: this.state.select.ampm,
            },
            input:{
                year: !!year? year: this.state.select.year,
                month: !!month? month: this.state.select.month,
                date: !!date? date: this.state.select.date,
                hour: !!hour? hour: this.state.select.hour,
                min: !!min? min: this.state.select.min,
                ampm: !!ampm? ampm: this.state.select.ampm,
            }
        })
    }

    input = (e) => {
        switch (e.target.id) {
            case 'year':
                this.setState({
                    input:{
                        ...this.state.input,
                        year: e.target.value
                    },
                })
                break;
            case 'month':
                this.setState({
                    input:{
                        ...this.state.input,
                        month: e.target.value
                    },
                })
                break;
            case 'date':
                this.setState({
                    input:{
                        ...this.state.input,
                        date: e.target.value
                    },
                })
                break;
            case 'ampm':
                this.setState({
                    input:{
                        ...this.state.input,
                        ampm: e.target.value
                    },
                    select:{
                        ...this.state.input,
                        ampm: e.target.value
                    }
                })
                break;
            case 'hour':
                this.setState({
                    input:{
                        ...this.state.input,
                        hour: e.target.value
                    },
                })
                break;
            case 'min':
                this.setState({
                    input:{
                        ...this.state.input,
                        min: e.target.value
                    },
                })
                break;
            default:
                break;
        }
    }

    check = (e) => {
        const value = Number(e.target.value)
        const valid = value>e.target.min && value<e.target.max
        switch (e.target.id) {
            case 'year':
                this.setState({
                    select: {
                        ...this.state.select,
                        year: valid? value : this.state.select.year
                    },
                    input: {
                        ...this.state.input,
                        year: valid? value : this.state.select.year
                    }
                })
                break;
            case 'month':
                this.setState({
                    select: {
                        ...this.state.select,
                        month: valid? value : this.state.select.month
                    },
                    input: {
                        ...this.state.input,
                        month: valid? this.format(value, 10, '0') : this.format(this.state.select.month, 10, '0')
                    }
                })
                break;
            case 'date':
                this.setState({
                    select: {
                        ...this.state.select,
                        date: valid? value : this.state.select.date
                    },
                    input: {
                        ...this.state.input,
                        date: valid? this.format(value, 10, '0') : this.format(this.state.select.date, 10, '0')
                    }
                })
                break;
            case 'hour':
                this.setState({
                    select: {
                        ...this.state.select,
                        hour: valid? value : this.state.select.hour
                    },
                    input: {
                        ...this.state.input,
                        hour: valid? this.format(value, 10, '0') : this.format(this.state.select.hour, 10, '0')
                    }
                })
                break;
            case 'min':
                this.setState({
                    select: {
                        ...this.state.select,
                        min: valid? value : this.state.select.min
                    },
                    input: {
                        ...this.state.input,
                        min: valid? this.format(value, 10, '0') : this.format(this.state.select.min, 10, '0')
                    }
                })
                break;
            default:
                break;
        }
    }

    format = (num, max, char) => {
        return Number(num)<max? char+String(Number(num)): String(num)
    }

    selectall = (e) => {
        e.target.select()
    }

    enter = (e) => {
        console.log(e.target.nextElementSibling)
        if(e.keyCode == 13){
            e.target.blur()
        }
        e.target.nextElementSibling.focus()
        e.persist()
    }

    render() {
        const { openYearMonth, openMonth, select, years, months, hours, minutes, input } = this.state
        const { options } = this.props
        return (
            <div>
                <div className="datetimeinput">
                    <input className="yearinput" id="year" value={input.year}
                        onChange={(e)=>this.input(e)}
                        onFocus={(e)=>this.selectall(e)}
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"></input>/

                    <input id="month" value={input.month} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1" min="1" max="12"></input>/

                    <input id="date" value={input.date} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" min="1" max={(new Date(select.year,select.month,1) - new Date(select.year,select.month-1,1))/(86400*1000)}></input> 

                    <select id="ampm" onChange={(e)=>this.input(e)} value={input.ampm}>
                        <option value="0">am</option>
                        <option value="1">pm</option>
                    </select>

                    <input id="hour" value={input.hour} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1" min="1" max="12"></input>:
                        
                    <input id="min" value={input.min} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1" min="0" max="59"></input>
                </div>
                <div className="datetime">
                    <div className="datebox">
                        <div className="box-title">
                            <div className="year-month onclick hover" onClick={()=>this.toggle("openYearMonth")}>
                                {select.year + "年" + (select.month>=10? select.month: "0"+String(select.month)) +"月"}
                            </div>
                            {
                                !openYearMonth&&
                                <div className="month-btns">
                                    <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month-2).getFullYear(),new Date(select.year, select.month-2).getMonth()+1)}>-</div>
                                    <div className="nextmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month).getFullYear(),new Date(select.year, select.month).getMonth()+1)}>+</div>
                                </div>
                            }
                        </div>
                        {
                            openYearMonth?
                                <YearSelect
                                    select={select}
                                    years={years}
                                    months={months}
                                    open={openMonth}
                                    openMonth={(y)=>this.openMonth(y)}
                                    selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                ></YearSelect>
                        
                                :<Days
                                    select={select}
                                    selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                                ></Days>
                        }
                    </div>

                    <Time
                        hours={hours}
                        minutes={minutes}
                        select={select}
                        selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                    ></Time>
                </div>
            </div>
        )
    }

    static propTypes = {
        options: propTypes.object,
    }
}
