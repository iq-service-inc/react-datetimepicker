import React, { Component } from 'react'

export default class Dateinput extends Component {
    render() {
        const { input, select, max, min, setinput, selectall, check, enter, alert } = this.props
        return (
            <>
                <input className={(alert == 'year' ? "alert" : "") + " yearinput"} id="year" value={input.year}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={max.year}
                    min={min.year}></input>
                {
                    alert == 'year' &&
                    <label htmlFor="year" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + min.year + " ~ " + max.year}</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
                <span className="disable-selection">/</span>

                <input className={alert == 'month' ? "alert" : ""} id="month" value={input.month}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={select.year<=max.year&&select.year>=min.year? select.year==max.year?max.month:12 : -1}
                    min={select.year<=max.year&&select.year>=min.year? select.year==min.year?min.month:1 : -1}
                ></input>
                {
                    alert == 'month' &&
                    <label htmlFor="month" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + min.year + "/" + min.month + " ~ " + max.year + "/" + max.month}</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
                <span className="disable-selection">/</span>

                <input className={alert == 'date' ? "alert" : ""} id="date" value={input.date}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={new Date(select.year, select.month) - new Date(min.year, min.month) > 0 ? min.date : 1}
                    max={select.month == max.month && select.year == max.year ? max.date : (new Date(select.year, select.month, 1) - new Date(select.year, select.month - 1, 1)) / (86400 * 1000)}
                ></input>
                {
                    alert == 'date' &&
                    <label htmlFor="date" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + min.year + "/" + min.month + "/" + min.date + " ~ " + max.year + "/" + max.month + "/" + max.date}</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
            </>
        )
    }
}
