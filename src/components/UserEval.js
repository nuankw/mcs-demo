import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  header: {
    color: 'dark',
    padding: theme.spacing(1,4),
    fontSize: theme.spacing(3.5),
  },
  allButton: {
    color: 'black',
    fontSize: theme.spacing(3),
    background: 'rgba(104, 159, 56, 0.6)',
    fontSize: theme.spacing(2.8),
    margin: theme.spacing(2, 3),
    padding: theme.spacing(1.5, 6),
    textTransform: "none",
    '&:hover': {
      background: 'rgba(32, 40, 24, 0.6)',
      color: '#dae1c5',
    },
  },
  link: {
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    textDecoration: 'underline',
  },
})


class Evaluate extends React.Component {

  renderEvalButtons() {
    const { classes, questions, scenario, onSelect } = this.props

    return (
      <div>

        {questions.indexOf('evalQ1') >= 0 && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            Q1. Do you think this statement requires commonsense to infer True/False?
            <br/>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ1', 'yes')}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ1', 'no')}>
              No
            </Button>
          </Typography>
        )}

        {questions.indexOf('evalQ2') >= 0 && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            Q2. Do you think this statement is True?
            <br/>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ2', 'yes')}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ2', 'no')}>
              No
            </Button>
          </Typography>
        )}

        {questions.indexOf('evalQ3') >= 0 && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            Q3. Please select <u>all the <b>domains</b></u> that you think this statement can be categorized into:
            <br/>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ3', 'social')}>
              Social
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ3', 'physical')}>
              Physical
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ3', 'time')}>
              Time
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ3', 'none')}>
              None of the 3
            </Button>
          </Typography>
        )}

        {questions.indexOf('evalQ4') >= 0 && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            Q4. Please select <u>all the <b>scenarios</b></u> that you think this statement can be categorized into:
            <br/>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ4', 'causal')}>
              Cause & Effect
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ4', 'comparison')}>
              Comparison
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ4', 'numeracy')}>
              Numeracy
            </Button>
            <Button
              variant="contained"
              className={classes.allButton}
              onClick={() => onSelect('evalQ4', 'none')}>
              None of the 3
            </Button>
          </Typography>
        )}

      </div>
    )
  }

  renderReset() {
    const { classes, onReset } = this.props
    return (
      <div>
        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <div className={classes.link} onClick={() => onReset()}>
            Let me try one more!
          </div>
        </Typography>
      </div>
    )
  }

  render() {
    const { evaluated } = this.props
    return (
      <div>
        {!!evaluated ? this.renderReset() : this.renderEvalButtons()}
      </div>
    )
  }
}


export default withStyles(styles)(Evaluate)
