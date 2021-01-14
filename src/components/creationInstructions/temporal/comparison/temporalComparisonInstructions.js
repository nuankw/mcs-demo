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


class temporalComparisonInstructions extends React.Component {

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
               <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Time</b></mark>: Knowledge regarding
                    scheduling activities (<b>"when", "how often", "before/after", etc.</b>) and their typical durations (<b>"how long"</b>).
                    <br/><i style={{color: "brown"}}>For time domain, it is up to you whether to include numeracy or not.</i>
                </li>
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Comparison</b></mark>: Aims to compare <b><u>two plausible
                    reasons or concepts</u></b>, for <b><u>a given event or situation</u></b>.
                    <br/><i style={{color: "brown"}}>Notice that you must *specify an event/situation* and then
                    provide *both* comparing
                    concepts in *each* sentence!</i>
                </li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If the movie comes out <b>tomorrow</b>, she can make a plan to watch it <u>2 days</u> from now rather than <u>today</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If the movie comes out <b>tomorrow</b>, she can make a plan to watch it <u>today</u> rather than <u>2 days</u> from now.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    A building built <u>3 years ago</u> is likely to be more durable than a building that's <u>300 years old</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    A building built <u>300 years ago</u> is likely to be more durable than a building that's <u>3 years old</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Amy has a lot to catch-up with her colleague <b>after a long leave</b>, so she requested a <u>one-hour</u> instead of a <u>15-minute</u> slot for their meeting.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Amy would like to confirm with her colleague <b>on an easy decision</b>, so she requested a <u>one-hour</u> instead of a <u>15-minute</u> slot for their meeting.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Because Joe is attending a bachelor party <b>Friday night</b>, he wants to have an early breakfast with his mom on <u>Sunday</u> instead of <u>Saturday</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Because Joe is attending a bachelor party <b>Friday night</b>, he wants to have an early breakfast with his mom on <u>Saturday</u> instead of <u>Sunday</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Having to teach a <b>night class in thirty minutes</b>, he should heat a <u>frozen meal</u> instead of cooking a <u>three-course dinner</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Having to teach a <b>night class in thirty minutes</b>, he should cook a <u>three-course dinner</u> instead of heating a <u>frozen meal</u>.
                </li>
              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li className={classes.headExplanation}>
                  Swap <u>comparison</u> or change the <b>time setting</b>.
                </li>
                <li>
                  If you've done tasks on physical and social domains, notice that even though this time domain can heavily involve physical and/or social domain concepts, you have to <b>focus on their time aspects</b>!
                </li>
                <li>
                  The topic and verb lists below can be helpful when you need some inspiration.
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(temporalComparisonInstructions)
