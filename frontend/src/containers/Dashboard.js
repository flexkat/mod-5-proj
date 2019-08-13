import React from 'react'
import { Icon, Table } from 'semantic-ui-react'


class Dashboard extends React.Component {
  render() {
    const medicines = this.props.medicines
    const allDateKeys = this.props.medicines.map(med => Object.keys(med.history))
    const allDatesArray = [].concat.apply([], allDateKeys);
    const dates = [...new Set(allDatesArray)]

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
                {med.morning ? <Table.Cell>AM</Table.Cell> : <Table.Cell></Table.Cell>}
                <Table.Cell textAlign='center'>
                  {med.history['08/11/2019'] && med.history['08/11/2019'].status.AM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {med.history['08/12/2019'] && med.history['08/12/2019'].status.AM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {med.history['08/13/2019'] && med.history['08/13/2019'].status.AM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {med.evening ? <Table.Cell>PM</Table.Cell> : <Table.Cell></Table.Cell>}
                <Table.Cell textAlign='center'>
                  {med.history['08/11/2019'] && med.history['08/11/2019'].status.PM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {med.history['08/12/2019'] && med.history['08/12/2019'].status.PM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {med.history['08/13/2019'] && med.history['08/13/2019'].status.PM ? <Icon color='green' name='checkmark' size='large'/> : <Icon color='red' name='circle' size='large'/>}
                </Table.Cell>
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