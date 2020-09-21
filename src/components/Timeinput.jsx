import { element } from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedTimeParts } from 'react-intl'

export default class Timeinput extends Component {
    constructor(props){
        super(props)
        this.state = {
            maxHour: 12,
            minHour: 1,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { max, min, select } = this.props
        if(prevProps.select!==select || prevProps.max!==max || prevProps.min!==min){
            this.checkValidity()
        }
    }

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
        this.checkValidity()
    }


    checkValidity = () => {
        const { max, min, select } = this.props
        var mindate = select.date == min.date && select.month == min.month && select.year == min.year
        var maxdate = select.date == max.date && select.month == max.month && select.year == max.year
        var minhour = ((select.ampm - min.ampm) * 12 + min.hour) % 12
        var maxhour = ((max.ampm - select.ampm) * 12 + max.hour) % 12
        this.setState({maxHour: maxdate? maxhour:12, minHour: mindate? minhour:1})

        if(select.hour==0 && (mindate || maxdate)){
            var s = new Date(min.year,min.month-1,min.date,min.hour+(min.ampm)*12)
            var e = new Date(max.year,max.month-1,max.date,max.hour+(max.ampm)*12)
            var t = new Date(select.year,select.month-1,select.date,select.hour+(select.ampm)*12)
            if(t-s>=0 && e-t>=0){
                this.setState({maxHour:12,minHour:12})
            }
        }
    }

    render() {
        const { select, max, min, setinput, selectall, check, enter, disabled } = this.props
        const { minHour, maxHour } = this.state
        return (
            <>
                <select id="ampm" onChange={(e) => setinput(e)} value={select.ampm}
                    disabled={(typeof disabled=='object' && disabled.indexOf('ampm')!=-1) || (typeof disabled=='boolean' && disabled)}
                    >
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
                <FormattedTimeParts value={new Date(0,0,0,select.hour,select.min)} hour="2-digit">
                    {t=>
                        <input id="hour" value={t[1].value}
                            onChange={(e) => setinput(e)}
                            onFocus={(e) => selectall(e)}
                            onBlur={(e) => check(e)}
                            onKeyDown={(e) => enter(e)}
                            type="number" step="1"
                            min={minHour}
                            max={maxHour}
                            disabled={(typeof disabled=='object' && disabled.indexOf('hour')!=-1) || (typeof disabled=='boolean' && disabled)}
                        ></input>
                    }
                </FormattedTimeParts>

                <span className="disable-selection">:</span>

                <FormattedTimeParts value={new Date(0,0,0,select.hour,select.min)} min="2-digit">
                    {t=>
                        <input id="min" value={t[3].value}
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
                    }
                </FormattedTimeParts>
            </>
        )
    }
}
