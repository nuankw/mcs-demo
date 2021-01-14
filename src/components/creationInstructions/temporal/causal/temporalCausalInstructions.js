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


class TemporalCausalInstructions extends React.Component {

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
                  <b>Cause & Effect</b></mark>: <u>Answers the “why” question</u> or <u>predicts what is likely to happen next</u> (<b>effect</b>),
                    given an event that has occurred (<b>cause</b>).
                </li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              {/* <span style={{'color': "darkblue"}}>
                The following examples are selected from inputs we received. We slightly editted some to make them all fit in time + casue & effct.
                <br/>Pleaes read and match them with the above definitions.
                <br/>They are provided to inspire you. Please do not copy them as your answer.
              </span> */}
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    As the <b>summer</b> is approaching, the nights become shorter.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    As the <b>winter</b> is approaching, the nights become shorter.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  I usually wake up around <b>8 am</b>, so I have <b>few</b> chances to see the sunrise.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  I usually wake up around <b>8 am</b>, so I have <b>many</b> chances to see the sunrise.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Peter planned to finish this project by the <b>end of this month</b> but got delayed,
                  so it's possible for him to set a new deadline to be the <b>end of next month</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Peter planned to finish this project by the <b>end of next month</b> but got delayed,
                  so he set a new deadline to be the <b>end of this month</b>.
                  <br/>(Yes, this pair falls into cause & effect scenario in our definition. The cause is a project delay and the effect is rescheduling.)
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  If you planted a bunch of trees with the intention of turning them into paper,
                  you will have to wait about <b>thirty years</b> for them to be ready.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  If you planted a bunch of trees with the intention of turning them into paper,
                  you will have to wait about <b>thirty weeks</b> for them to be ready.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Because it was <b>winter in Antarctica</b>,
                  I was able to keep my snowball outside on the porch for <b>thirty minutes</b> without melting.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Because it was <b>winter in Kenya</b>,
                  I was able to keep my snowball outside on the porch for <b>thirty minutes</b> without melting.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  <b>Not</b> expecting the <b>dinner to last for four hours</b>, Sally probably booked a taxi that leaves at <b>8 pm</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Expecting the <b>dinner to last for four hours</b>, Sally probably booked a taxi that leaves at <b>7 pm</b>.
                </li>


              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li className={classes.headExplanation}>
                  To generate both sentences of a pair, you can: change the <b>time setting</b> in the cause, and/or edit the effect as shown in the examples above.
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


export default withStyles(styles)(TemporalCausalInstructions)
