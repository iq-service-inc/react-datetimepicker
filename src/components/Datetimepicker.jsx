import React, { Component } from 'react'
import propTypes, { object, objectOf } from 'prop-types'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import { arrayOf } from 'prop-types'

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
            yearmonth: [{year:2019, month:this.createarr(1, 12)}, {year:2020, month:this.createarr(1, 12)}],
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
                month: !!month? this.format(month, 10, '0'): this.format(this.state.select.month, 10, '0'),
                date: !!date? this.format(date, 10, '0'): this.format(this.state.select.date, 10, '0'),
                hour: !!hour? this.format(hour, 10, '0'): this.format(this.state.select.hour, 10, '0'),
                min: !!min? this.format(min, 10, '0'): this.format(this.state.select.min, 10, '0'),
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
        var valid = true
        if(!!e.target.min && !!e.target.max) {valid = value>=Number(e.target.min) && value<=Number(e.target.max)}
        !valid && document.getElementById(e.target.id).classList.add('alert')
        if(valid){
            document.getElementById(e.target.id).classList.remove('alert')
            switch (e.target.id) {
                case 'year':
                    this.setState({
                        select: {
                            ...this.state.select,
                            year: value
                        },
                        input: {
                            ...this.state.input,
                            year: value
                        }
                    })
                    break;
                case 'month':
                    this.setState({
                        select: {
                            ...this.state.select,
                            month: value
                        },
                        input: {
                            ...this.state.input,
                            month: this.format(value, 10, '0')
                        }
                    })
                    break;
                case 'date':
                    this.setState({
                        select: {
                            ...this.state.select,
                            date: value
                        },
                        input: {
                            ...this.state.input,
                            date: this.format(value, 10, '0')
                        }
                    })
                    break;
                case 'hour':
                    this.setState({
                        select: {
                            ...this.state.select,
                            hour: value
                        },
                        input: {
                            ...this.state.input,
                            hour: this.format(value, 10, '0')
                        }
                    })
                    break;
                case 'min':
                    this.setState({
                        select: {
                            ...this.state.select,
                            min: value
                        },
                        input: {
                            ...this.state.input,
                            min: this.format(value, 10, '0')
                        }
                    })
                    break;
                default:
                    break;
            }
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
            e.target.blur()
            var next = e.target.nextElementSibling
            while(next.nodeName != "INPUT"){
                next = next.nextElementSibling
                if(next == null) break
                next.focus()
            }
        }
        e.persist()
    }

    render() {
        const { openYearMonth, openMonth, select, yearmonth, hours, minutes, input } = this.state
        const { options } = this.props
        const max = new Date(options.max.year, options.max.month-1, options.max.date)
        const min = new Date(options.min.year, options.min.month-1, options.min.date)
        return (
            <div>
                <div className="datetimeinput">
                    
                    <input className="yearinput" id="year" value={input.year}
                        onChange={(e)=>this.input(e)}
                        onFocus={(e)=>this.selectall(e)}
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        max={yearmonth[yearmonth.length-1].year}
                        min={yearmonth[0].year}></input>
                    <label htmlFor="year">
                        <div className="border">
                            {"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                            " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                            }
                            <span className="arrowout"></span>
                        </div>
                    </label>
                    <span>/</span>

                    <input id="month" value={input.month} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        max={yearmonth.filter(y=>y.year==select.year)[0].month[yearmonth.filter(y=>y.year==select.year)[0].month.length-1]}
                        min={yearmonth.filter(y=>y.year==select.year)[0].month[0]}
                        ></input>
                    <label htmlFor="month">
                        <div className="border">
                            {"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                            " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                            }
                            <span className="arrowout"></span>
                        </div>
                    </label>
                    <span>/</span>

                    <input id="date" value={input.date} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        min="1" max={(new Date(select.year,select.month,1) - new Date(select.year,select.month-1,1))/(86400*1000)}
                        ></input> 
                    <label htmlFor="date">
                        <div className="border">
                            {"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                            " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                            }
                            <span className="arrowout"></span>
                        </div>
                    </label>

                    <select id="ampm" onChange={(e)=>this.input(e)} value={input.ampm}>
                        <option value="0">am</option>
                        <option value="1">pm</option>
                    </select>

                    <input id="hour" value={input.hour} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1" min="1" max="12"></input>
                    <label htmlFor="hour">
                        <div className="border">
                            {"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                            " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                            }
                            <span className="arrowout"></span>
                        </div>
                    </label>

                    <span>:</span>
                        
                    <input id="min" value={input.min} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1" min="0" max="59"></input>
                    <label htmlFor="min">
                        <div className="border">
                            {"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                            " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                            }
                            <span className="arrowout"></span>
                        </div>
                    </label>
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
        options: propTypes.shape({
            disabled: propTypes.shape({
                day: propTypes.array,
                date: propTypes.array,
                time: propTypes.array,
            }),
            max: propTypes.object,
            min: propTypes.object,
        }),
    }
}
