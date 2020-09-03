import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import True from './True'
import False from './False'


const styles = theme => ({
  output: {
    position: 'absolute',
    right: '20vw',
  },
})


class Output extends React.Component {

  render() {
    const { classes, output } = this.props
    return (
      <div className={classes.output}>
        {output && <True />}
        {!output && <False />}
      </div>
    )
  }
}


export default withStyles(styles)(Output)
