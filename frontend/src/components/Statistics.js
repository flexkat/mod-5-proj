import React from 'react'
import { Icon, Table, Container, Header } from 'semantic-ui-react'
import { getDate } from '../utils/medicines'


class Statistics extends React.Component {

  checkWhichIconToRender = (med, date, time) => {
    if(date === getDate() && !med.history[date]) return ""
  
    if(med.history[date]) {
      if (med.history[date].status[time]) {
        return <Icon color='green' name='checkmark' size='large'/>
      }
      else if (med.history[date].clicked[time] && med.history[date].status[time] === false){
        return <Icon color='red' name='circle' size='large'/>
      }
      else if (date === getDate() && !med.history[date].clicked[time]) {
        return ""
      }
    }
    return <Icon color='orange' name='circle' size='large'/>
  }

  previousWeeksDatesFunction = (dates) => {
    if (dates.length < 7) return dates

    return dates.slice(Math.max(dates.length - 7))
  }

  render() {
    const medicines = this.props.medicines
    const allDateKeys = this.props.medicines.map(med => Object.keys(med.history))
    const allDatesArray = [].concat.apply([], allDateKeys);
    const dates = [...new Set(allDatesArray)]

    const previousWeeksDates = this.previousWeeksDatesFunction(dates)

    return(
      <Container>
        <Header as="h1">Stats</Header>
        <Table celled structured unstackable>
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
                    <Table.Cell key={`${med.id}-${date}-AM`} textAlign="center">
                      {this.checkWhichIconToRender(med, date, "AM")}
                    </Table.Cell>)) 
                  : (previousWeeksDates.map(date => 
                    <Table.Cell key={`${med.id}-${date}-PM`} textAlign="center">
                      {this.checkWhichIconToRender(med, date, "PM")}
                    </Table.Cell>))
                }
              </Table.Row>
              {med.morning && med.evening 
                ? <Table.Row>
                  <Table.Cell>PM</Table.Cell>
                  {med.evening && previousWeeksDates.map(date => 
                    <Table.Cell key={`${med.id}-${date}-PM`}  textAlign="center">
                      {this.checkWhichIconToRender(med, date, "PM")}
                    </Table.Cell>)
                  }
                </Table.Row>
                : null}
              </>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default Statistics