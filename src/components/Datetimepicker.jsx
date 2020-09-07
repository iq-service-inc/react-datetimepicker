import React, { Component } from 'react'

export default class Datetimepicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            datetitle: ['日','一','二','三','四','五','六'],
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate()
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

    renderDate = (y,month) => {
        var m = month-1
        var days = (new Date(y,m+1,1) - new Date(y,m,1))/(86400*1000)
        var arr = []

        if(new Date(y,m,1).getDay() != 0){
            var lastdays = (new Date(y,m,1) - new Date(y,m-1,1))/(86400*1000)
            for(var i=new Date(y,m,1).getDay()-1; i>=0; i--){
                arr.push(lastdays-i)
            }
        }

        for(var i=1; i<=days;i++){
            arr.push(i)
        }

        if(new Date(y,m,days).getDay() != 6){
            for(var i=1; i<7-new Date(y,m,days).getDay(); i++){
                arr.push(i)
            }
        }
        var week = []
        for(var i=0; i<arr.length; i+=7){
            week.push(arr.slice(i, i+7))
        }
        return week
    }


    render() {
        const { datetitle, openYearMonth, openMonth, month, select } = this.state
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
                                        <div className="datetitle" key={index}><span>{w}</span></div> 
                                        // (new Date(2020,10,1) - new Date(2020,9,1))/(86400*1000)-1
                                        )
                                    }
                                </div>
                                
                                {
                                    this.renderDate(select.year, select.month).map((week, index) => 
                                        <div className="date" key={index}>
                                            {
                                                week.map((date,index) => 
                                                    <div key={index} className={select.date==date?"date onclick select":"date onclick"} onClick={() => this.selectDay(null,null,date,null,null)}>
                                                        <span>{date}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>

            </div>
        )
    }
}
