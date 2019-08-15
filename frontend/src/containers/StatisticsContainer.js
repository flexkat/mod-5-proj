import React from 'react'
import { Tab, Header} from 'semantic-ui-react'
import Statistics from '../components/Statistics'
import ResultsChart from '../components/Chart';
const Chart = require('chart.js')



class StatisticsContainer extends React.Component {

  render() {
    const panes = [
      {menuItem: "Week Overview", render: () => <Tab.Pane><Statistics {...this.props} medicines={this.props.medicines}/></Tab.Pane>},
      {menuItem: "Month Overview", render: () => <Tab.Pane><ResultsChart medicines={this.props.medicines}/></Tab.Pane>}
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