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
import PhysicalCausalNumeracyInstructions from './creationInstructions/physcial/causal/physicalCausalNumeracyInstructions'
import PhysicalComparisonInstructions from './creationInstructions/physcial/comparison/physicalComparisonInstructions'
import PhysicalComparisonlNumeracyInstructions from './creationInstructions/physcial/comparison/physicalComparisonNumeracyInstructions'

import SocialCausalInstructions from './creationInstructions/social/causal/socialCausalInstructions'
import SocialCausalNumeracyInstructions from './creationInstructions/social/causal/socialCausalNumeracyInstructions'
import SocialComparisonInstructions from './creationInstructions/social/comparison/socialComparisonInstructions'
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
  question: {
    fontWeight: 'bold',
  },
  questionExplanation: {
    padding: '0em 8em 0em 2em',
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.8),
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
  }
})


class ValidationInstruction extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      expanded: true,
    }
  }

  renderCategorySpecificInstruction(domain, scenario) {
    const domainScenarioInstructions = {
        'physical': {
          'cause-and-effect': <PhysicalCausalInstructions />,
          'comparison': <PhysicalComparisonInstructions />,
        },
        'numerical-physical': {
          'cause-and-effect': <PhysicalCausalNumeracyInstructions/>,
          'comparison': <PhysicalComparisonlNumeracyInstructions/>,
        },
        'social': {
          'cause-and-effect': <SocialCausalInstructions />,
          'comparison': <SocialComparisonInstructions />,
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

  toggle() {
    const { expanded } = this.state
    this.setState({expanded: !expanded})
  }

  render() {
    const { expanded } = this.state
    const { classes, domain, scenario } = this.props
    return (
      <div className={classes.root}>
        <Accordion expanded={expanded} className={classes.accordion} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={this.toggle.bind(this)}
            aria-controls="panel1a-content"
            id="instructions"
            style={{'margin': '0px'}}>
            <Typography className={classes.heading}>Instruction</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container
              style={{'fontSize': '18px'}}>
                <Grid item xs={12}>
                  <div className={classes.instructions}>
                    {this.renderCategorySpecificInstruction(domain, scenario)}
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


export default withStyles(styles)(ValidationInstruction)
