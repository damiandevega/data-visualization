import React from 'react'
// import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = (props) => {
    const { line, lines } = props;
    let filteredLine = lines.filter(match => match.name === line);
    let filteredObject = filteredLine[0];

    const options = {
        title: {
            text: `${line} Revenue`
          },
        xAxis: {
            categories: filteredObject.times
        },
        plotOptions: {
            series: {
                allowPointSelect: true
            }
        },
        series: [{
            data: filteredObject.values
        }]
    }

    return (
        <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
        </div>
    )
}

export default Chart;