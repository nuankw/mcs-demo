import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Typography } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  icon: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(1),
    color: 'darkgreen',
    fontSize: theme.spacing(3),
  },
  message: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(1),
    width: theme.spacing(10),
    fontSize: theme.spacing(1.5),
    fontWeight: 'bolder',
    color: 'darkgreen',
  },
})


class Winning extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <span>
        <CheckCircleIcon className={classes.icon} />
        <Typography component="h1" variant="h4" className={classes.message}>Model fooled</Typography>
      </span>
    )
  }
}


export default withStyles(styles)(Winning)
