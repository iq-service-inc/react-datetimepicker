import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class Days extends Component {
    constructor(props){
        super(props)
        this.state = {
            daytitle : ['日','一','二','三','四','五','六'],
        }
    }

    renderDate = (y, month, max, min) => {
        var m = month-1
        var days = (new Date(y,m+1,1) - new Date(y,m,1))/(86400*1000)
        var arr = []
        const maxdate = new Date(max.year, max.month, max.date)
        const mindate = new Date(min.year, min.month, min.date)

        if(new Date(y,m,1).getDay() != 0){
            var lastdays = (new Date(y,m,1) - new Date(y,m-1,1))/(86400*1000)
            for(var i=new Date(y,m,1).getDay()-1; i>=0; i--){
                var t = new Date(new Date(y,m-1,1).getFullYear(),new Date(y,m-1,1).getMonth(),lastdays-i)
                arr.push({date: lastdays-i, month: new Date(y,m-1,1).getMonth()+1, year: new Date(y,m-1,1).getFullYear(), enable: (t-mindate)>0 && (maxdate-t)>0})
            }
        }

        for(var i=1; i<=days;i++){
            var t = new Date(y,m,i)
            arr.push({date: i, month, year: y, enable: (t-mindate)>0 && (maxdate-t)>0})
        }

        var i =1
        if(new Date(y,m,days).getDay() != 6){
            for(i; i<7-new Date(y,m,days).getDay(); i++){
                var t = new Date(new Date(y,m+1,1).getFullYear(),new Date(y,m+1,1).getMonth(),i)
                arr.push({date: i, month: new Date(y,m+1,1).getMonth()+1, year: new Date(y,m+1,1).getFullYear(), enable: (t-mindate)>0 && (maxdate-t)>0})
            }
        }

        if(arr.length/7 < 6){
            for(i; i<i+(6-arr.length/7)*7; i++){
                var t = new Date(new Date(y,m+1,1).getFullYear(),new Date(y,m+1,1).getMonth(),i)
                arr.push({date: i, month: new Date(y,m+1,1).getMonth()+1, year: new Date(y,m+1,1).getFullYear(), enable: (t-mindate)>0 && (maxdate-t)>0})
            }
        }

        var week = []
        for(var i=0; i<arr.length; i+=7){
            week.push(arr.slice(i, i+7))
        }
        return week
    }

    render() {
        const { select, selectDay, max, min } = this.props
        return (
            <div className="days">
                <div className="week">
                    {
                        this.state.daytitle.map((w, index) =>
                            <div className="daytitle" key={index}><span>{w}</span></div>
                        )
                    }
                </div>

                {
                    this.renderDate(select.year, select.month, max, min).map((week, index) =>
                        <div className="week" key={index}>
                            {
                                week.map((d, index) =>
                                    d.enable?
                                    <div key={index} className={(select.date == d.date && select.month == d.month ? "select " : "") + "date onclick hover" + (d.month == select.month ? "" : " greydate")} onClick={() => selectDay(d.year, d.month, d.date)}>
                                        <span>{d.date}</span>
                                    </div>
                                    :<div key={index} className="date greydate">
                                        <span>{d.date}</span>
                                    </div>
                                    
                                )
                            }
                        </div>
                    )
                }
                <div className="today onclick" onClick={() => selectDay(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}>今天</div>
            </div>
        )
    }

    static propTypes = {
        select: propTypes.object.isRequired,
        selectDay: propTypes.func.isRequired,
    }
}
