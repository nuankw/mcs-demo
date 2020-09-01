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

        {/* Q1 */}
        <div>
          <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              1. Do you think this statement requires commonsense to infer True/False?
          </Typography>
          <div className={classes.buttonRow}>
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
          </div>
        </div>

        {/* Q2 */}
        {questions['evalQ1']['answer'] === 'yes' && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              2. Do you think this statement is True?
            </Typography>

            <div className={classes.buttonRow}>
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
            </div>
          </div>
        )}

        {/* Q3 */}
        {questions['evalQ1']['answer'] === 'yes' && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              3. Please select all the domains that you think this statement can be categorized into:
            </Typography>

            <div className={classes.buttonRow}>
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
                  'selected': questions['evalQ3']['answer'].indexOf('other') >= 0,
                })}
                onClick={() => onSelect('evalQ3', 'other')}>
                Other
              </Button>
            </div>
          </div>
        )}

        {/* Q4 */}
        {questions['evalQ1']['answer'] === 'yes' && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              4. Please select all the scenarios that you think this statement can be categorized into:
            </Typography>

            <div className={classes.buttonRow}>
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
                  'selected': questions['evalQ4']['answer'].indexOf('other') >= 0,
                })}
                onClick={() => onSelect('evalQ4', 'other')}>
                Other
              </Button>
            </div>
          </div>
        )}

        {/* Q5 */}
        {questions['evalQ1']['answer'] === 'yes' && optional !== null && optional !== "" && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              5. Will the following knowledge piece help explain the above statement?
            </Typography>
            <div className={classes.optional}>{optional}</div>

            <div className={classes.buttonRow}>
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
            </div>
          </div>
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
