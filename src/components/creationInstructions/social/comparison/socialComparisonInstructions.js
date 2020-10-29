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


class SocialComparisonInstructions extends React.Component {

  // PILOT ROUND VERSION
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
                <li><b>Social</b>: Focuses on people and social behavior, particularly attributes like personality,
                  emotions and actions.</li>
                <li><b>Comparison</b>: Aims to compare two plausible reasons or concepts,
                  for a given daily event.</li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  It's usually <b>acceptable</b> to arrive late to <u>a party</u>,
                  but <b>not</b> for <u>a doctor's appointment</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  It's usually <b>not acceptable</b> to arrive late to <u>a party</u>,
                  but <b>ok</b> for <u>a doctor's appointment</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    In order to educate their children,
                    they would <b>prefer</b> to visit <u>a museum</u> <b>instead of</b> <u>a theme park</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    In order to educate their children,
                    they would <b>prefer</b> to visit <u>a theme park</u> <b>instead of</b> <u>a museum</u>.

                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    With no clean clothes left in the closet, they will <b>prioritize</b> <u>doing the laundry</u> <b>instead of</b> <u>going to the supermarket</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    With no clean clothes left in the closet, they will <b>prioritize</b> <u>going to the supermarket</u> <b>instead of</b> <u>doing the laundry</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    A person with a monthly income around <u>a thousand dollars</u> <b>cannot afford</b> a rent of <u>two thousand dollars</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    A person with a monthly income around <u>a thousand dollars</u> <b>can afford</b> a rent of <u>two thousand dollars</u>.
                </li>
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


export default withStyles(styles)(SocialComparisonInstructions)
