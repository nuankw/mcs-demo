import React from 'react'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import DomainInstructions from './DomainInstructions'
import ScenarioInstructions from './ScenarioInstructions'
import { Grid } from '@material-ui/core'


const styles = theme => ({
  root: {
    width: '100%',
  },
  accordion: {
    backgroundColor: "rgba(240, 240, 240, 0.3)",
    color: "#000000",
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
  },
  got_it: {
    backgroundColor: 'transparent',
    color: "dark",
    textTransform: "none",
    '&:hover': {
      background: 'rgba(45, 184, 188, 0.6)',
      color: 'black',
    },
    instructions: {
      display: 'flex',
    }
  }
})


class Instructions extends React.Component {

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
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Accordion expanded={expanded} className={classes.accordion} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={this.toggle.bind(this)}
            aria-controls="panel1a-content"
            id="instructions">
            <Typography className={classes.heading}>Instruction</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container
              style={{'fontSize': '18px'}}>
                <Grid item xs={12}>
                  <div className={classes.instructions}>
                    <p>In this HIT, you will be required to answer a few multiple
                        choice questions for a given sentence
                        (similar to the Qualification Quiz HIT).</p>
                    <p>You will be paid Cost_per_Assign to complete one assignment,
                      and validate Samples_per_Assign sentences.</p>
                    <p>In summary, we have 4 (or 5) types of questions, described as follows:</p>

                    <ol>
                      <li>
                        To assess whether the given sentence relies on everyday, common sense understanding OR factual, specialized knowledge.
                        Commonsense: Knowledge of common, everyday concepts and activities that people learn just from experience.
                        Specialized: Knowledge of subjects such as physics, biology, engineering, etc. as well as News events (current & historical).

                      </li>

                      <li>
                        Simply check if the given statement is True or False.
                      </li>

                      <li>
                        placeholder
                      </li>

                      <li>
                        placeholder
                      </li>

                      <li>
                        placeholder
                      </li>

                    </ol>

                  </div>
              </Grid>

              <Grid item xs={6}>
                <DomainInstructions />
              </Grid>

              <Grid item xs={6}>
                <ScenarioInstructions />
              </Grid>
            </Grid>

          </AccordionDetails>


          <Button
            className={classes.got_it}
            variant="contained"
            style={{'cursor': 'pointer'}}
            onClick={this.toggle.bind(this)}>
              Got it! Let's proceed.
            </Button>
        </Accordion>
      </div>
    )
  }
}


export default withStyles(styles)(Instructions)
