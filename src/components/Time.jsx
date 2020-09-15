import React, { Component } from 'react'
import propTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

export default class Time extends Component {

    renderHour(select,min,max) {
        const selectDate = new Date(select.year,select.month-1,select.date)
        const minDate = new Date(min.year,min.month-1,min.date)
        const maxDate = new Date(max.year,max.month-1,max.date)
        var hours = []
        for(var hr=1;hr<=12;hr++){
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

    renderMin(select,min,max) {
        const selectHour = new Date(select.year,select.month-1,select.date,select.hour+(select.ampm*12))
        const minHour = new Date(min.year,min.month-1,min.date,min.hour+(min.ampm)*12)
        const maxHour = new Date(max.year,max.month-1,max.date,max.hour+(max.ampm)*12)
        var mins = []
        for(var minute=0;minute<60;minute++){
            if(selectHour-minHour>0 && maxHour-selectHour>0){
                mins.push({minute, enable:true})
            }
            else{
                if(selectHour-minHour==0){
                    mins.push({minute, enable:min.min<=minute})
                }
                else if(maxHour-selectHour==0){
                    mins.push({minute, enable:max.min>=minute})
                }
                else{
                    mins.push({minute, enable:false})
                }
            }
        }
        return mins
    }

    renderAMPM(select,min,max) {
        const selectDate = new Date(select.year,select.month-1,select.date)
        const minDate = new Date(min.year,min.month-1,min.date)
        const maxDate = new Date(max.year,max.month-1,max.date)
        var ampm = {am:false, pm:false}
        if(selectDate-minDate>0 && maxDate-selectDate>0){
            ampm = {am:true, pm:true}
        }
        else if(selectDate-minDate>0) ampm.am = true
        else if(maxDate-selectDate>0) ampm.pm = true
        else{
            if(selectDate-minDate==0){
                ampm.am = min.ampm==0
            }
            if(maxDate-selectDate==0){
                ampm.pm = max.ampm==1
            }
        }
        return ampm
    }

    render() {
        const { select, selectDay, max, min } = this.props
        const ampm = this.renderAMPM(select,min,max)
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
                    {
                        this.renderMin(select,min,max).map(i =>
                            i.enable?
                            <div className={(select.min == i.minute ? "select " : "") + "timeitem onclick hover"} key={i.minute} onClick={() => selectDay(null, null, null, null, i.minute)}>{i.minute}</div>
                            :<div className="timeitem disabled-timeitem" key={i.minute}>{i.minute}</div>
                        )
                    }
                </div>

                <div className="ampm scroll">
                    {
                        ampm.am?
                            <div className={(select.ampm == 0 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 0)}><FormattedMessage id='datetime.am' defaultMessage='上午'></FormattedMessage></div>
                            :<div className="timeitem disabled-timeitem"><FormattedMessage id='datetime.am' defaultMessage='上午'></FormattedMessage></div>
                    }
                    {
                        ampm.pm?
                            <div className={(select.ampm == 1 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 1)}><FormattedMessage id='datetime.pm' defaultMessage='下午'></FormattedMessage></div>
                            :<div className="timeitem disabled-timeitem"><FormattedMessage id='datetime.pm' defaultMessage='下午'></FormattedMessage></div>
                    }
                    
                </div>
            </div>
        )
    }
    static propTypes = {
        select: propTypes.object.isRequired,
        selectDay: propTypes.func.isRequired,
    }
}
