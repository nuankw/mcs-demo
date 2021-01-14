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
                      <b>Happy New Year! Welcome to the 2021 version of our task!</b>

                      <br/><br/>In this section, we provide the details for the required domain &
                      scenario along with examples and other tips to better assist you with creation.

                      <br/><br/>For anyone who had fun with Carl in 2020, you must be wondering: has Carl become smarter in 2021?
                      <br/>Since we trained him on your previous inputs, he must have learned a bit.
                      However, we firmly believe there is still a longggg way to go for Carl, before he can really tell common sense and do reasoning with it.
                      <br/>Excited and ready to fool Carl? Welcome back :D

                      <p style={{'color':'darkred'}}>
                      Please notice that once you
                      click the "Inputs confirmed, submit!" button,
                      you <b>cannot</b> return to further edit your inputs. We will show an estimate
                      of <b>your lower bound earnings assuming no reduction</b> after you submit. </p>
                    </Typography>

                    {this.renderCategorySpecificInstruction(domain, scenario)}

                    <Typography style={{'marginBottom': '0px'}}>
                      <b>To Inspire Your Creativity</b>
                    </Typography>

                    <div className={classes.doDontsList}>
                      <ul>
                        <li style={{'paddingBottom': '0.4em'}}>Whenever you are not sure what to begin with or need some inspiration: here is a google doc summarizing the <a href="https://docs.google.com/document/d/1w77cjw7zOtzCzJwO6D0hrm67Wok8f7feb1s_3kIW558/edit" target="_blank" rel="noopener noreferrer">potential topics</a> for each domain.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Or, check out this  <a href="https://docs.google.com/document/d/18-pAgLNSCVFbcbP6xCCvH7GawRWUMQEJMDD8FjkDuTo/edit?usp=sharing" target="_blank" rel="noopener noreferrer">list of 700 common verbs with examples</a>. You may start sentence construction with any verb in this list.</li>
                        <li style={{'paddingBottom': '0.4em'}}>A rule of thumb: Imagine an 18-year-old English speaker from a different background: if he/she gets what your sentence is reasoning about -- then it is very likely to be within the coverage of common sense and thus accepted by us.</li>
                      </ul>
                    </div>

                    <Typography style={{'marginBottom': '0px'}}>
                      <b>Dos and Don'ts</b>
                    </Typography>

                    <div className={classes.doDontsList}>
                      <ul>
                        <li style={{'paddingBottom': '0.4em'}}>Please read the general instruction first.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Please ensure the sentences are grammatically correct (spelling check enabled in safari and firefox).</li>
                        <li style={{'paddingBottom': '0.4em'}}>Your input sentences should focus on common sense
                        such that most people can infer their correctness (T/F) without any ambiguity.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Each sentence pair should be about the same subject.</li>
                        <li style={{'paddingBottom': '0.4em'}}>For numeracy requirement: write numbers in the most common-sense way.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Be creative, avoid similar or repetitive sentence pairs.</li>
                        <li style={{'paddingBottom': '0.4em'}}>Here is <a href="https://docs.google.com/document/d/1whnqbU7DPL3VaWE2eJlbrM0RHP8GKjPgOoOCISZbtzs/edit?usp=sharing" target="_blank" rel="noopener noreferrer">a google doc</a> containing some of the Carl-fooling sentence pairs which we had to reduce their bonus.</li>
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