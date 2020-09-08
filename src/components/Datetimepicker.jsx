import React, { Component } from 'react'
import propTypes from 'prop-types'
import YearSelect from './YearSelect'
import Days from './Days'

export default class Datetimepicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours(),
                min: new Date().getMinutes(),
            },
            openYearMonth: false,
            openMonth: new Date().getFullYear(),
            months: this.createarr(1, 12),
            years: this.createarr(2000, 2020)
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

    selectDay = (year,month,date,hour,min) => {
        this.setState({
            select:{
                year: year==null? this.state.select.year: year,
                month: month==null? this.state.select.month: month,
                date: date==null? this.state.select.date: date,
                hour: hour==null? this.state.select.hour: hour,
                min: min==null? this.state.select.min: min,
            }
        })
    }

    render() {
        const { datetitle, openYearMonth, openMonth, years, months, select } = this.state
        const { options } = this.props
        return (
            <div>
                <input className="datetimeinput"></input>
                <div className="datetime">
                    <div className="datebox">
                        <div className="box-title">
                            <div className="year-month onclick hover" onClick={()=>this.toggle("openYearMonth")}>
                                {select.year + "年" + (select.month>=10? select.month: "0"+String(select.month)) +"月"}
                            </div>
                            {
                                !openYearMonth&&
                                <div className="month-btns">
                                    <div className="previousmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month-2).getFullYear(),new Date(select.year, select.month-2).getMonth()+1,null,null,null)}>-</div>
                                    <div className="nextmonth onclick hover" onClick={() => this.selectDay(new Date(select.year, select.month).getFullYear(),new Date(select.year, select.month).getMonth()+1,null,null,null)}>+</div>
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
                                    selectDay={(year,month,date,hour,min)=>this.selectDay(year,month,date,hour,min)}
                                ></YearSelect>
                        
                                :<Days
                                    select={select}
                                    selectDay={(year,month,date,hour,min)=>this.selectDay(year,month,date,hour,min)}
                                ></Days>
                        }
                    </div>

                    <div className="timebox">
                        <div className="hour scroll">
                            {this.createarr(1,12).map(hr => 
                                <div className="timeitem onclick hover" key={hr}>{hr}</div>
                            )}
                        </div>
                        <div className="minute scroll">
                            {this.createarr(0,59).map(min => 
                                <div className="timeitem onclick hover" key={min}>{min}</div>
                            )}
                        </div>
                        <div className="ampm scroll">
                            <div className="timeitem onclick hover" key="am">am</div>
                            <div className="timeitem onclick hover" key="pm">pm</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    static propTypes = {
        options: propTypes.object,
    }
}
