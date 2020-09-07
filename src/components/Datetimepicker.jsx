import React, { Component } from 'react'

export default class Datetimepicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            datetitle: ['日','一','二','三','四','五','六'],
            select: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours(),
                min: new Date().getMinutes(),
            },
            openYearMonth: false,
            openMonth: new Date().getFullYear(),
            month: this.createarr(1, 12),
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

    renderDate = (y,month) => {
        var m = month-1
        var days = (new Date(y,m+1,1) - new Date(y,m,1))/(86400*1000)
        var arr = []

        if(new Date(y,m,1).getDay() != 0){
            var lastdays = (new Date(y,m,1) - new Date(y,m-1,1))/(86400*1000)
            for(var i=new Date(y,m,1).getDay()-1; i>=0; i--){
                arr.push({date: lastdays-i, month: new Date(y,m-1,1).getMonth()+1, year: new Date(y,m-1,1).getFullYear()})
            }
        }

        for(var i=1; i<=days;i++){
            arr.push({date: i, month, year: new Date(y,m-1,1).getFullYear()})
        }

        if(new Date(y,m,days).getDay() != 6){
            var i =1
            for(i; i<7-new Date(y,m,days).getDay(); i++){
                arr.push({date: i, month: new Date(y,m+1,1).getMonth()+1, year: new Date(y,m-1,1).getFullYear()})
            }
        }

        if(arr.length/7 < 6){
            for(i; i<i+(6-arr.length/7)*7; i++){
                arr.push({date: i, month: new Date(y,m+1,1).getMonth()+1, year: new Date(y,m-1,1).getFullYear()})
            }
        }

        var week = []
        for(var i=0; i<arr.length; i+=7){
            week.push(arr.slice(i, i+7))
        }
        return week
    }


    render() {
        const { datetitle, openYearMonth, openMonth, years, month, select } = this.state
        const { options } = this.props
        return (
            <div>
                <input className="datetimeinput"></input>
                <div className="datetimebox">
                    <div className="box-title">
                        <div className="year-month onclick" onClick={()=>this.toggle("openYearMonth")}>
                            {select.year + "年" + (select.month>=10? select.month: "0"+String(select.month)) +"月"}
                        </div>
                        <div className="month-btns">
                            <div className="previousmonth onclick" onClick={() => this.selectDay(new Date(select.year, select.month-2).getFullYear(),new Date(select.year, select.month-2).getMonth()+1,null,null,null)}>-</div>
                            <div className="nextmonth onclick" onClick={() => this.selectDay(new Date(select.year, select.month).getFullYear(),new Date(select.year, select.month).getMonth()+1,null,null,null)}>+</div>
                        </div>
                    </div>
                    {
                        openYearMonth?
                            <div className="yearselect">
                                {
                                    years.map(y => 
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
                                <div className="week">
                                    {
                                        datetitle.map((w, index) => 
                                        <div className="datetitle" key={index}><span>{w}</span></div> 
                                        )
                                    }
                                </div>
                                
                                {
                                    this.renderDate(select.year, select.month).map((week, index) => 
                                        <div className="week" key={index}>
                                            {
                                                week.map((d,index) =>
                                                    <div key={index} className={(select.date==d.date && select.month==d.month?"select ":"")+"date onclick"+(d.month==select.month?"":" greydate")} onClick={() => this.selectDay(d.year,d.month,d.date,null,null)}>
                                                        <span>{d.date}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                <div className="today onclick" onClick={() => this.selectDay(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), new Date().getHours(), new Date().getMinutes())}>今天</div>
                            </div>
                    }
                </div>

            </div>
        )
    }
}
