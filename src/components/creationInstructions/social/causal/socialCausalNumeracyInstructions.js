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


class SocialCausalNumeracyInstructions extends React.Component {

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
                <li style={{fontSize: '1.1em'}}>
                  <mark style={{backgroundColor: 'rgb(195, 195, 140)'}}>
                    <b>Numerical-Social = Social + Numeracy</b><br/>
                  </mark>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Social</b>:
                    Focuses on people and social behavior,
                    particularly attributes like personality,
                    emotions and actions.</span><br/>
                  <span style={{paddingLeft: '2em', display: 'inline-block'}}><b>Numeracy</b>:
                    Knowledge about numbers (magnitude),
                    simple arithmetic (add, multiply, etc.)
                    and concepts such as rates, percentages, probabilities, etc.</span>
                </li>
                <li style={{fontSize: '1.1em'}}>
                  <b>Cause & Effect</b>: Answers the “why” question or predicts what is likely to happen next (effect),
                    given an event that has occurred (cause).
                </li>
              </ul>

              <li className={classes.head}>
                  Examples
              </li>
              <ul>
                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Having invited <u>twenty</u> guests over for dinner,
                    he would be <b>overwhelmed</b> if they <u>all brought a plus one</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Having invited <u>twenty</u> guests over for dinner,
                    he would be <b>comfortable</b> if they <u>all brought a plus one</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    With <u>fifty</u> dollars in debt, he can plan to buy a new car immediately.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    With <u>fifty thousand</u> dollars in debt, he can plan to buy a new car immediately.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Expecting <u>twenty</u> people at her restaurant's opening,
                    Sara was <b>thrilled</b> to see <u>forty</u> customers.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Expecting <u>twenty</u> people at her restaurant's opening,
                    Sara was <b>disappointed</b> to see <u>two</u> customers.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    He will probably arrange for a babysitter,
                    when leaving his <u>three</u>-year-old at home.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    He will probably arrange for a babysitter,
                    when leaving his <u>fourteen</u>-year-old at home.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Sam is very underweight but wants to get fit,
                    so he would feel satisfied to
                    gain <u>twenty</u> pounds over an entire year.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Sam is very underweight but wants to get fit,
                    so he would feel satisfied to
                    gain <u>two</u> pounds over an entire year.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Given his <u>two-thousand</u>-dollar monthly income and no savings,
                    he <b>cannot</b> afford a housing rent of <u>two thousand</u> dollars.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Given his <u>two-thousand</u>-dollar monthly income and no savings,
                    he <b>can</b> afford a housing rent of <u>two thousand</u> dollars.
                </li>

              </ul>

              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  To generate both sentences of a pair, you can use an <b>antonym</b> and/or
                  change the <u>number</u>.
                </li>

                <li>
                  For a given pair, it’s usually challenging
                  to get a win on both sentences.
                </li>
              </ul>

            </ul>
          </Typography>

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(SocialCausalNumeracyInstructions)
