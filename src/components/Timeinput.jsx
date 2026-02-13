import { element } from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class Timeinput extends Component {

    componentDidMount() {
        var next = this.props.use24hours ?
            this.props.DatetimeInputRef.current.getElementsByClassName('hourinput')[0] :
            this.props.DatetimeInputRef.current.getElementsByClassName('ampm')[0]
        if(this.props.autofocus && next){
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
        const { select, max, min, setinput, selectall, check, enter, disabled, input, use24hours } = this.props
        const minHour = select.date == min.date && select.month == min.month && select.year == min.year ? min.hour + min.ampm * 12 : 0
        const maxHour = select.date == max.date && select.month == max.month && select.year == max.year ? max.hour + max.ampm * 12 : 23
        return (
            <>
                {
                    !use24hours &&
                    <select className="ampm"
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
                }

                <input className="hourinput" value={use24hours ? input.hour : (input.hour==='00'? 12:input.hour)}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={use24hours ? minHour : 0}
                    max={use24hours ? maxHour : 12}
                    disabled={(typeof disabled=='object' && disabled.indexOf('hour')!=-1) || (typeof disabled=='boolean' && disabled)}
                ></input>

                <span className="disable-selection">:</span>

                <input className="mininput" value={input.min}
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
