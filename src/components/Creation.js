import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Evaluate from './Evaluate'
import Submit from './Submit'


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



class Creation extends React.Component {

  render() {
    const { classes, scenario, submit, inputs } = this.props
    return (
      <React.Fragment>

        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <span className={classes.underlined}>Part 2:</span>&nbsp;
          Enter 2 common sense statements {!!scenario && `about ${scenario}`} (1 TRUE and 1 FALSE)
        </Typography>

        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={3}>

            <Grid item xs={12} align="center">

              {/* For Part 2: creation question: was the machine output correct */}
              {inputs.s1.output != null && (
                <Evaluate evaluated={false}
                onSelect={this.handleEvaluate.bind(this)}
                onReset={this.handleOnClear.bind(this)} />
              )}

              {/* For Part 2: creation submit */}
              {inputs.s1.output === null && <Submit />}
            </Grid>

          </Grid>
        </form>

      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Creation)
