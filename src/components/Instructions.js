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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function Instructions() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1a-content"
          id="instructions">
          <Typography className={classes.heading}>Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol>
              <li>do this</li>
              <li>do this</li>
              <li>do this</li>
              <li>do this</li>
              <li>do this</li>
            </ol>
            <a style={{'cursor': 'pointer'}} onClick={() => setExpanded(!expanded)}>
              Hide the instruction
            </a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
