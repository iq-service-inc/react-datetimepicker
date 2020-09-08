import React, { Component } from 'react'

export default class Time extends Component {
    render() {
        const { hours, minutes, select, selectDay } = this.props
        return (
            <div className="timebox">
                <div className="hour scroll">
                    {hours.map(hr =>
                        <div  className={(select.hour == hr ? "select " : "") + "timeitem onclick hover"} key={hr} onClick={() => selectDay(null, null, null, hr)}>{hr}</div>
                    )}
                </div>
                <div className="minute scroll">
                    {minutes.map(min =>
                        <div  className={(select.min == min ? "select " : "") + "timeitem onclick hover"} key={min} onClick={() => selectDay(null, null, null, null, min)}>{min}</div>
                    )}
                </div>
                <div className="ampm scroll">
                    <div className={(select.ampm == 0 ? "select " : "") + "timeitem onclick hover"} key="am" onClick={() => selectDay(null, null, null, null, null, 0)}>am</div>
                    <div className={(select.ampm == 1 ? "select " : "") + "timeitem onclick hover"} key="pm" onClick={() => selectDay(null, null, null, null, null, 1)}>pm</div>
                </div>
            </div>
        )
    }
}
