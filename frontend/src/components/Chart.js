import React from 'react'
import { Header, Container } from 'semantic-ui-react'
import { VictoryPie, VictoryChart } from 'victory';


class ResultsChart extends React.Component {

  render() {

    const drugHistory = this.props.usersMedicines.map(med => med.history)

    const counts = drugHistory.reduce((acc, drug) => {
      let taken = 0;
      let missed = 0;
      Object.keys(drug).map((key) => {
        if(drug[key].status.hasOwnProperty('AM')) {
          if(drug[key].status.AM) {
            taken = taken + 1;
          } else {
            missed = missed + 1;
          }
        }
  

        if(drug[key].status.hasOwnProperty('PM')) {
          if(drug[key].status.PM) {
            taken = taken + 1;
          } else {
            missed = missed + 1;
          }
        }
      })

      return {
        taken: acc.taken + taken,
        missed: acc.missed + missed  
      }
    }, { taken: 0, missed: 0})

    
    // let taken = 0;
    // let missed = 0;

    // const drugHistoryValues = drugHistory.map(obj => Object.values(obj))
    // const array = []
    // for (const arr of drugHistoryValues) {
    //   for (const el of arr) {
    //     array.push(el)
    //   }
    // }

    // for (const el of array) {
    //   for (const key in el) {
    //     if (key === "status") {
    //       for (const obj in el) {
    //         for (const time in el[obj]) {
    //           if(el[obj][time] === true) {
    //             taken = taken + 1
    //           } else {
    //             missed = missed + 1
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    return(
      <Container>
        <Header as="h2">Chart</Header>
        <svg viewBox="0 100 400 400" >
          <VictoryPie
            standalone={false}
            radius={75}
            colorScale={["tomato", "orange"]}
            data={[
              { x: "Taken", y: counts.taken },
              { x: "Missed", y: counts.missed },
            ]}
          />
        </svg>
      </Container>
    )
  }
}

export default ResultsChart

