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


class PhysicalCausalInstructions extends React.Component {

  // ONLY A TEMPLATE
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
                  <b>Physical</b></mark>: Key aspects include the
                    knowledge of <u>daily objects</u> and their <u>physical properties</u> (e.g. weight,
                    size), <u>location & space</u>, <u>motion</u>, <u>natural
                    phenomena</u>, <u>physical matter</u>, <u>living creatures</u> and etc.
                </li>
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Cause & Effect</b></mark>: Answers the “why” question or predicts what is likely to happen next (effect),
                    given an event that has occurred (cause).
               </li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If you touch a non-LED light bulb that's been turned <b>on</b> for hours, it will feel hot.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If you touch a light bulb that's been turned <b>off</b> for hours, it will feel hot.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    While in a windy rainstorm, you should always point your umbrella <b>into the wind</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    While in a windy rainstorm, you should always point your umbrella <b>away from the wind</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If my sink clogs with debris, I might be able to unclog it by twirling a long <b>chopstick</b> in there to dislodge it.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If my sink clogs with debris, I might be able to unclog it by twirling a long <b>hair</b> in there to dislodge it.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If it is dark outside, opening the blinds <b>will not</b> help you see.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If it is dark outside, opening the blinds <b>will</b> help you see.
                </li>
              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li>
                  To generate both sentences of a pair, you can simply find a <b>contradictory physical concept</b>, or <b>negate the sentence</b>.
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


export default withStyles(styles)(PhysicalCausalInstructions)
