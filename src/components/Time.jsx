import React, { Component } from 'react'
import propTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

export default class Time extends Component {
    componentDidMount() {
        var scroll = document.getElementsByClassName('timebox')[0].getElementsByClassName('scroll')
        for (var i=0; i<scroll.length; i++){
            var select = scroll[i].getElementsByClassName('select')
            for (var j=0; j<select.length; j++){
                !!select[j] && scroll[i].scrollTo(0,select[j].offsetTop-select[j].parentNode.offsetTop)
            }
        }
    }

    renderHour(select,min,max) {
        const { disabled } = this.props
        var d = typeof disabled=='object' && disabled.indexOf('hour')!=-1
        const selectDate = new Date(select.year,select.month-1,select.date)
        const minHour = new Date(min.year,min.month-1,min.date,min.hour+min.ampm*12)
        const maxHour = new Date(max.year,max.month-1,max.date,max.hour+max.ampm*12)
        var hours = []
        for(var hr=0;hr<=11;hr++){
            selectDate.setHours(select.ampm*12+hr)
            
            if(selectDate-minHour>=0 && maxHour-selectDate>=0){
                hours.push({hr, enable:d? false: true})
            }
            else{
                hours.push({hr, enable: false})
            }
        }
        return hours
    }

    renderMin(select,min,max) {
        const { disabled } = this.props
        var d = typeof disabled=='object' && disabled.indexOf('min')!=-1
        const selectHour = new Date(select.year,select.month-1,select.date,select.hour+(select.ampm)*12)
        const minMin = new Date(min.year,min.month-1,min.date,min.hour+(min.ampm)*12,min.min)
        const maxMin = new Date(max.year,max.month-1,max.date,max.hour+(max.ampm)*12,max.min)
        var mins = []
        for(var minute=0;minute<60;minute++){
            selectHour.setMinutes(minute)
            
            if(selectHour-minMin>=0 && maxMin-selectHour>=0){
                mins.push({minute, enable:d? false: true})
            }
            else{
                mins.push({minute, enable: false})
            }
        }
        return mins
    }

    renderAMPM(select,min,max) {
        const { disabled } = this.props
        var d = typeof disabled=='object' && disabled.indexOf('ampm')!=-1
        if(d){
            ampm = {am:false, pm:false}
        }
        else{
            const selectDate = new Date(select.year,select.month-1,select.date)
            const minDate = new Date(min.year,min.month-1,min.date)
            const maxDate = new Date(max.year,max.month-1,max.date)
            var ampm = {am:false, pm:false}
            if(selectDate-minDate>=0 && maxDate-selectDate>=0){
                ampm = {am:true, pm:true}
            }
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
        const { select, selectDay, max, min, disabled, format } = this.props
        const ampm = this.renderAMPM(select,min,max)
        return (
            <div className="timebox">
                <div className="hour scroll time">
                    {
                        this.renderHour(select,min,max).map(i => 
                            i.enable?
                            <div className={(select.hour == i.hr ? "select " : "") + "timeitem onclick hover"} key={i.hr} onClick={() => selectDay(null, null, null, i.hr)}>{format(i.hr==0?12:i.hr,10,'0')}</div>
                            :<div className={(select.hour == i.hr ? "select " : "") + "timeitem disabled-timeitem"} key={i.hr}>{format(i.hr==0?12:i.hr,10,'0')}</div>
                        )
                    }
                </div>
                
                <div className="minute scroll time">
                    {
                        this.renderMin(select,min,max).map(i =>
                            i.enable?
                            <div className={(select.min == i.minute ? "select " : "") + "timeitem onclick hover"} key={i.minute} onClick={() => selectDay(null, null, null, null, i.minute)}>{format(i.minute,10,'0')}</div>
                            :<div className={(select.min == i.minute ? "select " : "") + "timeitem disabled-timeitem"} key={i.minute}>{format(i.minute,10,'0')}</div>
                        )
                    }
                </div>

                <div className="ampm scroll time">
                    {
                        ampm.am?
                            <div className={(select.ampm == 0 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 0)}><FormattedMessage id='datetime.am' defaultMessage='上午'></FormattedMessage></div>
                            :<div className={(select.ampm == 0 ? "select " : "") + "timeitem disabled-timeitem"}><FormattedMessage id='datetime.am' defaultMessage='上午'></FormattedMessage></div>
                    }
                    {
                        ampm.pm?
                            <div className={(select.ampm == 1 ? "select " : "") + "timeitem onclick hover"} onClick={() => selectDay(null, null, null, null, null, 1)}><FormattedMessage id='datetime.pm' defaultMessage='下午'></FormattedMessage></div>
                            :<div className={(select.ampm == 1 ? "select " : "") + "timeitem disabled-timeitem"}><FormattedMessage id='datetime.pm' defaultMessage='下午'></FormattedMessage></div>
                    }
                    
                </div>
            </div>
        )
    }
}
