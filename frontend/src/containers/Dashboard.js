import React from 'react'
import { Icon, Table, Container } from 'semantic-ui-react'
import { getDate } from '../utils/medicines'


class Dashboard extends React.Component {

  checkWhichIconToRender = (med, date, time) => {
    if(date === getDate() && !med.history[date]) {
      return ""
    }

    return med.history[date] ? med.history[date] && med.history[date].status[time] ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/> : <Icon color='orange' name='circle' size='large'/>
  }

  render() {
    const medicines = this.props.medicines
    const allDateKeys = this.props.medicines.map(med => Object.keys(med.history))
    const allDatesArray = [].concat.apply([], allDateKeys);
    const dates = [...new Set(allDatesArray)]
    const currentDate = getDate();
    const indexOfCurrentDate = dates.indexOf(currentDate)

    const previousWeeksDates = dates.slice(Math.max(indexOfCurrentDate - 7))

    return(
      <Container>
        <div>Stats</div>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>Medicines</Table.HeaderCell>
              {previousWeeksDates.map(date => <Table.HeaderCell key={date}>{date}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {medicines.map(med => (
              <>
              <Table.Row>
                <Table.Cell rowSpan={med.morning && med.evening ? "2" : "1"}>
                  {med.name}
                </Table.Cell>
                {med.morning ? <Table.Cell>AM</Table.Cell> : <Table.Cell>PM</Table.Cell>} 
              
                {med.morning 
                  ? (previousWeeksDates.map(date => 
                    <Table.Cell textAlign="center">
                      {this.checkWhichIconToRender(med, date, "AM")}
                    </Table.Cell>)) 
                  : (previousWeeksDates.map(date => 
                    <Table.Cell textAlign="center">
                      {this.checkWhichIconToRender(med, date, "PM")}
                    </Table.Cell>))
                }
              </Table.Row>
              {!med.morning || med.evening && <Table.Row>
                <Table.Cell>PM</Table.Cell>
                {med.evening && previousWeeksDates.map(date => 
                  <Table.Cell textAlign="center">
                    {this.checkWhichIconToRender(med, date, "PM")}
                  </Table.Cell>)
                }
              </Table.Row>}
              </>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default Dashboard