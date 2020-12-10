import React from 'react'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import PhysicalCausalInstructions from './creationInstructions/physcial/causal/physicalCausalInstructions'
import PhysicalComparisonInstructions from './creationInstructions/physcial/comparison/physicalComparisonInstructions'
import PhysicalRelaxedNumeracyInstructions from './creationInstructions/physcial/physicalRelaxedNumeracyInstructions'

import SocialCausalInstructions from './creationInstructions/social/causal/socialCausalInstructions'
import SocialLongerComparisonInstructions from './creationInstructions/social/comparison/socialLongerComparisonInstructions'
import SocialCausalNumeracyInstructions from './creationInstructions/social/causal/socialCausalNumeracyInstructions'
import SocialComparisonNumeracyInstructions from './creationInstructions/social/comparison/socialComparisonNumeracyInstructions'

import TimeCausalInstructions from './creationInstructions/temporal/causal/temporalCausalInstructions'
import TimeComparisonInstructions from './creationInstructions/temporal/comparison/temporalComparisonInstructions'

const styles = theme => ({
  root: {
    width: '100%',
  },
  accordion: {
    backgroundColor: "rgba(240, 240, 240, 0.3)",
    color: "#000000",
    // '&$expanded': {
        // margin: '0',
    // },
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
  },
  head: {
    fontWeight: 'bold',
  },
  got_it: {
    backgroundColor: 'transparent',
    color: "dark",
    textTransform: "none",
    '&:hover': {
      background: 'rgba(45, 184, 188, 0.6)',
      color: 'black',
    },
  },
  instructions: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(6),
  },
  doDontsList: {
    fontSize: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(6),
  },
})


class CreationInstructions extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      expanded: true,
    }
  }

  toggle() {
    const { expanded } = this.state
    this.setState({expanded: !expanded})
  }

  renderCategorySpecificInstruction(domain, scenario) {
    const domainScenarioInstructions = {
        'physical': {
          'cause-and-effect': <PhysicalCausalInstructions />,
          'comparison': <PhysicalComparisonInstructions />,
        },
        'numerical-physical': {
          'relaxed': <PhysicalRelaxedNumeracyInstructions/>,
        },
        'social': {
          'cause-and-effect': <SocialCausalInstructions />,
          'comparison': <SocialLongerComparisonInstructions />,
        },
        'numerical-social': {
          'cause-and-effect': <SocialCausalNumeracyInstructions />,
          'comparison': <SocialComparisonNumeracyInstructions />,
        },
        'time': {
          'cause-and-effect': <TimeCausalInstructions />,
          'comparison': <TimeComparisonInstructions />,
        },
      }
    return domainScenarioInstructions[domain][scenario]
  }

  render() {
    const { expanded } = this.state
    const { classes, scenario, domain, } = this.props
    return (
      <div className={classes.root}>
        <Accordion expanded={expanded} className={classes.accordion} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={this.toggle.bind(this)}
            aria-controls="panel1a-content"
            id="instructions"
            style={{'margin': '0px'}}>
            <Typography className={classes.heading}>Instructions</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container
              style={{'fontSize': '18px'}}>
                <Grid item xs={12}>
                  <div className={classes.instructions}>

                    <Typography>
                      <b>Welcome!</b> In this section, we provide the details for the domain &
                      scenario along with examples and other tips to better
                      assist you with this task. We will show an estimate
                      of your earnings after you submit. <p style={{'color':'darkred'}}>
                      Please notice that once you
                      click the "Inputs confirmed, submit!" button,
                      you <b>cannot</b> return to further edit your inputs.</p>
                    </Typography>

                    {this.renderCategorySpecificInstruction(domain, scenario)}

                    <Typography style={{'marginBottom': '0px'}}>
                      <b>Dos and Don'ts</b>
                    </Typography>

                    <div className={classes.doDontsList}>
                      <ul>
                        <li style={{'paddingBottom': '0.4em'}}>Please ensure the sentences are grammatically correct.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Your input sentences should focus on common sense
                        such that most people can infer their correctness (T/F) without any ambiguity.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Each sentence pair should be about the same subject.</li>
                        <li style={{'paddingBottom': '0.4em'}}>For numbers above 1000, please use word expressions
                        instead of digits (e.g. 15000 → fifteen thousand).</li>
                        <li style={{'paddingBottom': '0.4em'}}>Be creative, avoid similar or repetitive sentence pairs.</li>
                        <li><i><u>Failure to comply with these requirements could potentially result in a lower bonus payout!</u></i></li>
                      </ul>
                    </div>
                  </div>
              </Grid>

            </Grid>

          </AccordionDetails>


          <Button
            className={classes.got_it}
            variant="contained"
            style={{'cursor': 'pointer'}}
            onClick={this.toggle.bind(this)}>
              Got it? Click here to collapse the instruction and proceed!
            </Button>
        </Accordion>
      </div>
    )
  }
}


export default withStyles(styles)(CreationInstructions)