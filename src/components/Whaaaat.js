import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  icon: {
    position: "flex",
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(3),
    color: 'darkslategray',
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
      <HelpOutlinedIcon
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
        <Typography>Please enter and test your input.</Typography>
      </Popover>
    </React.Fragment>
  )
}
