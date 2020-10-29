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
                  <b>Physical</b>: Key aspects include the
                    knowledge of <u>daily objects</u> and their <u>physical properties</u> (e.g. weight, size), <u>location & space</u>, <u>motion</u>, etc.
                </mark></li>
                <li><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                  <b>Cause & Effect</b>: Answers the “why” question or predicts what is likely to happen next (effect),
                    given an event that has occurred (cause).
                </mark></li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since she didn't have a safety pin,
                    she could try to pierce the wrapper with a <b>pen</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since she didn't have a safety pin,
                    she could try to pierce the wrapper with a <b>bottle</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If we don't close that fence opening at the bottom,
                    an intruder could <b>climb over it</b>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If we don't close that fence opening at the bottom,
                    an intruder could <b>pass through it</b>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    If one can't locate a tissue box,
                    they can use a <b>newspaper</b> to wipe the litter on the dining table.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    If one can't locate a tissue box,
                    they can use a <b>wooden box</b> to wipe the litter on the dining table.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Because he <b>can</b> lift a bicycle, carrying a three-year-old
                    should not be difficult.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Because he <b>cannot</b> lift a bicycle, carrying a three-year-old
                    should not be difficult.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Sam's air conditioner is not working,
                    he <b>cannot</b> therefore use the refrigerator to keep his room cold.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Sam's air conditioner is not working,
                    he <b>can</b> therefore use the refrigerator to keep his room cold.
                </li>

              </ul>

              {/* <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  Please refer to the examples above to understand how to create samples fit in the
                  domain and scenario.
                </li>

                <li>
                  For a given pair, it’s usually challenging
                  to get a win on both sentences.
                </li>
              </ul> */}

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(PhysicalCausalInstructions)
