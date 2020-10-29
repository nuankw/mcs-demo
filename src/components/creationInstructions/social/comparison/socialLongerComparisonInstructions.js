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


class SocialLongerComparisonInstructions extends React.Component {

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
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Social</b>: Focuses on social situations, behaviors and decisions.
                </mark></li>
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Comparison</b>: Aims to compare two plausible reasons or concepts,
                  for a given daily event.
                </mark><br/>Please refer to the examples below.</li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Both Mike and John are co-workers. Mike needs to spend time with his aging parents,
                  while John lives alone. Therefore, Mike is <b>less</b> likely to work overtime.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Both Mike and John are co-workers. Mike needs to spend time with his aging parents,
                  while John lives alone. Therefore, Mike is <b>more</b> likely to work overtime.
                </li>

                <hr style={{border: "1px solid rgb(128, 128, 128)"}}/>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Kyle wants to jump the queue at his office cafeteria,
                  since he needs to visit his friend in the emergency room.
                  Others will be more sympathetic if he <b>expresses</b> the reason.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Kyle wants to jump the queue at his office cafeteria,
                  since he needs to visit his friend in the emergency room.
                  Others will be more sympathetic if he <b>hides</b> the reason.
                </li>

                <hr style={{border: "1px solid rgb(128, 128, 128)"}}/>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Sam robbed a store in order to feed his child, while Tim murdered his wife over disagreements.
                  People will be more <b>forgiving</b> towards Sam.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Sam robbed a store in order to feed his child, while Tim murdered his wife over disagreements.
                  People will be more <b>chastising</b> towards Sam.
                </li>

                <hr style={{border: "1px solid rgb(128, 128, 128)"}}/>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Chad and Tom live in adjacent apartments.
                  Unlike Tom, Chad throws house parties every other night.
                  The house cleaning staff will probably find it easier working for <b>Tom</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Chad and Tom live in adjacent apartments.
                  Unlike Tom, Chad throws house parties every other night.
                  The house cleaning staff will probably find it easier working for <b>Chad</b>.
                </li>

                <hr style={{border: "1px solid rgb(128, 128, 128)"}}/>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Jock is a pilot and Rick is a truck driver,
                  so <b>Jock's work</b> is more likely to include foreign travel.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Jock is a pilot and Rick is a truck driver,
                  so <b>Rick's work</b> is more likely to include foreign travel.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Sara's son is in preschool whereas Jane's daughter is in college,
                  so <b>Sara</b> is more likely to send her child to daycare.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Sara's son is in preschool whereas Jane's daughter is in college,
                  so <b>Jane</b> is more likely to send her child to daycare.
                </li>
              </ul>

              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  Compare two people in different situations.
                </li>

                <li>
                  Writing <b>detailed & nuanced context</b>, makes it easier to fool.
                </li>

                <li>
                  <b>Avoid</b> direct usage of <b>emotions</b>, as they could be harder to fool.
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


export default withStyles(styles)(SocialLongerComparisonInstructions)
