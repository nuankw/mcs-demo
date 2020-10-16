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


class TimeComparisonInstruction extends React.Component {

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
                <li style={{fontSize: '1.2em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Time</b>: For now, we ask you to focus on knowledge
                    regarding <b><u>scheduling activities and their durations</u></b>.
                  </mark>
                </li>
                <li style={{fontSize: '1.2em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Comparison</b>: Aims to compare <b><u>two plausible
                    reasons or concepts</u></b>, for a <b><u>given situation</u></b>.
                  </mark>
                </li>
                  <span style={{paddingLeft: '1.5em', color: "brown"}}><b>
                    Notice that you must *specify a situation* and then
                    provide *both* comparing
                    concepts in *each* sentence!</b></span><br/>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Tim needs to return home <b>before lunch</b>, so he would prefer the <u>gym</u> in the morning rather than go <u>hiking</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Tim needs to return home <b>before lunch</b>, so he would prefer the <u>hiking</u> in the morning rather than going to the <u>gym</u>.
                    {/* <hr style={{margin:'2px',height:'1px',borderWidth:'0',backgroundColor:'black'}}/> */}
                </li>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since Helen wants to start earning in the <b>next few months</b>, she would prefer to start <u>freelancing</u> rather than a <u>PhD</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since Helen wants to start earning in the <b>next few months</b>, she would prefer to start a <u>PhD</u> rather than <u>freelancing</u>.
                    {/* <hr style={{margin:'2px',height:'1px',borderWidth:'0',backgroundColor:'black'}}/> */}
                </li>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Given that his must-watch TV show is about to broadcast in <b>a few minutes</b>, he would go out to <u>dispose of trash</u> instead of <u>walking the dog</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Given that his must-watch TV show is about to broadcast in <b>a few minutes</b>, he would go out to <u>walk the dog</u> instead of <u>disposing of trash</u>.
                </li>

              </ul>


              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>For a given pair, it’s usually challenging to get a win on both the sentences.</li>
                <li>To generate complements, you can simply <u>swap the entities</u>.</li>
              </ul>


            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(TimeComparisonInstruction)
