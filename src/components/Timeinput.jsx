import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class Timeinput extends Component {
    render() {
        const { input, select, options, setinput, selectall, check, enter, alert } = this.props
        return (
            <>
                <select id="ampm" onChange={(e) => setinput(e)} value={input.ampm}>
                    {
                        select.date == options.min.date && select.month == options.min.month && select.year == options.min.year ?
                            <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0" disabled={options.min.ampm != 0}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0">{t}</option>}</FormattedMessage>
                    }
                    {
                        select.date == options.max.date && select.month == options.max.month && select.year == options.max.year ?
                            <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1" disabled={options.min.ampm != 1}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1">{t}</option>}</FormattedMessage>
                    }
                </select>

                <input className={alert == 'hour' ? "alert" : ""} id="hour" value={input.hour}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.date == options.min.date && select.month == options.min.month && select.year == options.min.year ?
                        (select.ampm - options.min.ampm) * 12 + options.min.hour % 12 : 1}
                    max={select.date == options.max.date && select.month == options.max.month && select.year == options.max.year ?
                        (options.max.ampm - select.ampm) * 12 + options.max.hour % 12 : 12}
                ></input>
                {
                    alert == 'hour' &&
                    <label htmlFor="hour" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + options.min.year + "/" + options.min.month + "/" + options.min.date + " " + (options.min.ampm ? "pm" : "am") + " " + options.min.hour + ":" + options.min.min +
                                " ~ " + options.max.year + "/" + options.max.month + "/" + options.max.date + " " + (options.max.ampm ? "pm" : "am") + " " + options.max.hour + ":" + options.max.min
                            }</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }

                <span className="disable-selection">:</span>

                <input className={alert == 'min' ? "alert" : ""} id="min" value={input.min}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.hour == options.min.hour && select.ampm == options.min.ampm && select.date == options.min.date && select.month == options.min.month && select.year == options.min.year ?
                        options.min.min : 0}
                    max={select.hour == options.max.hour && select.ampm == options.max.ampm && select.date == options.max.date && select.month == options.max.month && select.year == options.max.year ?
                        options.max.min : 59}
                ></input>
                {
                    alert == 'min' &&
                    <label htmlFor="min" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + options.min.year + "/" + options.min.month + "/" + options.min.date + " " + (options.min.ampm ? "pm" : "am") + " " + options.min.hour + ":" + options.min.min +
                                " ~ " + options.max.year + "/" + options.max.month + "/" + options.max.date + " " + (options.max.ampm ? "pm" : "am") + " " + options.max.hour + ":" + options.max.min
                            }</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
            </>
        )
    }
}
