import React from 'react'
import { Header } from 'semantic-ui-react'
const Chart = require('chart.js')

class ResultsChart extends React.Component {

  render() {

    const drugHistory = this.props.usersMedicines.map(med => med.history)
    
    let taken = 0;
    let missed = 0;

    const drugHistoryValues = drugHistory.map(obj => Object.values(obj))
    const array = []
    for (const arr of drugHistoryValues) {
      for (const el of arr) {
        array.push(el)
      }
    }

    const drugHistoryStatus = () => {
      for (const el of array) {
        for (const key in el) {
          if (key === "status") {
            for (const obj in el) {
              for (const time in el[obj]) {
                if(el[obj][time] === true) {
                  taken = taken + 1
                } else {
                  missed = missed + 1
                }
              }
            }
          }
        }
      }
    }
    drugHistoryStatus()
    

    var ctx = 'myChart'
    const myChart = new Chart(ctx, {type: 'pie',
    data: {
        labels: ['Taken', 'Missed'],
        datasets: [{
            label: '# of Votes',
            data: [`${taken}`, `${missed}`],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero: true
        //         }
        //     }]
        // }
    }})
    // myChart.render()
    return(
      <div>
        <Header as="h2">Chart</Header>
        <canvas id="myChart" width="300" height="150"></canvas>
      </div>
    )
  }
}

export default ResultsChart

