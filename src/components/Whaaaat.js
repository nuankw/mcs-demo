import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  icon: {
    position: "relative",
    top: theme.spacing(2),
    right: theme.spacing(1),
    color: 'lightgoldenrodyellow',
    fontSize: theme.spacing(5),
    cursor: 'pointer',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))


export default function Whaaaat() {
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
      <HelpOutlineIcon
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
        <Typography>asdfasdfasfdasdfasfdasdf</Typography>
      </Popover>
    </React.Fragment>
  )
}
