import React, { Component } from 'react'
import propTypes from 'prop-types'
import { FormattedDate } from 'react-intl'

export default class YearSelect extends Component {
    constructor(props){
        super(props)
        this.state = {
            year: this.createarr(2000,2020),
            open: undefined
        }
    }

    componentDidMount() {
        const { max, min, select } = this.props
        if(max.year-min.year > 13){
            this.setState({
                year: this.createarr(select.year-5, select.year+5)
            })
        }
        else{
            this.setState({ year: this.createarr(min.year, max.year)})
        }

        this.setState({
            open: select.year
        })
    }

    // scrolltoselect() {
    //     var yearselect = document.getElementsByClassName('yearselect')[0]
    //     var select = yearselect.getElementsByClassName('select')[0].parentNode.parentNode
    //     select.scrollIntoView()
    // }

    createarr(start, end) {
        var arr = []
        for(var i=start; i<=end; i++){
            arr.push(i)
        }
        return arr
    }

    onScroll = (e) => {
        var element = e.target
        const { year } = this.state
        const { max, min } = this.props
        var arr = year
        if (element.scrollHeight - element.scrollTop === element.clientHeight){
            var last = year[year.length-1]
            arr = year.concat(this.createarr(last+1, last+11>max.year? max.year: last+11))
        }
        if (element.scrollTop == 0){
            var first = year[0]
            arr = this.createarr(first-11<min.year? min.year:first-11 ,first-1).concat(year)
            if(arr.length!=year.length){
                element.scrollTop=100
            }
        }
        this.setState({year:arr})
    }

    rendermonth = (year, max, min) => {
        var start = 1
        var end = 12
        if(year == max.year){
            end = max.month
        }
        if(year == min.year){
            start = min.month
        }
        return this.createarr(start, end)
    }

    openMonth = (year) => {
        this.setState({open: year})
    }

    render() {
        const { select, max, min, selectDay } = this.props
        const { year, open } = this.state
        return (
            <div className="yearselect" onScroll={(e) => this.onScroll(e)}>
                {
                    year.map(year=>
                        <div className="year onclick" key={year} onClick={() => this.openMonth(year)}>
                            <FormattedDate
                                value={new Date(year,1)}
                                year="numeric"
                            />
                            <div className="monthselect">
                                {
                                    open == year && this.rendermonth(year, max, min).map(m =>
                                        <div className={(select.month == m && select.year == year ? "select " : "") + "month onclick hover"} key={m} onClick={() => selectDay(year, m)}>
                                            <FormattedDate
                                                value={new Date(select.year, m-1)}
                                                month="short"
                                            />
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
}
