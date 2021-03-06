import React from 'react'
import { Grid, Modal, Typography, Hidden, Button } from '@material-ui/core/'
import CloseIcon from '@material-ui/icons/Close'
import Emoji from './Emoji'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  root: {
    zIndex: 10,
    height: '100vh',
    overflow: 'scroll',
    position: 'absolute',
    padding: theme.spacing(3, 3, 15, 3),
    margin: 0,
    '@media (min-width:600px)': {
      padding: theme.spacing(5),
      width: '60vw',
      left: '20vw',
      top: '2.5vh',
    },
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    background: 'linear-gradient(150deg, #EC6A5A, #A662D6)',
    backgroundSize: '100% 150%',
    border: 0,
    borderRadius: 3,
    outline: 'none',
  },
  header: {
    color: '#fefefe',
    '@media (min-width:600px)': {
    },
  },
  content: {
    color: '#fefefe',
    fontSize: theme.spacing(2),
  },
  divider: {
    width: '100%',
    display: 'block',
    height: theme.spacing(2),
    borderBottom: '1px solid #fefefe',
    marginBottom: theme.spacing(2),
  },
  closeIcon: {
    color: '#fefefe',
    cursor: 'pointer',
    fontSize: theme.spacing(6),
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  button: {
    color: 'white',
    borderColor: 'whitesmoke',
  },
})


class Rules extends React.Component {

  render() {
    const { classes, open, onClose } = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableScrollLock={true}
        open={open}
        onClose={() => onClose()}>
        <Grid container spacing={5} className={classes.root}>
          <Hidden smDown>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => onClose()} />
          </Hidden>
          <Grid item xs={12}>
            <Typography component="h5" variant="h5" className={classes.header}>
              HIT Requirements
            </Typography>
            <span className={classes.divider} />
            <div className={classes.content}>
              <p>1. You will receive $0.05 for each evaluation in part 1, and $0.10 for each statement pair in part 2.</p>
              <p>2. The first 5 pairs of statements in part 2 are $0.10 each, any additional inputs (up to a total of 15) are $0.05 each. The maximum
               payment in part 2 is $1.00.</p>
              <p>3. Your generated statements will be evaluated by others, and rejected if they are not in compliance with the rules below.</p>
              <p>4. You will get a $0.20 bonus for each of the statement pairs that 'fooled the machine' (where the machine output was incorrect) while also passing the validation of another user.</p>
            </div>
            <span className={classes.divider} />
            <Typography component="h5" variant="h5" className={classes.header}>
              Rules
            </Typography>
            <div className={classes.content}>
              <p>1. All generated statement pairs should be grammatically correct.</p>
              <p>2. All generated statement pairs should contain specific scenario requested in the HIT.</p>
              <p>3. All generated statement pairs should be of common sense nature (i.e. things that are shared by (‘common to’) nearly all people and can reasonably
                be expected of nearly all people without need for debate).</p>
              <p>4. For all generated common sense statement pairs, one should be true and one false.</p>
              <p>5. Do not include any personal information about yourself or
                others in any of the generated statement pairs.</p>
              <p>6. Please do not repeat any of the statements you write or evaluate.</p>
              <p>7. Each generated pair should be about the same subject.</p>
            </div>
            <span className={classes.divider} />
            <div className={classes.content}>
              <p><Emoji symbol="📝" label="notes" /><Emoji symbol="👩‍🔬" label="scientist" /> All user input will be logged for scientific purposes</p>
            </div>
          </Grid>
          <Grid item xs={12} align="left">
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => onClose()}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Modal>
    )
  }
}


export default withStyles(styles)(Rules)
