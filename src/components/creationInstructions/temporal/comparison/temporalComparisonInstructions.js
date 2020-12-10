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
                <li style={{fontSize: '1.2em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Time</b>: Focuses on common sense
                    regarding <b><u>scheduling activities</u></b> and <b><u> temporal attributes</u></b> of those activities.
                  </mark>
                </li>
                <li style={{fontSize: '1.2em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Comparison</b>: Aims to compare <b><u>two plausible
                    reasons or concepts</u></b>, for <b><u>a given event or situation</u></b>.
                  </mark>
                </li>
                  <span style={{paddingLeft: '1.5em', color: "brown"}}><b>
                    Notice that you must *specify an event/situation* and then
                    provide *both* comparing
                    concepts in *each* sentence!</b></span><br/>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It is <span style={{color: "#003c64"}}><b>about dinner time</b> and I feel hungry</span>, so I will <u style={{color: "#3C7373"}}>start cooking in a few minutes</u> rather than <u style={{color: "#3C7373"}}>tomorrow</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  It is <span style={{color: "#003c64"}}><b>about dinner time</b> and I feel hungry</span>, so I will <u style={{color: "#3C7373"}}>start cooking tomorrow</u> rather than <u style={{color: "#3C7373"}}>in a few minutes</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since Jim must attend an <span style={{color: "#003c64"}}>in-person meeting <b>in the early afternoon</b></span>, he would reschedule his <u style={{color: "#3C7373"}}>flight at noon</u> instead of his <u style={{color: "#3C7373"}}>morning dentist appointment</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since Jim must attend an <span style={{color: "#003c64"}}>in-person meeting <b>in the morning</b></span>, he would reschedule his <u style={{color: "#3C7373"}}>flight at noon</u> instead of his <u style={{color: "#3C7373"}}>morning dentist appointment</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since Helen wants to <span style={{color: "#003c64"}}>start earning <b>in the next few months</b></span>, she would prefer to start <u style={{color: "#3C7373"}}>finding a job</u> rather than <u style={{color: "#3C7373"}}>applying for a PhD</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since Helen wants to <span style={{color: "#003c64"}}>start earning <b>in the next few months</b></span>, she would prefer to start <u style={{color: "#3C7373"}}>applying for a PhD</u> rather than <u style={{color: "#3C7373"}}>finding a job</u>.
                    {/* <hr style={{margin:'2px',height:'1px',borderWidth:'0',backgroundColor:'black'}}/> */}
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    With <span style={{color: "#003c64"}}>the gala starting <b>in half an hour</b></span>, Sara will <u style={{color: "#3C7373"}}>do a rushed hairstyle herself</u> rather than <u style={{color: "#3C7373"}}>visit a hairstylist</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    With <span style={{color: "#003c64"}}>the gala starting <b>in a few hours</b></span>, Sara will <u style={{color: "#3C7373"}}>do a rushed hairstyle herself</u> rather than <u style={{color: "#3C7373"}}>visit a hairstylist</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    To <span style={{color: "#003c64"}}>keep the audience interested in the <b>2-hour</b> show</span>,
                    it is better to <u style={{color: "#3C7373"}}>set
                    commercial breaks to appear every half an hour</u> than <u style={{color: "#3C7373"}}>every
                    other minute</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    To <span style={{color: "#003c64"}}>keep the audience interested in the <b>2-hour</b> show</span>,
                    it is better to <u style={{color: "#3C7373"}}>set
                    commercial breaks to appear every other minute</u> than <u style={{color: "#3C7373"}}>every
                    half an hour</u>.
                </li>
              </ul>


              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  To generate both sentences of a pair, you can change <span style={{color: "#003c64"}}><b>the time setting</b> in your specific event or situation</span>, or simply swap the <u style={{color: "#3C7373"}}>entities</u>.
                  <br/>
                  In general, please keep your specific event or situation consistent in a sentence pair.
                </li>
                <li>For a given pair, it’s usually challenging to get a win on both sentences.</li>
              </ul>


            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(temporalComparisonInstructions)
