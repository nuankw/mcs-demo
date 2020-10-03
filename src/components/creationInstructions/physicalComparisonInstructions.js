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


class PhysicalComparisonInstruction extends React.Component {

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
                <li><b>Comparison</b>: Aims to compare two plausible reasons or concepts,
                  for a given daily event.</li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li>
                  <b><i>[True]</i></b> A steel bottle might be more suitable than a wooden box for hammering. <br/>
                  <b><i>[False]</i></b> A steel bottle might be less suitable than a wooden box for hammering.
                </li>
                <li>
                  <b><i>[True]</i></b> It's more convenient to use a shirt rather than a tie, as a dusting cloth. <br/>
                  <b><i>[False]</i></b> It's more convenient to use a tie rather than a shirt, as a dusting cloth.
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
                  To generate complements, you can simply swap the entities
                  or reverse the comparison words.
                </li>

                <li>
                  For a given pair, it’s usually challenging to get a win
                  on both the sentences.
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(PhysicalComparisonInstruction)
