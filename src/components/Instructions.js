import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class DomainInstruction extends React.Component {

  render() {
    return (
      <Typography component="div">
            <h3>Domains</h3>
            <p>Refers to the type of knowledge, primarily categorized as social, physical and time domain.
              The three types are explained as follows:</p>
            <ul>
              <div>
                <li><u>Social</u>: It focuses on people and social behavior, particularly attributes like personality,
                  emotions and actions.</li>
                <div style={{paddingLeft: "2em"}}>
                  <p><i>e.g.</i> Sam being an orderly person, cannot withstand the litter in his kitchen. [True]</p>
                </div>
              </div>
              <div>
                <li><u>Physical</u>: Key aspects include the knowledge of objects, location, motion, etc.</li>
                <div style={{paddingLeft: "2em"}}>
                  <p><i>e.g.</i> If we spill over milk on the floor,
                    it’s better to clean it with a mop instead of a broom. [True]</p>
                </div>
              </div>
              <div>
                <li><u>Time</u>: Knowledge regarding scheduling activities and their durations.</li>
                <div style={{paddingLeft: "2em"}}>
                  <p><i>e.g.</i> Given the hour long queue at the entrance, we can't shop within minutes. [True]</p>
                </div>
              </div>
            </ul>
          </Typography>
    )
  }
}

class ScenarioInstruction extends React.Component {

  render() {
    return (
      <Typography component="div">
        <h3>Scenarios</h3>
        <p>Refers to the type of reasoning that sentence requires in order to assess its correctness (True/False).
          There are three types of scenarios as follows:</p>
        <ul>
          <div>
            <li><u>Cause & Effect</u>: It answers the “Why” question or predicts what is likely to happen next (effect),
              given an event that has occurred (cause).</li>
            <div>
              <p><i>e.g.</i> Given the hour long queue at the entrance (C), we can't shop within minutes (E). [True]</p>
            </div>
          </div>

          <div>
            <li><u>Comparison</u>: It aims to compare two plausible reasons or concepts, for a given daily event.</li>
            <div>
              <p><i>e.g.</i> If we spill over milk on the floor, it’s better to clean it with a mop instead of a broom. [True]</p>
            </div>
          </div>

          <div>
            <li><u>Numeracy</u>: It focuses on simple arithmetic skills (add, multiply, etc.)
              and concepts such as rate, percentage, probability, etc.</li>
            <div>
              <p><i>e.g.</i> Given his $1000 monthly income and no money in savings, a rent of $1500 raises the risk of facing an eviction. [True]</p>
            </div>
          </div>
        </ul>
      </Typography>
    )
  }
}

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: '#51843c',
    color: "#ffffff",
    textTransform: "none",
  }
}));

export default function Instructions() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded} className={classes.accordion} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1a-content"
          id="instructions">
          <Typography className={classes.heading}>Instruction</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <DomainInstruction />
            <ScenarioInstruction />
        </AccordionDetails>
        <Button className={classes.got_it} variant="contained" style={{'cursor': 'pointer'}} onClick={() => setExpanded(!expanded)}>
            Got it! Let's proceed.
          </Button>
      </Accordion>
    </div>
  );
}
