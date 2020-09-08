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
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours()%12,
                min: new Date().getMinutes(),
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
        console.log(e.target.value)
        switch (e.target.id) {
            case 'year':
                this.setState({
                    input:{
                        ...this.state.input,
                        year: e.target.value
                    },
                    select:{
                        ...this.state.select,
                        year: e.target.value
                    }
                })
                break;
            case 'month':
                this.setState({
                    input:{
                        ...this.state.input,
                        month: e.target.value
                    },
                    select:{
                        ...this.state.select,
                        month: e.target.value
                    }
                })
                break;
            case 'date':
                this.setState({
                    input:{
                        ...this.state.input,
                        date: e.target.value
                    },
                    select:{
                        ...this.state.select,
                        date: e.target.value
                    }
                })
                break;
            case 'ampm':
                this.setState({
                    input:{
                        ...this.state.input,
                        ampm: e.target.value
                    },
                    select:{
                        ...this.state.select,
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
                    select:{
                        ...this.state.select,
                        hour: e.target.value
                    }
                })
                break;
            case 'min':
                this.setState({
                    input:{
                        ...this.state.input,
                        min: e.target.value
                    },
                    select:{
                        ...this.state.select,
                        min: e.target.value
                    }
                })
                break;
            default:
                break;
        }
        console.log(this.state.select)
        console.log(this.state.input)
    }

    format = (num, max, char) => {
        return num<max? char+String(num): String(num)
    }

    selectall = (e) => {
        e.target.select()
    }

    render() {
        const { openYearMonth, openMonth, select, years, months, hours, minutes, input } = this.state
        const { options } = this.props
        return (
            <div>
                <div className="datetimeinput">
                    <input className="yearinput" id="year" value={input.year} onChange={(e)=>this.input(e)} onClick={(e)=>this.selectall(e)} type="number" step="1"></input>/
                    <input id="month" value={this.format(input.month,10,'0')} onChange={(e)=>this.input(e)} onClick={(e)=>this.selectall(e)} type="number" step="1" min="1" max="12"></input>/
                    <input id="date" value={this.format(input.date,10,'0')} onChange={(e)=>this.input(e)} onClick={(e)=>this.selectall(e)} type="number" min="1" max={(new Date(select.year,select.month,1) - new Date(select.year,select.month-1,1))/(86400*1000)}></input> 
                    <select id="ampm" onChange={(e)=>this.input(e)} value={input.ampm}>
                        <option value="0">am</option>
                        <option value="1">pm</option>
                    </select>
                    <input id="hour" value={this.format(input.hour,10,'0')} onChange={(e)=>this.input(e)} onClick={(e)=>this.selectall(e)} type="number" step="1" min="1" max="12"></input>:
                    <input id="min" value={this.format(input.min,10,'0')} onChange={(e)=>this.input(e)} onClick={(e)=>this.selectall(e)} type="number" step="1" min="0" max="59"></input>
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
