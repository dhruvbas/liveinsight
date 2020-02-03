import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require('highcharts/modules/exporting')(Highcharts)

const Graph = ({title,forecast,actual}) => {

    const options = {
        chart: {
            scrollablePlotArea: {
              maxWidth: 750
            },
            spacingTop: 20
          },
        
          
        
          title: {
            text: title
          },
        
         
        
          xAxis: {
            tickInterval: 7 * 24 * 3600 * 1000, // one week
            tickWidth: 0, 
            gridLineWidth: 1,
            labels: {
              align: 'left',
              x: 3,
              y: -3
            }
          },
        
          yAxis: [{ // left y axis
            title: {
              text: null
            },
            labels: {
              align: 'left',
              x: 3,
              y: 16,
              format: '{value:.,0f}'
            },
            showFirstLabel: false
          }, { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
              text: null
            },
            labels: {
              align: 'right',
              x: -3,
              y: 16,
              format: '{value:.,0f}'
            },
            showFirstLabel: false
          }],
        
          legend: {
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
          },
        
          tooltip: {
            shared: true,
            crosshairs: true
          },
        series: [{
          name : "Forecast",
          lineWidth: 4,
            marker: {
                radius: 4
            },
          data: forecast
        },
        {
            name : "Actual",
            data: actual
          }],
      }

    return(
        <>
            <div style={{width:"90%",margin:"auto"}}> 
                <HighchartsReact
                    style={{width:"100%"}}
                    highcharts={Highcharts}
                    constructorType={'chart'}
                    options={options}
                />
            </div>
        </>
    )
}

export default Graph;