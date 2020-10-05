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


class SocialComparisonInstruction extends React.Component {

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
                  It's usually acceptable to arrive late to a party,
                  but not for a doctor's appointment.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  It's usually not acceptable to arrive late to a party,
                  but ok for a doctor's appointment.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    In order to educate their children,
                    they would prefer to visit a museum instead of a theme park.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    In order to educate their children,
                    they would prefer to visit a theme park instead of a museum.

                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    With no clean clothes left in the closet, they will prioritize visiting laundry instead of the supermarket.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    With no vegetables left at home, they will prioritize visiting laundry instead of the supermarket.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since they rarely host dinner parties, they are likely to rent instead of buying a barbecue grill.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since they often host dinner parties, they are likely to rent instead of buying a barbecue grill.
                </li>
              </ul>

              <li className={classes.head}>
                  Tips and Tricks
              </li>
              <ul>
                <li className={classes.headExplanation}>
                  To break the system as well as generate complementary samples,
                  you can modify the sentence with:
                </li>
                <ul>
                  <li>Negation</li>
                  <li>Swap</li>
                  <li>Plausibility-Qualifiers (e.g. sometimes, likely, rarely)</li>
                  <li>Contrasting-Conjuncts (e.g. unless, despite)</li>
                  <li>Distractors</li>
                </ul>

                <li>
                For a given pair, it’s usually challenging to get a win on both the sentences.
                </li>

              </ul>
            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(SocialComparisonInstruction)
