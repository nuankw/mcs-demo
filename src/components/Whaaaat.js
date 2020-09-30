import React from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  icon: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(1),
    color: 'lightgoldenrodyellow',
    fontSize: theme.spacing(3),
  },
})


class Whaaaat extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <HelpOutlineIcon className={classes.icon} />
    )
  }
}


export default withStyles(styles)(Whaaaat)
