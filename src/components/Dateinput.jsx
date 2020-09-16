import React, { Component } from 'react'

export default class Dateinput extends Component {
    render() {
        const { input, select, options, yearmonth, setinput, selectall, check, enter, alert } = this.props
        return (
            <>
                <input className={(alert == 'year' ? "alert" : "") + " yearinput"} id="year" value={input.year}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={yearmonth[yearmonth.length - 1].year}
                    min={yearmonth[0].year}></input>
                {
                    alert == 'year' &&
                    <label htmlFor="year" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + options.min.year + " ~ " + options.max.year}</div>
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
                    max={yearmonth.filter(y => y.year == select.year).length ? yearmonth.filter(y => y.year == select.year)[0].month[yearmonth.filter(y => y.year == select.year)[0].month.length - 1] : 12}
                    min={yearmonth.filter(y => y.year == select.year).length ? yearmonth.filter(y => y.year == select.year)[0].month[0] : 1}
                ></input>
                {
                    alert == 'month' &&
                    <label htmlFor="month" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + options.min.year + "/" + options.min.month + " ~ " + options.max.year + "/" + options.max.month}</div>
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
                    min={new Date(select.year, select.month) - new Date(options.year, options.month) > 0 ? options.min.date : 1}
                    max={select.month == options.max.month && select.year == options.max.year ? options.max.date : (new Date(select.year, select.month, 1) - new Date(select.year, select.month - 1, 1)) / (86400 * 1000)}
                ></input>
                {
                    alert == 'date' &&
                    <label htmlFor="date" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + options.min.year + "/" + options.min.month + "/" + options.min.date + " ~ " + options.max.year + "/" + options.max.month + "/" + options.max.date}</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
            </>
        )
    }
}