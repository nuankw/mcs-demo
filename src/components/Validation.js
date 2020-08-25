import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


import Input from './Input'
import Output from './Output'
import UserEval from './UserEval'
import Instructions from './Instructions'


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
    const { classes, inputs, handleOnEval, scenario, evalCount, evalQuestions } = this.props
    return (
      <React.Fragment>

        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <span style={{marginBottom: "10px", align: "center"}}>Part 1: Validation </span>
          <p style={{fontSize: "28px"}}>NOTE: Please take 5 minutes to read this instruction carefully.
              We will have another user to examine your inputs and will reject your HITs
               if you fail to provide inputs that are compliant with the instruction.</p>
          <p> Reviewing {evalCount} out of 6 statements. </p>
        </Typography>

        <Instructions/>

        {/* Input Box 1 */}
        <Grid item xs={12}>
          <Paper component="div" className={classes.paper} square>
            {inputs.s1.output != null && <Output statement={inputs.s1} />}
            <Input text={inputs.s1} autoFocus={true} disabled={true} />
          </Paper>
        </Grid>

        <Grid item xs={12} align="center">

          {inputs.s1.output != null && (
            <UserEval
              scenario={scenario}
              questions={evalQuestions}
              onSelect={(q, a) => handleOnEval(q, a)} />
          )}

        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Validation)
