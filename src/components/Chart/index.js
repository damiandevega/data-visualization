import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = (props) => {
    let { line, times, values } = props;

    let options = {
        title: {
            text: `${line} Revenue`
          },
        xAxis: {
            categories: times
        },
        series: [{
            data: values
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default Chart;