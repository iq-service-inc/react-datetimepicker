import { element } from 'prop-types'
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
        const { select, max, min, setinput, selectall, check, enter, disabled, input } = this.props
        return (
            <>
                <select id="ampm"
                    onChange={(e) => setinput(e)} value={input.ampm}
                    onBlur={(e) => check(e)}
                    disabled={(typeof disabled=='object' && disabled.indexOf('ampm')!=-1) || (typeof disabled=='boolean' && disabled)}
                    >
                    {
                        select.date == min.date && select.month == min.month && select.year == min.year ?
                            <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0" disabled={min.ampm != 0}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.am' defaultMessage='上午'>{t => <option value="0">{t}</option>}</FormattedMessage>
                    }
                    {
                        select.date == max.date && select.month == max.month && select.year == max.year ?
                            <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1" disabled={max.ampm != 1}>{t}</option>}</FormattedMessage>
                            : <FormattedMessage id='datetime.pm' defaultMessage='下午'>{t => <option value="1">{t}</option>}</FormattedMessage>
                    }
                </select>

                <input id="hour" value={input.hour==='00'? 12:input.hour}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={0}
                    max={12}
                    disabled={(typeof disabled=='object' && disabled.indexOf('hour')!=-1) || (typeof disabled=='boolean' && disabled)}
                ></input>

                <span className="disable-selection">:</span>

                <input id="min" value={input.min}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.hour == min.hour && select.ampm == min.ampm && select.date == min.date && select.month == min.month && select.year == min.year ?
                        min.min : 0}
                    max={select.hour == max.hour && select.ampm == max.ampm && select.date == max.date && select.month == max.month && select.year == max.year ?
                        max.min : 59}
                    disabled={(typeof disabled=='object' && disabled.indexOf('min')!=-1) || (typeof disabled=='boolean' && disabled)}
                ></input>
            </>
        )
    }
}
