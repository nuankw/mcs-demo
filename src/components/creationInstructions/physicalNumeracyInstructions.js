import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { Grid } from '@material-ui/core'


const styles = theme => ({
  root: {
    width: '100%',
    fontSize: '18px',
  },
  instructions: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(4),
  },
  head: {
    fontWeight: 'bold',
  },
  headExplanation: {
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
  },
})


class PhysicalNumeracyInstruction extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container  className={classes.root}>
        <Grid item xs={12}>
          <Typography component={'div'} className={classes.instructions}>
            <ul>
              <li className={classes.head}>
                  Domain and Scenario Recap
              </li>
              <ul>
              <li><b>Physical</b>: Key aspects include the
                  knowledge of daily objects, location, motion, etc.</li>
                <li><b>Numeracy</b>: Focuses on simple arithmetic skills (add, multiply, etc.)
                  and concepts such as rate, percentage, probability, etc.</li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li>
                  <b><i>[True/False]</i></b> Example 1-1 <br/>
                  <b><i>[False/True]</i></b> Example 1-2
                </li>
                <li>
                  <b><i>[True/False]</i></b> Example 2-1 <br/>
                  <b><i>[False/True]</i></b> Example 2-2
                </li>
              </ul>

              <li className={classes.head}>
                  Tips and Tricks
              </li>

              <ul>
                <li className={classes.headExplanation}>
                  To break the system as well as generate complementary samples,
                  we can modify the sentence with:
                </li>
                <ul>
                  <li>Negation</li>
                  <li>Swap</li>
                  <li>Plausibility-Qualifiers (e.g. sometimes, likely, rarely)</li>
                  <li>Contrasting-Conjuncts (e.g. unless, despite)</li>
                  <li>Distractors</li>
                </ul>

                <li>
                  Tip 2
                </li>

                <li>
                  Tip 3
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(PhysicalNumeracyInstruction)
