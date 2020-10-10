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
                  Domain & Scenario Recap
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
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  <u>A steel bottle</u> might be <b>more</b> suitable than <u>a wooden box</u> for hammering.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  <u>A steel bottle</u> might be <b>less</b> suitable than <u>a wooden box</u> for hammering.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If you don't have a bowl, it's better to serve soup <u>in a cup</u> <b>rather than</b> <u>on a plate</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If you don't have a bowl, it's better to serve soup <u>on a plate</u> <b>rather than</b> <u>in a cup</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It's <b>more</b> convenient to use <u>a shirt</u> rather than <u>a tie</u>, as a dusting cloth.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    It's <b>less</b> convenient to use <u>a shirt</u> rather than <u>a tie</u>, as a dusting cloth.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It’s <b>easier</b> to climb over a <u>three feet</u> fence compared to a <u>six feet</u> one.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    It’s <b>easier</b> to climb over a <u>six feet</u> fence compared to a <u>three feet</u> one.
                </li>
              </ul>


              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>

                <li>
                  To generate complements, you can simply <u>swap the
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


export default withStyles(styles)(PhysicalComparisonInstruction)
