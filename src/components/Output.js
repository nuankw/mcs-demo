import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Winning from './Winning'
import Whaaaat from './Whaaaat'
import Losing from './Losing'


const styles = theme => ({
  fooled: {
    position: 'flex',
    marginLeft: theme.spacing(-3),
  },
})


class Output extends React.Component {

  render() {
    const { classes, hideResult, fooled } = this.props
    // we will show the help icon (Whaaaat) when the model prediction is:
    //      1. null, or
    //      2. it does not reflect T/F of most recent input

    // the fooled here is a boolean indicating whether model prediciton == label
    return (
      <div className={classes.fooled}>
        {hideResult && <Whaaaat />}
        {!hideResult && fooled && <Winning />}
        {!hideResult && !fooled && <Losing />}
      </div>
    )
  }
}


export default withStyles(styles)(Output)
