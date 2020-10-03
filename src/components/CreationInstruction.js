import React from 'react'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import PhysicalCausalInstruction from './creationInstructions/physicalCausalInstructions'
import PhysicalComparisonInstruction from './creationInstructions/physicalComparisonInstructions'
import PhysicalNumeracyInstruction from './creationInstructions/physicalNumeracyInstructions'
import SocialCausalInstruction from './creationInstructions/socialCausalInstructions'
import SocialComparisonInstruction from './creationInstructions/socialComparisonInstructions'
import SocialNumeracyInstruction from './creationInstructions/socialNumeracyInstructions'
import TimeCausalInstruction from './creationInstructions/temporalCausalInstructions'
import TimeComparisonInstruction from './creationInstructions/temporalComparisonInstructions'
import TimeNumeracyInstruction from './creationInstructions/temporalNumeracyInstructions'

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


class CreationInstruction extends React.Component {

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
    const domainScenarioInstruction = {
      'physical': {
        'cause-and-effect': <PhysicalCausalInstruction />,
        'comparison': <PhysicalComparisonInstruction />,
        'numeracy': <PhysicalNumeracyInstruction />,
      },
      'social': {
        'cause-and-effect': <SocialCausalInstruction />,
        'comparison': <SocialComparisonInstruction />,
        'numeracy': <SocialNumeracyInstruction />,
      },
    'time': {
        'cause-and-effect': <TimeCausalInstruction />,
        'comparison': <TimeComparisonInstruction />,
        'numeracy': <TimeNumeracyInstruction />,
      },
    }
  return domainScenarioInstruction[domain][scenario]
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
            <Typography className={classes.heading}>Instruction</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container
              style={{'fontSize': '18px'}}>
                <Grid item xs={12}>
                  <div className={classes.instructions}>

                    <Typography>
                      <b>Welcome!</b> Here we will provide the details for the Domain & Scenario
                      with examples, along with other tips to better assist you with this task.
                      For payment details please refer to the MTurk HIT instruction.
                      We will display an estimate of earning after you click submit button.
                      Please notice that once you clicked the "Submit" button,
                      you <b>cannot</b> return to further edit your inputs.
                    </Typography>

                    {this.renderCategorySpecificInstruction(domain, scenario)}

                    <Typography
                      component="h6"
                      variant="h6">
                      <b>Dos and Don'ts</b>:
                    </Typography>

                    <div className={classes.doDontsList}>
                      <ul>
                        <li>All generated statement pairs should be grammatically correct.</li>
                        <li>All generated statement pairs should be based on a common sense nature,
                          i.e. can be understood and reasonably infered T/F
                          by nearly all people without need for debate.</li>
                        <li>Each generated pair should be about the same subject.</li>
                        <li>Numeracy Scenario only: Please avoid Arabic numerals
                          or symbols and use English expressions instead.
                          e.g. $100 → One hundred dollars.</li>
                        <li>Please do not repeat any of your own statements
                          -- we have to reject assignment or reduce bonus if you do so!</li>
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


export default withStyles(styles)(CreationInstruction)