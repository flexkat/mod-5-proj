import React from 'react'
const Chart = require('chart.js')

class ResultsChart extends React.Component {

  render() {

  //   const eachDose = () => this.props.usersMedicines.map(med => {
  //     for(const date in med.history) {
  //       console.log(date)
        
  //     }
  //   })

  //   const result = this.props.usersMedicines.map(med => Object.keys(med.history).reduce((res,status) => {
  //     var count = "";
  //     Object.keys(med.history[status]).forEach((time) => {
  //         count = med.history[status][time];
  //         if (!res[time][count] || !med.history){ res[time][count] = 0; }
  //         res[time][count] += 1;

  //     });
  //     return res;
  // }, {taken: {},missed: {}}));

    var ctx = 'myChart'
    const myChart = new Chart(ctx, {type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }})
    return(
      <div>Chart
        <canvas id="myChart" width="300" height="150"></canvas>
      </div>
    )
  }
}

export default ResultsChart

