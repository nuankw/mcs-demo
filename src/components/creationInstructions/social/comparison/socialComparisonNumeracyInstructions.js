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


class SocialComparisonNumeracyInstructions extends React.Component {

  // PILOT ROUND VERSION
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
              <li style={{fontSize: '1.1em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Numerical-Social = Social + Numeracy</b><br/>
                  </mark>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Social</b>:
                    Focuses on people and social behavior,
                    particularly attributes like personality,
                    emotions and actions.</span><br/>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Numeracy</b>:
                    Knowledge about numbers (magnitude),
                    simple arithmetic (add, multiply, etc.)
                    and concepts such as rate, percentage, probability, etc.</span>
                </li>
                <li style={{fontSize: '1.1em'}}>
                  <b>Comparison</b>: Aims to compare
                    two plausible reasons or concepts,
                    for a given daily event or situation.
                </li>
                <span style={{paddingLeft: '1.5em', color: "brown"}}><b>
                  Notice that you must *specify an event/situation* and then
                  provide *both* comparing
                  concepts in *each* sentence!</b></span><br/>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

              </ul>

              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  To generate both sentences of a pair, you can simply <u>swap the
                  entities</u> or <b>reverse/negate the comparison words</b>.
                </li>

                <li>
                  Aim to fool one sentence in each pair,
                  as it’s usually challenging to do so for both.
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(SocialComparisonNumeracyInstructions)
