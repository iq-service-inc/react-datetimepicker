import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class YearSelect extends Component {
    render() {
        const { select, yearmonth, open, openMonth, selectDay } = this.props
        return (
            <div className="yearselect">
                {
                    yearmonth.map(obj=>
                        <div className="year onclick" key={obj.year} onClick={() => openMonth(obj.year)}>{obj.year}
                            <div className="monthselect">
                                {
                                    open == obj.year &&
                                    obj.month.map(m =>
                                        <div className={(select.month == m && select.year == obj.year ? "select " : "") + "month onclick hover"} key={m} onClick={() => selectDay(obj.year, m)}>
                                            <span>{m}月</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

    static propTypes = {
        select: propTypes.object.isRequired,
        selectDay: propTypes.func.isRequired,
        open: propTypes.number.isRequired,
        openMonth: propTypes.func.isRequired,
        yearmonth: propTypes.array.isRequired,
    }
}
