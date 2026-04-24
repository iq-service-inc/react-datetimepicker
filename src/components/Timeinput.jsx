import React, { Component } from 'react'
import { injectIntl } from 'react-intl'

class Timeinput extends Component {

    componentDidMount() {
        if (this.props.autofocus && this.props.DatetimeInputRef.current) {
            const inputs = this.props.DatetimeInputRef.current.querySelectorAll('input:not(:disabled), select:not(:disabled)')
            if (inputs.length > 0) {
                inputs[0].focus()
            }
        }
    }

    renderField = (field, key) => {
        const { select, max, min, setinput, selectall, check, enter, disabled, input, use24hours } = this.props
        const minHour = select.date == min.date && select.month == min.month && select.year == min.year ? min.hour + min.ampm * 12 : 0
        const maxHour = select.date == max.date && select.month == max.month && select.year == max.year ? max.hour + max.ampm * 12 : 23

        switch (field) {
            case 'hour':
                return <input key={key} className="hourinput" value={use24hours ? input.hour : (input.hour==='00'? 12:input.hour)}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={use24hours ? minHour : 0}
                    max={use24hours ? maxHour : 12}
                    disabled={(typeof disabled=='object' && disabled.indexOf('hour')!=-1) || (typeof disabled=='boolean' && disabled)}
                />
            case 'min':
                return <input key={key} className="mininput" value={input.min}
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
                />
            case 'ampm': {
                const dtf = new Intl.DateTimeFormat(this.props.intl.locale, { hour: 'numeric', hour12: true })
                const amText = dtf.formatToParts(new Date(2000,0,1,0,0)).find(p => p.type === 'dayPeriod')?.value || 'AM'
                const pmText = dtf.formatToParts(new Date(2000,0,1,12,0)).find(p => p.type === 'dayPeriod')?.value || 'PM'
                return (
                    <select key={key} className="ampm"
                        onChange={(e) => setinput(e)} value={input.ampm}
                        onBlur={(e) => check(e)}
                        disabled={(typeof disabled=='object' && disabled.indexOf('ampm')!=-1) || (typeof disabled=='boolean' && disabled)}
                    >
                        {
                            select.date == min.date && select.month == min.month && select.year == min.year ?
                                <option value="0" disabled={min.ampm != 0}>{amText}</option>
                                : <option value="0">{amText}</option>
                        }
                        {
                            select.date == max.date && select.month == max.month && select.year == max.year ?
                                <option value="1" disabled={max.ampm != 1}>{pmText}</option>
                                : <option value="1">{pmText}</option>
                        }
                    </select>
                )
            }
            default:
                return null
        }
    }

    render() {
        const { use24hours, patternTokens } = this.props

        if (patternTokens) {
            return (
                <>
                    {patternTokens.map((token, i) => {
                        if (token.type === 'separator') {
                            return <span key={i} className="disable-selection">{token.value}</span>
                        }
                        return this.renderField(token.field, i)
                    })}
                </>
            )
        }

        return (
            <>
                {
                    !use24hours && this.renderField('ampm')
                }
                {this.renderField('hour')}
                <span className="disable-selection">:</span>
                {this.renderField('min')}
            </>
        )
    }
}

export default injectIntl(Timeinput)
