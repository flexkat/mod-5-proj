import React from 'react'
import { Icon, Table, Container, Header } from 'semantic-ui-react'
import { getDate } from '../utils/medicines'


class Statistics extends React.Component {

  checkWhichIconToRender = (med, date, time) => {
    if (date === getDate() && !med.history[date]) return ""

    if (med.history[date]) {
      if (med.history[date].status[time]) {
        return <Icon color='green' name='checkmark' size='large' />
      }
      else if (med.history[date].clicked[time] && med.history[date].status[time] === false) {
        return <Icon color='red' name='circle' size='large' />
      }
      else if (date === getDate() && !med.history[date].clicked[time]) {
        return ""
      }
    }
    return ""
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

    return (
      <Container>
        <Header as="h3">My week in review</Header>
        <div className="table-scroll">
          <div className="table-wrap">
            {
              [false, true].map((isTheCloneToBeHidden) => {
                return (
                  <Table className={`main-table ${isTheCloneToBeHidden ? 'clone' : ''}`} celled structured unstackable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell className="static col-1">Medicines</Table.HeaderCell>
                        <Table.HeaderCell className="static col-2">Time</Table.HeaderCell>
                        {previousWeeksDates.map(date => <Table.HeaderCell key={date}>{date}</Table.HeaderCell>)}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {medicines.map(med => (
                        <>
                          <Table.Row>
                            <Table.Cell rowSpan="1" className={`static col-1 ${med.morning && med.evening ? 'no-bottom-border' : ''}`}>
                              {med.name}
                            </Table.Cell>
                            {
                              med.morning ? <Table.Cell className="static col-2">AM</Table.Cell> : <Table.Cell className="static col-2">PM</Table.Cell>}

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
                              
                                {med.evening && !med.morning ? 
                                  <Table.Cell rowSpan="1" className="static col-1">
                                    {med.name}
                                  </Table.Cell>
                                  : 
                                  <Table.Cell rowSpan="1" className="static col-1 invisible">
                                    {med.name}
                                  </Table.Cell>
                                }
                              
                              <Table.Cell className="static col-2">PM</Table.Cell>
                              {med.evening && previousWeeksDates.map(date =>
                                <Table.Cell key={`${med.id}-${date}-PM`} textAlign="center">
                                  {this.checkWhichIconToRender(med, date, "PM")}
                                </Table.Cell>)
                              }
                            </Table.Row>
                            : null}
                        </>
                      ))}
                    </Table.Body>
                  </Table>

                )
              })
            }
          </div>
        </div>
      </Container>
    )
  }
}

export default Statistics