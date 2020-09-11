import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class Time extends Component {

    renderHour(select,min,max) {
        const selectDate = new Date(select.year,select.month-1,select.date)
        const minDate = new Date(min.year,min.month-1,min.date)
        const maxDate = new Date(max.year,max.month-1,max.date)
        var hours = []
        for(var hr=1;hr<12;hr++){
            if(selectDate-minDate>0 && maxDate-selectDate>0){
                hours.push({hr, enable:true})
            }
            else{
                if(selectDate-minDate==0){
                    hours.push({hr, enable:((select.ampm-min.ampm)*12+min.hour%12)<=hr})
                }
                else if(maxDate-selectDate==0){
                    hours.push({hr, enable:((max.ampm-select.ampm)*12+max.hour%12)>=hr})
                }
                else{
                    hours.push({hr, enable:false})
                }
            }
        }
        return hours
    }

    render() {
        const { minutes, select, selectDay, max, min } = this.props
        return (
            <div className="timebox">
                <div className="hour scroll">
                    {
                        this.renderHour(select,min,max).map(i => 
                            i.enable?
                            <div className={(select.hour == i.hr ? "select " : "") + "timeitem onclick hover"} key={i.hr} onClick={() => selectDay(null, null, null, i.hr)}>{i.hr}</div>
                            :<div className="timeitem disabled-timeitem" key={i.hr}>{i.hr}</div>
                        )
                    }
                </div>
                
                <div className="minute scroll">
                    {minutes.map(min =>
                        <div className={(select.min == min ? "select " : "") + "timeitem onclick hover"} key={min} onClick={() => selectDay(null, null, null, null, min)}>{min}</div>
                    )}
                </div>

                <div className="ampm scroll">
                    {
                        select.date==min.date && select.month==min.month && select.year==min.year && min.ampm!=0?
                            <div className="timeitem disabled-timeitem">am</div>
                            :<div className={(select.ampm == 0 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 0)}>am</div>
                    }
                    {
                        select.date==max.date && select.month==max.month && select.year==max.year && max.ampm!=1?
                            <div className="timeitem disabled-timeitem">pm</div>
                            :<div className={(select.ampm == 1 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 1)}>pm</div>
                    }
                    
                </div>
            </div>
        )
    }
    static propTypes = {
        select: propTypes.object.isRequired,
        selectDay: propTypes.func.isRequired,
        hours: propTypes.array.isRequired,
        minutes: propTypes.array.isRequired,
    }
}
