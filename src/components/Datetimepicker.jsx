import React, { Component } from 'react'
import propTypes, { object, objectOf } from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import YearSelect from './YearSelect'
import Days from './Days'
import Time from './Time'
import { arrayOf } from 'prop-types'

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
            select:{
                year: !!year? year: this.state.select.year,
                month: !!month? month: this.state.select.month,
                date: !!date? date: this.state.select.date,
                hour: !!hour? hour: this.state.select.hour,
                min: !!min? min: this.state.select.min,
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
            },
            input:{
                year: !!year? year: this.state.select.year,
                month: !!month? this.format(month, 10, '0'): this.format(this.state.select.month, 10, '0'),
                date: !!date? this.format(date, 10, '0'): this.format(this.state.select.date, 10, '0'),
                hour: !!hour? this.format(hour, 10, '0'): this.format(this.state.select.hour, 10, '0'),
                min: !!min? this.format(min, 10, '0'): this.format(this.state.select.min, 10, '0'),
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
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
        if(!valid) {
            this.setState({
                alert: e.target.id
            })
        }
        else {
            this.setState({
                alert: undefined
            })
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
        const { openCalendar, openYearMonth, openMonth, select, yearmonth, minutes, input, alert } = this.state
        const { options } = this.props
        const max = new Date(options.max.year, options.max.month-1, options.max.date)
        const min = new Date(options.min.year, options.min.month-1, options.min.date)
        return (
            <div>
                <div className="datetimeinput">
                    <input className={(alert=='year'? "alert":"")+" yearinput"} id="year" value={input.year}
                        onChange={(e)=>this.input(e)}
                        onFocus={(e)=>this.selectall(e)}
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        max={yearmonth[yearmonth.length-1].year}
                        min={yearmonth[0].year}></input>
                    {
                        alert=='year' &&
                        <label htmlFor="year" className="displaynone">
                            <div className="border">
                                <div>{"alert: "+options.min.year+" ~ "+options.max.year}</div>
                                <span className="arrowout"></span>
                            </div>
                        </label>
                    }
                    <span className="disable-selection">/</span>

                    <input className={alert=='month'? "alert":""} id="month" value={input.month} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        max={yearmonth.filter(y=>y.year==select.year)[0].month[yearmonth.filter(y=>y.year==select.year)[0].month.length-1]}
                        min={yearmonth.filter(y=>y.year==select.year)[0].month[0]}
                        ></input>
                    {
                        alert=='month' &&
                        <label htmlFor="month" className="displaynone">
                            <div className="border">
                                <div>{"alert: "+options.min.year+"/"+options.min.month+" ~ "+options.max.year+"/"+options.max.month}</div>
                                <span className="arrowout"></span>
                            </div>
                        </label>
                    }
                    <span className="disable-selection">/</span>

                    <input className={alert=='date'? "alert":""} id="date" value={input.date} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        min={select.month==options.min.month && select.year==options.min.year? options.min.date: 1}
                        max={select.month==options.max.month && select.year==options.max.year? options.max.date: (new Date(select.year,select.month,1) - new Date(select.year,select.month-1,1))/(86400*1000)}
                        ></input> 
                    {
                        alert=='date' &&
                        <label htmlFor="date" className="displaynone">
                            <div className="border">
                                <div>{"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date}</div>
                                <span className="arrowout"></span>
                            </div>
                        </label>
                    }

                    <select id="ampm" onChange={(e)=>this.input(e)} value={input.ampm}>
                        {
                            select.date==options.min.date && select.month==options.min.month && select.year==options.min.year?
                                <option value="0" disabled={options.min.ampm!=0}>am</option>
                                : <option value="0">am</option>
                        }
                        {
                            select.date==options.max.date && select.month==options.max.month && select.year==options.max.year?
                                <option value="1" disabled={options.min.ampm!=1}>pm</option>
                                : <option value="1">pm</option>
                        }
                    </select>

                    <input className={alert=='hour'? "alert":""} id="hour" value={input.hour} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        min={ select.date==options.min.date && select.month==options.min.month && select.year==options.min.year?
                                (select.ampm-options.min.ampm)*12+options.min.hour%12 : 1}
                        max={ select.date==options.max.date && select.month==options.max.month && select.year==options.max.year?
                                (options.max.ampm-select.ampm)*12+options.max.hour%12 : 12}
                        ></input>
                    {
                        alert=='hour' &&
                        <label htmlFor="hour" className="displaynone">
                            <div className="border">
                                <div>{"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                                " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                                }</div>
                                <span className="arrowout"></span>
                            </div>
                        </label>
                    }

                    <span className="disable-selection">:</span>
                        
                    <input className={alert=='min'? "alert":""} id="min" value={input.min} 
                        onChange={(e)=>this.input(e)} 
                        onFocus={(e)=>this.selectall(e)} 
                        onBlur={(e)=>this.check(e)} 
                        onKeyDown={(e)=>this.enter(e)}
                        type="number" step="1"
                        min={ select.hour==options.min.hour && select.ampm==options.min.ampm && select.date==options.min.date && select.month==options.min.month && select.year==options.min.year?
                                options.min.min : 0}
                        max={ select.hour==options.max.hour && select.ampm==options.max.ampm && select.date==options.max.date && select.month==options.max.month && select.year==options.max.year?
                                options.max.min : 59}
                        ></input>
                    {
                        alert=='min' &&
                        <label htmlFor="min" className="displaynone">
                            <div className="border">
                                <div>{"alert: "+options.min.year+"/"+options.min.month+"/"+options.min.date+" "+(options.min.ampm?"pm":"am")+" "+options.min.hour+":"+options.min.min+
                                " ~ "+options.max.year+"/"+options.max.month+"/"+options.max.date+" "+(options.max.ampm?"pm":"am")+" "+options.max.hour+":"+options.max.min
                                }</div>
                                <span className="arrowout"></span>
                            </div>
                        </label>
                    }
                    <label className="calendar onclick" onClick={()=>this.toggle("openCalendar")}>
                        <Icon icon={["far", "calendar"]}/>
                    </label>

                </div>
                {
                    openCalendar &&
                    <div className="datetime">
                        <div className="datebox">
                            <div className="box-title">
                                <div className="year-month onclick hover" onClick={()=>this.toggle("openYearMonth")}>
                                    {select.year + "年" + (select.month>=10? select.month: "0"+String(select.month)) +"月"}
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

                        <Time
                            minutes={minutes}
                            select={select}
                            selectDay={(year,month,date,hour,min,ampm)=>this.selectDay(year,month,date,hour,min,ampm)}
                            max={options.max}
                            min={options.min}
                        ></Time>
                    </div>
                }
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
