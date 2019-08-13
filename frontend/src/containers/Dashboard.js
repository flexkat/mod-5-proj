import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { getDate } from '../utils/medicines'


class Dashboard extends React.Component {

  checkWhichIconToRender = (med, date, time) => {
    return med.history[date] ? med.history[date] && med.history[date].status[time] ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/> : <Icon color='orange' name='circle' size='large'/>
  }

  render() {
    const medicines = this.props.medicines
    const allDateKeys = this.props.medicines.map(med => Object.keys(med.history))
    const allDatesArray = [].concat.apply([], allDateKeys);
    const dates = [...new Set(allDatesArray)]
    const currentDate = getDate();

    return(
      <div>
        <div>Stats</div>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>Medicines</Table.HeaderCell>
              {dates.map(date => <Table.HeaderCell>{date}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {medicines.map(med => (
              <>
              <Table.Row>
                <Table.Cell rowSpan='2'>{med.name}</Table.Cell>
                {med.morning 
                  ? <Table.Cell>AM</Table.Cell> 
                  : <Table.Cell></Table.Cell>
                }
                {dates.map(date => 
                  <Table.Cell textAlign="center">
                    {this.checkWhichIconToRender(med, date, "AM")}
                  </Table.Cell>)
                }
              </Table.Row>
              <Table.Row>
                {med.evening 
                  ? <Table.Cell>PM</Table.Cell> 
                  : <Table.Cell></Table.Cell>
                }
                {dates.map(date => 
                  <Table.Cell textAlign="center">
                    {this.checkWhichIconToRender(med, date, "PM")}
                  </Table.Cell>)
                }
              </Table.Row>
              </>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default Dashboard