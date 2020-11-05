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
                  <b>Time</b>: Knowledge regarding
                    scheduling activities (<b>"when", "how often", "before/after", etc.</b>) and their typical durations (<b>"how long"</b>).
                </mark></li>

                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Cause & Effect</b>: <u>Answers the “why” question</u> or <u>predicts what is likely to happen next</u> (<b>effect</b>),
                    given an event that has occurred (<b>cause</b>).
                </mark></li>
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
                    As she has to be at work <b> in 3 minutes</b>,
                    she <b>does not</b> have time for coffee.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    As she has to be at work <b> in an hour</b>,
                    she <b>does not</b> have time for coffee.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since Tim has to pick up his kid <b> in 10 minutes</b>,
                    he will start cooking dinner <b>when they get home</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since Tim has to pick up his kid <b> in 10 minutes</b>,
                    he will start cooking dinner <b>now</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Because the popcorn has been sitting in the maker <b>for two hours</b>,
                    it will be <b>cold</b> by the time you eat it.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Because the popcorn has been sitting in the maker <b>for two hours</b>,
                    it will be <b>hot</b> by the time you eat it.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Sonja had a job interview,
                    so she dressed up professionally <b>before</b> the interview.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Sonja had a job interview,
                    so she dressed up professionally <b>after</b> the interview.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    The GPS shows taking back roads will take <b>20 minutes</b> and I want to stop for food,
                    so I can make it in time for the game in <b>10 minutes</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    The GPS shows taking back roads will take <b>5 minutes</b> and I want to stop for food,
                    so I can make it in time for the game in <b>20 minutes</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Because the flowers bloom <b>in July</b>,
                    I will plant the seeds <b>in March</b> to give them time to grow.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Because the flowers bloom <b>in July</b>,
                    I will plant the seeds <b>in July</b> to give them time to grow.
                </li>


              </ul>

              <li className={classes.head}>
                  Tips and Tricks
              </li>

              <ul>
                <li className={classes.headExplanation}>
                  To generate both sentences of a pair, you can: change the <b>time setting</b> in the cause, and/or edit the effect as shown in the examples above.

                </li>

                <li>
                  For a given pair, it’s usually challenging to get a win on both sentences.
                  However, for this specific domain + scenario we found ourselves able to fool in both sentences a bit more often.
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
