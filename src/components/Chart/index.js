import React from 'react'
// import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: 'Revenue'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

const Chart = (props) => {
    console.log(props);

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