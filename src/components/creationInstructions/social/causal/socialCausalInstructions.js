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


class SocialCausalInstructions extends React.Component {

  // ONLY A TEMPLATE
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
                  <b>Social</b></mark>: Focuses on <b><u>humans as social beings</u></b>: how poeple <b><u>think</u></b>, <b><u>feel</u></b>, <b><u>behave</u></b>, <b><u>communicate</u></b> and <b><u>interact</u></b> with each other.
                </li>
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}><b>Cause & Effect</b></mark>: Answers the <b><u>“Why”</u></b> question or <b><u>predicts</u></b> what is likely to happen
                next (<b><u>effect</u></b>), <b><u>given</u></b> an event that has occurred (<b><u>cause</u></b>).</li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  {/* A good driver would step on the <b>break</b>, if he or she saw a puppy crossing the road. */}
                  Even if there is no stop sign, a good driver should step on the <b>break</b> when there are people seemingly trying to cross over.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  {/* A good driver would step on the <b>gas</b>, if he or she saw a puppy crossing the road. */}
                  Even if there is no stop sign, a good driver should step on the <b>gas</b> when there are people seemingly trying to cross over.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  If two strangers often see each other at workplace, they are likely co-workers working in <b>different departments</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  If two strangers often see each other at workplace, they are likely co-workers working in the <b>same department</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  James is <b>reluctant</b> to lend his friends money as they seldom return.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  James is <b>willing</b> to lend his friends money as they seldom return.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Emily is a shy person so she decided to <b>accept</b> a shot of alcoholic before stepping up to argue with someone.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Emily is a shy person so she decided to <b>refuse</b> a shot of alcoholic before stepping up to argue with someone.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  As there is a mandatory stay at home order, a traffic jam <b>should not be expected</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  As there is a mandatory stay at home order, a traffic jam <b>is well expected</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  The demand for parenting <b>drops</b> as kids return to on-campus classes from online learning.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  The demand for parenting <b>increases</b> as kids return to on-campus classes from online learning.
                </li>

              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li>
                  The above examples and the two docs below (on topics and common verbs) can be helpful when you need some inspiration.
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(SocialCausalInstructions)
