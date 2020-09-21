import React, { Component } from 'react'
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
            openYearMonth: false,
            value: '',
            max: {},
            min: {},
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { select } = this.state
        const { value, max, min, onChange } = this.props
        
        if(prevProps.value!==value || prevProps.max!==max || prevProps.min!==min){
            this.setselectinput()
        }

        if (prevState.select !== select) {
            if (typeof onChange !== 'function') return false
            onChange(this.getDateTime())
        }
    }

    componentDidMount() {
        this.setselectinput()
    }

    getDateTime = () => {
        const { select } = this.state
        const hour = select.hour==12? (select.ampm*12+Number(select.hour))-12:(select.ampm*12+Number(select.hour))
        return `${select.year}-${this.format(select.month, 10, '0')}-${this.format(select.date, 10, '0')}T${this.format(hour, 10, '0')}:${this.format(select.min, 10, '0')}`
    }

    setselectinput = () => {
        const { value,max,min } = this.props

        new Date(max.year,max.month-1,max.date,max.ampm*12+max.hour,max.min)-new Date(min.year,min.month-1,min.date,min.ampm*12+min.hour,min.min) < 0 && console.error('min必須小於或等於max')

        if(typeof value == "string" && value.length>0){
            var datetime = value.split('T')
            var date = datetime[0].split('-')
            var time = datetime[1].split(':')
            this.setState({
                select: {
                    year: Number(date[0]),
                    month: Number(date[1]),
                    date: Number(date[2]),
                    hour: time[0]%12,
                    min: Number(time[1]),
                    ampm: time[0]/12>=1? 1: 0,
                },
            })
        }
        if(typeof value == "object"){
            this.setState({
                select: value,
            })
        }
        if(value == undefined){
            this.setState({
                select: min,
            })
        }
    }

    createarr = (start, end) => {
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
                hour: hour!=undefined? hour: this.state.select.hour,
                min: min!=undefined? min: this.state.select.min,
                ampm: ampm!=undefined? ampm: this.state.select.ampm,
            },
        })
    }

    input = (e) => {
        if(e.target.id=='hour'){
            this.setState({
                select: {
                    ...this.state.select,
                    [e.target.id]: e.target.value==12? 0: e.target.value
                },
            })
        }
        else{
            this.setState({
                select: {
                    ...this.state.select,
                    [e.target.id]: e.target.value
                },
            })
        }
        
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
            // this.setOutput({
            //     ...this.state.select,
            //     [e.target.id]: value
            // })
            this.setState({
                select: {
                    ...this.state.select,
                    [e.target.id]: value
                },
            })
        }
        // this.props.onBlur()
    }

    format = (num, max, char) => {
        return Number(num)<max? char+String(Number(num)): String(num)
    }

    selectall = (e) => {
        e.target.select()
        // this.props.onFocus()
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
        // this.props.onKeyDown()
    }

    render() {
        const { openCalendar, openYearMonth, select, alert } = this.state
        const { nodate, notime, autoFocus, value, id, name, disabled, max, min, inputRef } = this.props
        return (
            <div>
                <div id="hideinput">
                    <input id={id} name={name} value={this.getDateTime()}
                        ref={inputRef}></input>
                </div>
                <div className="datetimeinput">
                    {
                        !nodate &&
                        <Dateinput
                            select={select}
                            max={max}
                            min={min}
                            alert={alert}
                            setinput={(e)=>this.input(e)}
                            selectall={(e)=>this.selectall(e)}
                            check={(e)=>this.check(e)}
                            enter={(e)=>this.enter(e)}
                            autofocus={autoFocus}
                            disabled={disabled}
                        ></Dateinput>
                    }

                    {
                        !notime &&
                        <Timeinput
                            select={select}
                            max={max}
                            min={min}
                            alert={alert}
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
                        {
                            !nodate &&
                            <div className="datebox">
                                <div className="box-title">
                                    {
                                        (typeof disabled=='object' && disabled.indexOf('year')==-1)?
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
        max: {year: 275759, month: 12, date: 31, ampm: 1, hour: 11, min: 59},
        min: {year: 1970, month: 1, date: 1, ampm: 0, hour: 1, min: 0},
        value: {year: 1970, month: 1, date: 1, ampm: 0, hour: 1, min: 0},
        disabled: []
    }

    static propTypes = {
        max: propTypes.object,
        min: propTypes.object,
        value: propTypes.oneOfType([propTypes.object, propTypes.string]),
        nodate: propTypes.bool,
        notime: propTypes.bool,
        autoFocus: propTypes.bool,
        disabled: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.bool])
    }
}
