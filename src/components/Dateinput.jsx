import React, { Component } from 'react'

export default class Dateinput extends Component {
    componentDidMount() {
        var next = document.getElementById('year')
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
        const { select, max, min, setinput, selectall, check, enter, autofocus, disabled, input, format } = this.props
        return (
            <>
                <input className="yearinput" id="year" value={input.year}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={max.year}
                    min={min.year}
                    disabled={(typeof disabled=='object' && disabled.indexOf('year')!=-1) || (typeof disabled=='boolean' && disabled)}
                    ></input>
                <span className="disable-selection">/</span>

                <input id="month" value={format(input.month,10,'0')}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    max={select.year<=max.year&&select.year>=min.year? select.year==max.year?max.month:12 : -1}
                    min={select.year<=max.year&&select.year>=min.year? select.year==min.year?min.month:1 : -1}
                    disabled={(typeof disabled=='object' && disabled.indexOf('month')!=-1) || (typeof disabled=='boolean' && disabled)}
                ></input>
                <span className="disable-selection">/</span>

                <input id="date" value={format(input.date,10,'0')}
                    onChange={(e) => setinput(e)}
                    onFocus={(e) => selectall(e)}
                    onBlur={(e) => check(e)}
                    onKeyDown={(e) => enter(e)}
                    type="number" step="1"
                    min={select.month == min.month && select.year == min.year ? min.date : 1}
                    max={select.month == max.month && select.year == max.year ? max.date : (new Date(select.year, select.month, 1) - new Date(select.year, select.month - 1, 1)) / (86400 * 1000)}
                    disabled={(typeof disabled=='object' && disabled.indexOf('date')!=-1) || (typeof disabled=='boolean' && disabled)}
                ></input>
            </>
        )
    }
}
