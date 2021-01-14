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
  newScenario: {
    backgroundColor: 'rgb(195, 195, 140)',
    fontSize: 'theme.spacing(12)'
  }
})


class PhysicalRelaxedNumeracyInstructions extends React.Component {

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
              <li>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}> <b>Numerical-Physical = Physical + Numeracy</b></mark><br/>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}>
                    <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}><b>Physical</b></mark>: Key aspects include the
                      knowledge of <u>daily objects</u> and their <u>physical properties</u> (e.g. weight,
                      size), <u>location & space</u>, <u>motion</u>, <u>natural
                      phenomena</u>, <u>physical matter</u>, <u>living creatures</u> and etc.
                  </span>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}>
                    <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}><b>Numeracy</b>:</mark> Knowledge
                    about <u>numbers</u> (magnitude), <u>simple arithmetic</u> (add, multiply, etc.),
                    and concepts such as <u>rates, percentages, probabilities, conversions, etc</u>.
                  </span>
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
                    As Jack wants to bring <u>two loose cans</u> of soda, he <b>can simply</b> carry them in hands.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    As Jack wants to bring <u>fifty loose cans</u> of soda, he <b>can simply</b> carry them in hands.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    To protect the fragile glass,
                    it is <b>not a good idea</b> to put it <u>half-inch</u> away from the edge.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    To protect the fragile glass,
                    it is <b>better</b> to put it <u>just half-inch</u> away from the edge.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    To consume <u>500 ml</u> of tea, one would require at least <u>five servings of a 100 ml</u> cup.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    To consume <u>200 ml</u> of tea, one would require at least <u>five servings of a 100 ml</u> cup.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Considering the drone can lift <u>upto four tennis balls</u>, it can certainly carry <u>three golf balls</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Considering the drone can lift upto <u>four tennis balls</u>, it can certainly carry <u>three bowling balls</u>.
                </li>

              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li>
                  You may start with adding numeracy to some physical concepts, then do causal & effect reasoning on top of that.
                </li>
                <li>
                  To generate both sentences of a pair, you can simply write the antonym, change the number value, or negate the sentence.
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


export default withStyles(styles)(PhysicalRelaxedNumeracyInstructions)
