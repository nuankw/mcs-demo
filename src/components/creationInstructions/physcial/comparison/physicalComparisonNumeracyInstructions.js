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
                {/* <span style={{color: 'brown'}}>[Updated!! Please check] </span> */}
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
                    To protect the fragile glass, it is a <b>worse</b> idea to put it <u>half-inch</u> rather than <u>2-inch</u> away from the edge.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    To protect the fragile glass, it is a <b>better</b> idea to put it <u>half-inch</u> rather than <u>2-inch</u> away from the edge.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    With the wind blowing at 50 mph, it's better they <u>cancel</u> rather than <u>continue</u> the sailing tour.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    With the wind blowing at 50 mph, it's better they <u>continue</u> rather than <u>cancel</u> the sailing tour.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It is harder to run <u>one mile in 5 minutes</u> than <u>a half mile in 10 minutes</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    It is easier to run <u>one mile in 5 minutes</u> than <u>a half mile in 10 minutes</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Evelyn is <b>more</b> likely to drink <u>one cup</u> of milk with her cookie than <u>five cups</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Evelyn is <b>less</b> likely to drink <u>one cup</u> of milk with her cookie than <u>five cups</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It's easier to clean a <u>one-bedroom apartment</u> compared to a <u>four-bedroom house</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    It's easier to clean a <u>four-bedroom house</u> compared to a <u>one-bedroom apartment</u>.
                </li>
              </ul>

              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  You may start with simple physical-comparison creation, then add numeracy. Or, attach numeracy to some physical concepts then do comparison.
                </li>
                <li>
                  To generate both sentences of a pair, you can simply <u>swap the
                  entities</u>, change the numbers, or <b>reverse/negate the comparison words</b>.
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
