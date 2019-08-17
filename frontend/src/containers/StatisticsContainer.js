import React from 'react'
import { Tab, Header} from 'semantic-ui-react'
import Statistics from '../components/Statistics'
import ResultsChart from '../components/Chart';

class StatisticsContainer extends React.Component {

  render() {
    const panes = [
      {menuItem: "Month Overview", render: () => <Tab.Pane key="month"><ResultsChart usersMedicines={this.props.medicines}/></Tab.Pane>},
      {menuItem: "Week Overview", render: () => <Tab.Pane key="week"><Statistics {...this.props} medicines={this.props.medicines}/></Tab.Pane>}
    ]
    return(
      <div>
        <Header as="h1">Statistics</Header>
        <Tab panes={panes}/>
      </div>
    )
  }
}

export default StatisticsContainer