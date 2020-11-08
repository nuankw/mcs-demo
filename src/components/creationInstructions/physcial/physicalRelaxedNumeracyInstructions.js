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
                Domain & Scenario Recap (Updated!)
              </li>
              <ul>
                <li>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Numerical-Physical = Physical + Numeracy</b><br/>
                  </mark>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Physical</b>: Key aspects include the
                    knowledge of <u>daily objects</u> and their <u>physical properties</u> (e.g.
                    weight, size), <u>location & space</u>, <u>motion</u>, etc.<br/></span>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Numeracy</b>:
                    Knowledge about <u>numbers</u> (magnitude), <u>simple arithmetic</u> (add, multiply, etc.),
                    and concepts such as <u>rates, percentages, probabilities, conversions, etc</u>.</span>
                </li>

                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b style={{color: 'brown'}}>[NEW]</b> <b>Relaxed</b>: following either <b>cause & effect</b>, or <b>comparison</b> definition as below</mark>
                  <ul>
                    <li>
                      <b>Cause & Effect</b>: Answers the “why” question or predicts what is likely to happen next (effect),
                      given an event that has occurred (cause).
                      </li>
                    <li>
                      <b>Comparison</b>: Aims to compare two plausible reasons or concepts,
                      for a given daily event.
                    </li>
                  </ul>
               </li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True, Cause & Effect]</b>&nbsp;&nbsp;
                    As <u>five people</u> can carry the chest,
                    it should be <b>easier</b> for <u>eight people</u> to do so.
                  <br/><b style={{'color': 'darkred'}}>[False, Cause & Effect]</b>&nbsp;
                    As <u>five people</u> can carry the chest,
                    it should be <b>easier</b> for <u>two people</u> to do so.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True, Cause & Effect]</b>&nbsp;&nbsp;
                    As Jack wants to bring <u>two cans</u> of soda, he <b>can simply</b> carry it.
                  <br/><b style={{'color': 'darkred'}}>[False, Cause & Effect]</b>&nbsp;
                    As Jack wants to bring <u>fifty cans</u> of soda, he <b>can simply</b> carry it.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True, Cause & Effect]</b>&nbsp;&nbsp;
                    To protect the fragile glass,
                    it is <b>not a good idea</b> to put it <u>half-inch</u> away from the edge.
                  <br/><b style={{'color': 'darkred'}}>[False, Cause & Effect]</b>&nbsp;
                    To protect the fragile glass,
                    it is <b>better</b> to put it <u>just half-inch</u> away from the edge.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True, Comparison]</b>&nbsp;&nbsp;
                    Even if the maximum speed allowed is <u>50 miles per hour</u>,
                    it is <b>still riskier</b> to drive at <u>50 mph</u> than <u>30 mph</u> on a rainy day.
                  <br/><b style={{'color': 'darkred'}}>[False, Comparison]</b>&nbsp;
                    Even if the maximum speed allowed is <u>50 miles per hour</u>,
                    it is <b>still riskier</b> to drive at <u>30 mph</u> than <u>50 mph</u> on a rainy day.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True, Comparison]</b>&nbsp;&nbsp;
                    It is <b>more likely</b> to put off the burning blanket
                    with <u>10 gallons</u> of water than <u>one cup</u>.
                  <br/><b style={{'color': 'darkred'}}>[False, Comparison]</b>&nbsp;
                    It is <b>less likely</b> to put off the burning blanket
                    with <u>10 gallons</u> of water than <u>one cup</u>.
                </li>
              </ul>

              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  We relaxed the scenario requirement so that you can create more freely.
                  <br/>
                  <span style={{color: 'darkred'}}>In general, for each pair, we would like you to choose whichever scenario that provides better quality, i.e. no T/F ambiguity.</span>
                </li>

                <li>
                  As usual, we too find it hard (and often by luck)
                  to get a win in both sentences.
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
