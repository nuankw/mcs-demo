import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import Input from './Input'
import Output from './Output'
import Scores from './Scores'
import UserEval from './UserEval'


const SCENARIOS = {
  'null': 'general',
  's1': 'negation',
  's2': 'active/passive expressions',
  's3': 'logic exist/all',
  's4': 'event temporal relation',
  's5': 'cultural common sense',
}


const styles = theme => ({
  '@global': {
    body: {
      background: 'rgba(104, 159, 56, 0.6)',
      backgroundSize: '100% 120%',
      padding: theme.spacing(3, 1),
      height: '100vh',
    },
  },
  header: {
    color: '#fefefe',
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    backgroundColor: 'rgba(254, 254, 254, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    color: 'white',
    borderColor: 'whitesmoke',
    marginTop: theme.spacing(3),
  },
  underlined: {
    textDecoration: 'underline',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
})


class Validation extends React.Component {

  render() {
    const { classes, inputs, handleOnEval, scenario, evalQuestions } = this.props
    return (
      <React.Fragment>

        {/* Input Box 1 */}
        <Grid item xs={12}>
          <Paper component="div" className={classes.paper} square>
            {inputs.s1.output != null && <Output statement={inputs.s1} />}
            <Input text={inputs.s1} autoFocus={true} disabled={true} />
            {/* {inputs.s1.scores != null && <Scores statement={inputs.s1} />} */}
          </Paper>
        </Grid>

        <Grid item xs={12} align="center">

          {inputs.s1.output != null && (
            <UserEval
              scenario={SCENARIOS[scenario]}
              questions={evalQuestions}
              onSelect={(q, a) => handleOnEval(q, a)} />
          )}

        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Validation)
