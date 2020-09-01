import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import classNames from '../utils/classes'

const styles = theme => ({
  root: {
    marginTop: '1em',
  },
  question: {
    display: 'flex',
    justifyContent: "left",
    color: 'dark',
    padding: theme.spacing(1,1,1,6),
    fontSize: theme.spacing(3),
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    padding: theme.spacing(0,0,0,10),
  },
  button: {
    width: '20%',
    color: 'black',
    fontSize: theme.spacing(2),
    background: 'rgba(254, 254, 254, 0.2)',
    border: '1px solid black',
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1, 4),
    textTransform: "none",
    '&.selected': {
      background: 'rgba(48, 57, 139, 0.6)',
      color: '#dae1c5',
    },
    '&:hover': {
      background: 'rgba(45, 184, 188, 0.6)',
      color: 'black',
    },
  },
  link: {
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    textDecoration: 'underline',
  },
  optional: {
    fontSize: theme.spacing(3),
    display: 'flex',
    justifyContent: "center",
    padding: theme.spacing(1),
    background: 'rgba(41, 28, 51, 0.26)',
    margin: theme.spacing(1,12,1,12),// width: '80%',
    // color: 'white',
  }
})


class Evaluate extends React.Component {

  renderEvalButtons() {
    const { classes, optional, questions, onSelect } = this.props

    return (
      <div className={classes.root}>

          <Typography
            component="h3"
            variant="h3"
            className={classes.question}>
            Q1. Do you think this statement requires commonsense to infer True/False?
            <br/>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ1']['answer'] === 'yes',
              })}
              onClick={() => onSelect('evalQ1', 'yes')}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ1']['answer'] === 'no',
              })}
              onClick={() => onSelect('evalQ1', 'no')}>
              No
            </Button>
          </Typography>

        {questions['evalQ1']['answer'] === 'yes' && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.question}>
            Q2. Do you think this statement is True?
            <br/>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ2']['answer'] === 'yes',
              })}
              onClick={() => onSelect('evalQ2', 'yes')}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ2']['answer'] === 'no',
              })}
              onClick={() => onSelect('evalQ2', 'no')}>
              No
            </Button>
          </Typography>
        )}

        {questions['evalQ1']['answer'] === 'yes' && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.question}>
            Q3. Please select <u>all the <b>domains</b></u> that you think this statement can be categorized into:
            <br/>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ3']['answer'].indexOf('social') >= 0,
              })}
              onClick={() => onSelect('evalQ3', 'social')}>
              Social
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ3']['answer'].indexOf('physical') >= 0,
              })}
              onClick={() => onSelect('evalQ3', 'physical')}>
              Physical
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ3']['answer'].indexOf('time') >= 0,
              })}
              onClick={() => onSelect('evalQ3', 'time')}>
              Time
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ3']['answer'].indexOf('none') >= 0,
              })}
              onClick={() => onSelect('evalQ3', 'none')}>
              None of the above
            </Button>
          </Typography>
        )}

        {questions['evalQ1']['answer'] === 'yes' && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.question}>
            Q4. Please select <u>all the <b>scenarios</b></u> that you think this statement can be categorized into:
            <br/>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ4']['answer'].indexOf('causal') >= 0,
              })}
              onClick={() => onSelect('evalQ4', 'causal')}>
              Cause & Effect
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ4']['answer'].indexOf('comparison') >= 0,
              })}
              onClick={() => onSelect('evalQ4', 'comparison')}>
              Comparison
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ4']['answer'].indexOf('numeracy') >= 0,
              })}
              onClick={() => onSelect('evalQ4', 'numeracy')}>
              Numeracy
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ4']['answer'].indexOf('none') >= 0,
              })}
              onClick={() => onSelect('evalQ4', 'none')}>
              None of the above
            </Button>
          </Typography>
        )}

        {questions['evalQ1']['answer'] === 'yes' && optional !== null && (
          <Typography
            component="h3"
            variant="h3"
            className={classes.question}>
            Q5. Will the following knowledge piece help explain the above statement?
            <div className={classes.optional}>{optional}</div>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ5']['answer'] === 'yes',
              })}
              onClick={() => onSelect('evalQ5', 'yes')}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ5']['answer'] === 'maybe',
              })}
              onClick={() => onSelect('evalQ5', 'maybe')}>
              Maybe
            </Button>
            <Button
              variant="contained"
              className={classNames(classes.button, {
                'selected': questions['evalQ5']['answer'] === 'no',
              })}
              onClick={() => onSelect('evalQ5', 'no')}>
              No
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
