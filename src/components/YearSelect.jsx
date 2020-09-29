import React, { Component } from 'react'
import propTypes from 'prop-types'
import { FormattedDate } from 'react-intl'

export default class YearSelect extends Component {
    constructor(props){
        super(props)
        this.state = {
            year: [],
            open: undefined
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { select } = this.props
        if(prevState.year.length==0){
            this.scrolltoselect()
        }
        if(prevProps.select!==select){
            this.createYear()
        }
    }

    componentDidMount() {
        this.createYear()
    }

    createYear() {
        const { max, min, select } = this.props
        if(max.year-min.year > 19){
            var middle = select.year
            if(select.year<min.year) middle = Number(min.year)+9
            if(select.year>max.year) middle = Number(max.year)-9
            var start = Number(middle)-7>min.year? Number(middle)-9: min.year
            var end = Number(middle)+7<max.year? Number(middle)+9: max.year
            this.setState({
                year: this.createarr(start, end)
            })
        }
        else{
            this.setState({ year: this.createarr(min.year, max.year)})
        }

        this.setState({
            open: select.year
        })
    }

    scrolltoselect() {
        var yearselect = document.getElementsByClassName('yearselect')[0]
        var select = yearselect.getElementsByClassName('select')[0]
        !!select && (yearselect.scrollTop = select.parentNode.parentNode.offsetTop - yearselect.offsetTop)
    }

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
        const { select, max, min, selectDay, disabled } = this.props
        const { open } = this.state
        return (
            <div className="yearselect" onScroll={(e) => this.onScroll(e)}>
                {
                    this.state.year.map(year=>
                        disabled.indexOf('month')==-1?
                        <div className={(open == year ? "selectyear" : "") + " year onclick"} key={year} onClick={() => this.openMonth(year)}>
                            <FormattedDate
                                value={new Date(year,1)}
                                year="numeric"
                            />
                            {open == year &&
                                <div className="monthselect">
                                    {
                                        disabled.indexOf('year')==-1 || year==select.year?
                                        open == year && this.rendermonth(year, max, min).map(m =>
                                            <div className={(select.month == m && select.year == year ? "select " : "hover ") + "month onclick"} key={m} onClick={() => selectDay(year, m)}>
                                                <FormattedDate
                                                    value={new Date(select.year, m-1)}
                                                    month="short"
                                                />
                                            </div>
                                        )
                                        :open == year && this.rendermonth(year, max, min).map(m =><div className={(select.month == m && select.year == year ? "select " : "") + "month greydate"} key={m}>
                                                <FormattedDate
                                                    value={new Date(select.year, m-1)}
                                                    month="short"
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                        :<div className={(select.year == year ? "select " : "hover ") +" bigyear onclick"} key={year} onClick={() => selectDay(year)}>
                            <FormattedDate
                                value={new Date(year,1)}
                                year="numeric"
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}
