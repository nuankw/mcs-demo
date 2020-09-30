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
    const { classes, output, tested } = this.props
    // the output here is a boolean indicating whether model prediciton == label
    return (
      <div className={classes.output}>
        {output === true && <Winning />}
        {output === false && <Losing />}
      </div>
    )
  }
}


export default withStyles(styles)(Output)
