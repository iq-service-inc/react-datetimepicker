import React, { Component } from 'react'

export default class Datetimepicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            datetitle: ['日','一','二','三','四','五','六'],
            today: new Date(),
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDay()
            },
            openYearMonth: false,
            openMonth: new Date().getFullYear(),
            month: this.createmonth(),
        }
    }

    createmonth() {
        var arr = []
        for(var i=1; i<13; i++){
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

    selectDay = (year,month,day,hour,min) => {
        this.setState({
            select:{
                year: year==null? this.state.year: year,
                month: month==null? this.state.month: month,
                day: day==null? this.state.day: day,
                hour: hour==null? this.state.hour: hour,
                min: min==null? this.state.min: min,
            }
        })
    }



    render() {
        const { datetitle, today, openYearMonth, openMonth, month, select } = this.state
        const { options } = this.props
        return (
            <div>
                <input className="datetimeinput"></input>
                <div className="datetimebox">
                    <div className="year-month onclick" onClick={()=>this.toggle("openYearMonth")}>
                        {select.year + "/" + (select.month>=10? select.month: "0"+String(select.month))}
                    </div>
                    {
                        openYearMonth?
                            <div className="yearselect">
                                {
                                    options.years.map(y => 
                                        <div className="year onclick" key={y} onClick={()=>this.openMonth(y)}>{y}
                                            <div className="monthselect">
                                                {
                                                    openMonth == y &&
                                                    month.map(m=>
                                                        <div className={select.month==m && select.year==y? "month onclick select" : "month onclick"} key={m} onClick={() => this.selectDay(y,m,null,null,null)}>
                                                            <span>{m}月</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                    
                            :<div className="days">
                                <div className="date">
                                    {
                                        datetitle.map((w, index) => 
                                        <div className="datetitle" key={index}>{w}</div> 
                                        // (new Date(2020,10,1) - new Date(2020,9,1))/(86400*1000)-1
                                        )
                                    }
                                </div>
                            </div>
                    }
                </div>

            </div>
        )
    }
}
