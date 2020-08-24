import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  accordion: {
    backgroundColor: "rgba(240, 240, 240, 0.3)",
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
  },
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
          <Typography className={classes.heading}>Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <ol>
              <li>review 6 previous users inputs</li>
              <li>machine predictions are on the RIGHT side</li>
              <li>do this</li>
              <li>do this</li>
            </ol>
            <Button className={classes.got_it} style={{'cursor': 'pointer'}} onClick={() => setExpanded(!expanded)}>
              Got it!
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
