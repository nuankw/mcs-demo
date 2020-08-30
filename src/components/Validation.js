import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import Output from './Output'
import UserEval from './UserEval'
import Instructions from './ValidationInstruction'

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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
    color: 'black',
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
  underlined: {
    textDecoration: 'underline',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  title: {
    marginBottom: "10px",
    align: "center",
    color: "black",
  },
  note: {
    fontSize: theme.spacing(3),
    color: "black",
  },
  progress: {
    fontSize: theme.spacing(4),
  },
})


class Validation extends React.Component {

  render() {
    const { classes, prevInput, prevOutput, prevOptional, handleOnEval, evalCount, requiredEval, evalQuestions, loadNextTrial } = this.props

    const enableNext = (
      evalQuestions['evalQ1'].answer === 'no' ||
      Object.keys(evalQuestions).every(key => !!evalQuestions[key].answer))

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>

          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            <span className={classes.title}>Part 1: Validation </span>
            <p className={classes.note}>NOTE: Please take 5 minutes to read this instruction carefully.
                We will have another user to examine your inputs and will reject your HITs
                if you fail to provide inputs that are compliant with the instruction.</p>
          </Typography>

          <Instructions/>

          <Typography
            component="h3"
            variant="h3">
            <p className={classes.progress}> Reviewing {evalCount} out of {requiredEval} statements. </p>
          </Typography>

          {/* Input Box 1 */}
          <Grid item xs={12}>
            <Paper component="div" className={classes.paper} square>
              {prevOutput != null && <Output output={prevOutput} />}
              <Typography
                component="h4"
                variant="h4">
                  {prevInput}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} align="center">
            {prevOutput != null && (
              <UserEval
                optional={prevOptional}
                questions={evalQuestions}
                onSelect={(q, a) => handleOnEval(q, a)} />
            )}
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              className={classes.button}
              disabled={!enableNext}
              onClick={() => loadNextTrial()}>
              { evalCount < requiredEval ? ("Next Statement") : ("Let's proceed to creation step!") }
            </Button>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Validation)
