import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class YearSelect extends Component {
    render() {
        const { select, years, months, open, openMonth, selectDay } = this.props
        return (
            <div className="yearselect">
                {
                    years.map(y =>
                        <div className="year onclick" key={y} onClick={() => openMonth(y)}>{y}
                            <div className="monthselect">
                                {
                                    open == y &&
                                    months.map(m =>
                                        <div className={(select.month == m && select.year == y ? "select " : "") + "month onclick hover"} key={m} onClick={() => selectDay(y, m, null, null, null)}>
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
        years: propTypes.array.isRequired,
        months: propTypes.array.isRequired,
        open: propTypes.number.isRequired,
        openMonth: propTypes.func.isRequired,
    }
}
