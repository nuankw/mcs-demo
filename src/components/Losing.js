import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  icon: {
    position: "flex",
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(3),
    color: 'darkred',
    cursor: 'pointer',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))


export default function False() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null)
  };

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <CancelIcon
        className={classes.icon}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography>Carl wasn't fooled. You lose!</Typography>
      </Popover>
    </React.Fragment>
  )
}
