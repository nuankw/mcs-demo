import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel'
import { Typography } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  icon: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(1),
    color: 'darkred',
    fontSize: theme.spacing(3),
  },
  message: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: theme.spacing(10),
    fontSize: theme.spacing(1.5),
    fontWeight: 'bolder',
    color: 'darkred',
  },
})


class False extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <span>
        <CancelIcon className={classes.icon} />
        <Typography component="h1" variant="h4" className={classes.message}>Model not fooled</Typography>
      </span>
    )
  }
}


export default withStyles(styles)(False)
