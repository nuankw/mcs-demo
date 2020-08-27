import React from 'react'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

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
    backgroundColor: '#51843c',
    color: "#ffffff",
    textTransform: "none",
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
    const { classes, scenario } = this.props
    return (
      <div className={classes.root}>
        <Accordion expanded={expanded} className={classes.accordion} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={this.toggle.bind(this)}
            aria-controls="panel1a-content"
            id="instructions">
            <Typography className={classes.heading}>Instruction on @TODO {scenario} creation</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
