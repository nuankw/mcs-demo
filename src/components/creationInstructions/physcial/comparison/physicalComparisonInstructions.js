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


class PhysicalComparisonInstructions extends React.Component {

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
                  <b>Physical</b></mark>: Key aspects include the
                    knowledge of <u>daily objects</u> and their <u>physical properties</u> (e.g. weight,
                    size), <u>location & space</u>, <u>motion</u>, <u>natural
                    phenomena</u>, <u>physical matter</u>, <u>living creatures</u> and etc.
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
                  It's <b>better</b> to store ice-cream in a <u>freezer</u> rather than a <u>cooler</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                  It's <b>better</b> to store ice-cream in a <u>cooler</u> rather than a <u>freezer</u>.
                </li>


                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    Since he doesn't have a tray, it's better to use a <u>notebook</u> rather than a <u>sheet</u> to balance the glass bottles.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    Since he doesn't have a tray, it's better to use a <u>sheet</u> rather than a <u>notebook</u> to balance the glass bottles.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    As his roommate is asleep, he would prefer to <u>broom</u> rather than <u>vacuum</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    As his roommate is asleep, he would prefer to <u>vacuum</u> rather than <u>broom</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    It is <b>more dangerous</b> to go <u>inside a tiger enclosure</u> and observe him rather than standing <u>outside of his enclosure</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    It is <b>safer</b> to go <u>inside a tiger enclosure</u> and observe him rather than standing <u>outside of his enclosure</u>.
                </li>

                <li style={{'paddingBottom': '0.3em'}}>
                  <b style={{'color': 'darkgreen'}}>[True]</b>&nbsp;&nbsp;
                    One is <b>less</b> likely to wash their hands after eating a  <u>banana</u> rather than a <u>watermelon</u>.
                  <br/><b style={{'color': 'darkred'}}>[False]</b>&nbsp;
                    One is <b>more</b> likely to wash their hands after eating a <u>banana</u> rather than a <u>watermelon</u>.
                </li>

              </ul>


              <li className={classes.head}>
                  Tips & Tricks
              </li>

              <ul>
                <li>
                  To generate both sentences of a pair, you can simply <u>swap the
                  entities</u> or <b>reverse/negate the comparison words</b>.
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


export default withStyles(styles)(PhysicalComparisonInstructions)
