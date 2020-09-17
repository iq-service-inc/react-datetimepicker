import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class Timeinput extends Component {
    componentDidMount() {
        var next = document.getElementById('ampm')
        if(this.props.autofocus){
            if(next.disabled) next = next.nextSibling
            while(next.nodeName != "INPUT" && next.nodeName != "SELECT"){                
                next = next.nextSibling
                if(next.disabled) continue
                if(next == null) break
            }
            next.focus()
        }
    }

    render() {
        const { input, select, max, min, setinput, selectall, check, enter, alert, disabled } = this.props
        return (
            <>
                <select id="ampm" onChange={(e) => setinput(e)} value={input.ampm}
                    disabled={disabled.indexOf('ampm')!=-1}>
                    {
                        select.date == min.date && select.month == min.month && select.year == min.year ?
                            <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0" disabled={min.ampm != 0}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0">{t}</option>}</FormattedMessage>
                    }
                    {
                        select.date == max.date && select.month == max.month && select.year == max.year ?
                            <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1" disabled={min.ampm != 1}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1">{t}</option>}</FormattedMessage>
                    }
                </select>

                <input className={alert == 'hour' ? "alert" : ""} id="hour" value={input.hour}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.date == min.date && select.month == min.month && select.year == min.year ?
                        (select.ampm - min.ampm) * 12 + min.hour % 12 : 1}
                    max={select.date == max.date && select.month == max.month && select.year == max.year ?
                        (max.ampm - select.ampm) * 12 + max.hour % 12 : 12}
                    disabled={disabled.indexOf('hour')!=-1}
                ></input>
                {
                    alert == 'hour' &&
                    <label htmlFor="hour" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + min.year + "/" + min.month + "/" + min.date + " " + (min.ampm ? "pm" : "am") + " " + min.hour + ":" + min.min +
                                " ~ " + max.year + "/" + max.month + "/" + max.date + " " + (max.ampm ? "pm" : "am") + " " + max.hour + ":" + max.min
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
                    min={select.hour == min.hour && select.ampm == min.ampm && select.date == min.date && select.month == min.month && select.year == min.year ?
                        min.min : 0}
                    max={select.hour == max.hour && select.ampm == max.ampm && select.date == max.date && select.month == max.month && select.year == max.year ?
                        max.min : 59}
                    disabled={disabled.indexOf('min')!=-1}
                ></input>
                {
                    alert == 'min' &&
                    <label htmlFor="min" className="displaynone">
                        <div className="border">
                            <div>{"alert: " + min.year + "/" + min.month + "/" + min.date + " " + (min.ampm ? "pm" : "am") + " " + min.hour + ":" + min.min +
                                " ~ " + max.year + "/" + max.month + "/" + max.date + " " + (max.ampm ? "pm" : "am") + " " + max.hour + ":" + max.min
                            }</div>
                            <span className="arrowout"></span>
                        </div>
                    </label>
                }
            </>
        )
    }
}
