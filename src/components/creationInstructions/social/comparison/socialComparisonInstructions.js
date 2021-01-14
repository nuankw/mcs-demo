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


class SocialLongerComparisonInstructions extends React.Component {
  // PILOT ROUND VERSION
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
                  <b>Social</b></mark>: Focuses on <b><u>humans as social beings</u></b>: how poeple <b><u>think</u></b>, <b><u>feel</u></b>, <b><u>behave</u></b>, <b><u>communicate</u></b> and <b><u>interact</u></b> with each other.
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
                    <u>Susan</u> visits houses to deliver pizza, while <u>Jim</u> visits to fix plumbing, so <u>Jim</u> is more likely to be invited in.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    <u>Susan</u> visits houses to deliver pizza, while <u>Jim</u> visits to fix plumbing, so <u>Susan</u> is more likely to be invited in.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Leo is an animal rights activist, so he is more likely to bring his kids to <u>the natural museum</u> than <u>the dolphin show</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Leo is an animal rights activist, so he is less likely to bring his kids to <u>the natural museum</u> than <u>the dolphin show</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    <u>Sonja</u> is a violinist while <u>Dan</u> is in a rock band, so it makes sense that <u>Dan</u> knows more about guitar than <u>Sonja</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    <u>Sonja</u> is a violinist while <u>Dan</u> is in a rock band, so it makes sense that <u>Sonja</u> knows more about guitar than <u>Dan</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                  It's more likely for <u>Ben</u> to offer <u>Tim</u> a beverage rather than the other way around because <u>Tim</u> is visiting <u>Ben</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  It's more likely for <u>Tim</u> to offer <u>Ben</u> a beverage rather than the other way around because <u>Tim</u> is visiting <u>Ben</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    <u>Lily</u> and I were friends for years while I didn't know <u>Jane</u> much, so I hugged <u>Lily</u> and shook hands with <u>Jane</u> when we met.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    <u>Lily</u> and I were friends for years while I didn't know <u>Jane</u> much, so I shook hands with <u>Lily</u> and hugged <u>Jane</u> when we met.
                </li>

              </ul>

              <li className={classes.head}>
                  Tip(s)
              </li>
              <ul>
                <li>
                  Think about different social situations and reasons on how people would respond & behavior differently.
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


export default withStyles(styles)(SocialLongerComparisonInstructions)
