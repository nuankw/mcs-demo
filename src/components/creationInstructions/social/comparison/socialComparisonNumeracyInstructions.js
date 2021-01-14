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


class SocialComparisonNumeracyInstructions extends React.Component {

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
              <li style={{fontSize: '1.1em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Numerical-Social = Social + Numeracy</b><br/>
                  </mark>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Social</b></mark>: Focuses on <b><u>humans as social beings</u></b>: how poeple <b><u>think</u></b>, <b><u>feel</u></b>, <b><u>behave</u></b>, <b><u>communicate</u></b> and <b><u>interact</u></b> with each other.
                  </span>
                  <br/>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Numeracy</b></mark>:
                    Knowledge about <b><u>numbers (magnitude)</u></b>,
                    <b><u>simple arithmetic</u></b> (add, multiply, etc.)
                    and <b><u>concepts</u></b> such as rate, percentage, probability, etc.</span>
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
                  Jenny's <u>parents</u> earn $3,000 per month but need to spend $2,500 while her <u>grandparents</u> have a monthly income of $2,000 and only spend $500. Thus, Jenny is more likely to be indulged by her <u>grandparents</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Jenny's <u>parents</u> earn $3,000 per month but need to spend $2,500 while her <u>grandparents</u> have a monthly income of $2,000 and only spend $500. Thus, Jenny is more likely to be indulged by her <u>parents</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  A <u>7-year-old</u> is more likely to feel happy because of some candies he/she gets than a <u>12-year-old</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  A <u>12-year-old</u> is more likely to feel happy because of some candies he/she gets than a <u>7-year-old</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Enjoying <u>reading</u> much more than <u>playing games</u>, the boy decided to donate <u>20 video games</u> rather than <u>a single book</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Enjoying <u>playing games</u> much more than <u>reading</u>, the boy decided to donate <u>20 video games</u> rather than <u>a single book</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Not wanting to get separated with her family, she accepted the job <u>20 miles away</u> from home and declined the one <u>500 miles away</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Not wanting to get separated with her family, she accepted the job <u>500 miles away</u> from home and declined the one <u>20 miles away</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  <u>Sara manages 6 employees</u> while <u>Amenda manages 36</u>, so it is harder for <u>Amenda</u> to micro-manage than <u>Sara</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  <u>Sara manages 6 employees</u> while <u>Amenda manages 36</u>, so it is harder for <u>Sara</u> to micro-manage than <u>Amenda</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  Tim and Mary have two kids: <u>Peter at four</u> and <u>Samuel at fifteen</u>, so they are more comfortable leaving <u>Samuel</u> at home.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  Tim and Mary have two kids: <u>Peter at four</u> and <u>Samuel at fifteen</u>, so they are more comfortable leaving <u>Peter</u> at home.
                </li>

              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>

              <ul>
                <li>
                  You may start with simple social-comparison creation, then add numeracy. Or, attach numeracy to some social concepts then do comparison.
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


export default withStyles(styles)(SocialComparisonNumeracyInstructions)
