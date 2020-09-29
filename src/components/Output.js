import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Winning from './Winning'
import Losing from './Losing'


const styles = theme => ({
  output: {
    position: 'relative',
  },
})


class Output extends React.Component {

  render() {
    const { classes, output } = this.props
    return (
      <div className={classes.output}>
        {output && <Winning />}
        {!output && <Losing />}
      </div>
    )
  }
}


export default withStyles(styles)(Output)
