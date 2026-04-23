import React, { Component } from 'react'

export default class Dateinput extends Component {
    componentDidMount() {
        if (this.props.autofocus && this.props.DatetimeInputRef.current) {
            const inputs = this.props.DatetimeInputRef.current.querySelectorAll('input:not(:disabled), select:not(:disabled)')
            if (inputs.length > 0) {
                inputs[0].focus()
            }
        }
    }

    renderField = (field, key) => {
        const { select, max, min, setinput, selectall, check, enter, disabled, input } = this.props
        switch (field) {
            case 'year':
                return <input key={key} className="yearinput" value={input.year}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={max.year}
                    min={min.year}
                    disabled={(typeof disabled=='object' && disabled.indexOf('year')!=-1) || (typeof disabled=='boolean' && disabled)}
                />
            case 'month':
                return <input key={key} className="monthinput" value={input.month}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={select.year<=max.year&&select.year>=min.year? select.year==max.year?max.month:12 : -1}
                    min={select.year<=max.year&&select.year>=min.year? select.year==min.year?min.month:1 : -1}
                    disabled={(typeof disabled=='object' && disabled.indexOf('month')!=-1) || (typeof disabled=='boolean' && disabled)}
                />
            case 'date':
                return <input key={key} className="dateinput" value={input.date}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.month == min.month && select.year == min.year ? min.date : 1}
                    max={select.month == max.month && select.year == max.year ? max.date : (new Date(select.year, select.month, 1) - new Date(select.year, select.month - 1, 1)) / (86400 * 1000)}
                    disabled={(typeof disabled=='object' && disabled.indexOf('date')!=-1) || (typeof disabled=='boolean' && disabled)}
                />
            default:
                return null
        }
    }
    
    render() {
        const { patternTokens } = this.props

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
                {this.renderField('year')}
                <span className="disable-selection">/</span>
                {this.renderField('month')}
                <span className="disable-selection">/</span>
                {this.renderField('date')}
            </>
        )
    }
}
