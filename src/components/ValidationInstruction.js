import React from 'react'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import { Grid } from '@material-ui/core'


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

  toggle() {
    const { expanded } = this.state
    this.setState({expanded: !expanded})
  }

  render() {
    const { expanded } = this.state
    const { classes, cost_per_assignment, samples_per_assignment, number_questions } = this.props
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
                      In this HIT, you will be required to answer a few multiple
                      choice questions for a given sentence
                      (similar to the Qualification Quiz HIT).
                    </Typography>

                    <Typography>
                      You will be paid {cost_per_assignment} to complete one assignment,
                      and validate {samples_per_assignment} sentences.
                    </Typography>

                    <Typography>
                      In summary, we have {number_questions} types of questions, described as follows:
                    </Typography>

                    <Typography component={'div'}>

                      <ul>
                        <li className={classes.question}>
                          Question 1: Do you think a given statement requires commonsense to infer True/False?
                        </li>
                        <p className={classes.questionExplanation}>
                          Here we ask you to assess whether the given sentence relies on everyday, common sense understanding or factual, specialized knowledge (in other words, not requiring common sense).<br/>
                          <u>Common sense</u>: Knowledge of common, everyday concepts and activities that people learn just from experience. <br/>
                          {/* Specialized:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Knowledge of subjects such as physics, biology, engineering, etc. as well as News events (current & historical). */}
                          <u>Specialized</u>: Knowledge of subjects such as physics, biology, engineering, etc. as well as News events (current & historical).<br/>
                          If the statement is indeed specialized, you can directly proceed to next validation or creation step. (Ding--Spammer detection on!)
                        </p>

                        <li className={classes.question}>
                          Question 2. Do you think this statement is True?
                        </li>
                        <p className={classes.questionExplanation}>
                          Easy! Just simply check if the given statement is True or False. If you find it hard to tell -- select False in Q1 and proceed to next!
                        </p>

                        <li className={classes.question}>
                          Question 3. Please select all the domains that you think this statement can be categorized into.
                        </li>
                        <p className={classes.questionExplanation}>
                          Scratching head to recall the definition of domains? Here you go:
                        </p>
                        <ul>
                          <li><u>Social</u>: It focuses on people and social behavior, particularly attributes like personality,
                            emotions and actions.</li>
                          <li><u>Physical</u>: Key aspects include the knowledge of daily objects, location, motion, etc.
                          Btw information about animals fits here too!
                          (we know this is controversial but let nature & non-artificial all be part of physical.)</li>
                          <li><u>Time</u>: Knowledge regarding scheduling activities and their durations.</li>
                        </ul>

                        <li className={classes.question}>
                          Question 4. Please select all the scenarios that you think this statement can be categorized into.
                        </li>
                        <p className={classes.questionExplanation}>
                          (You are welcome:D)
                        </p>
                        <ul>
                          <li><u>Cause & Effect</u>: It answers the “Why” question or predicts what is likely to happen next (effect),
                            given an event that has occurred (cause).</li>

                          <li><u>Comparison</u>: It aims to compare two plausible reasons or concepts, for a given daily event.</li>

                          <li><u>Numeracy</u>: It focuses on simple arithmetic skills (add, multiply, etc.)
                            and concepts such as rate, percentage, probability, etc.</li>
                        </ul>

                        <li className={classes.question}>
                          Question 5. Will the following knowledge piece help explain the above (actually, 'below' as you are reading this instruction :p) statement?
                        </li>
                        <p className={classes.questionExplanation}>
                          This question will only appear when an optional knowledge piece is provided along with the input statement.
                          We ask you to validate whether this piece of information can help decide True/False. <br/>
                          In other words, we are interested if the optional knowledge piece can assist with common sense reasoning on the given statement.
                        </p>
                      </ul>
                    </Typography>

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
