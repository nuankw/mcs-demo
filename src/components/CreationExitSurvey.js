import React from 'react'
import { Grid, Modal, Typography } from '@material-ui/core/'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import RadioButton from './RadioButton'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  root: {
    zIndex: 10,
    position: 'absolute',
    padding: theme.spacing(3, 3, 15, 3),
    '@media (min-width:600px)': {
      padding: theme.spacing(5),
      width: '60vw',
      left: '20vw',
      top: '20vh',
    },
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    background: 'rgb(34 60 95)',
    backgroundSize: '100% 150%',
    border: 0,
    borderRadius: 3,
    outline: 'none',
  },
  header: {
    color: '#fefefe',
  },
  code: {
    color: '#fefefe',
    textAlign: 'center',
    fontWeight: 'bolder',
  },
  content: {
    color: '#fefefe',
    fontSize: theme.spacing(2),
  },
  divider: {
    width: '100%',
    display: 'block',
    height: theme.spacing(2),
    borderBottom: '1px solid #fefefe',
    marginBottom: theme.spacing(2),
  },
  radioGroup: {
    color: 'white',
    display: 'inline',
  },
})


class CreationExitSurvey extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      commonsense: null,
      challenging: null,
    }
  }

  handleAnswer(question, value) {
    let update = {}
    update[question] = value
    this.setState({...update}, () => {
      const {commonsense, challenging} = this.state
      fetch('/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({commonsense, challenging}),
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          surveyComplete: true,
          ...data,
        })
      })
    })
  }

  render() {
    const { classes, open, code} = this.props
    const { commonsense, challenging} = this.state

    // disable the radio button and add a submit
    return (
      <Modal open={open}>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12}>
            <div className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.header}>
                Thank you for participating! <br/>Don't forget to copy this code to complete your HIT:
              </Typography>
              <Typography component="h5" variant="h5" className={classes.code}>
                {code}
              </Typography>
            </div>
            <span className={classes.divider} />
            <div className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.header}>
                Exit Survey
              </Typography>
              <p>How good do you think our model is at commonsense reasoning based on the model prediction you see?</p>
              <p>(from 1 being not good at all to 10 very good)</p>
              <RadioGroup name="q1" className={classes.radioGroup} onChange={(e, val) => this.handleAnswer('commonsense', val)}>
                <FormControlLabel value="1" control={<RadioButton />} label="1" />
                <FormControlLabel value="2" control={<RadioButton />} label="2" />
                <FormControlLabel value="3" control={<RadioButton />} label="3" />
                <FormControlLabel value="4" control={<RadioButton />} label="4" />
                <FormControlLabel value="5" control={<RadioButton />} label="5" />
                <FormControlLabel value="6" control={<RadioButton />} label="6" />
                <FormControlLabel value="7" control={<RadioButton />} label="7" />
                <FormControlLabel value="8" control={<RadioButton />} label="8" />
                <FormControlLabel value="9" control={<RadioButton />} label="9" />
                <FormControlLabel value="10" control={<RadioButton />} label="10" />
              </RadioGroup>
              <br/>
              <p>How challenging was it to fool the model?</p>
              <p>(from 1 being not challenging at all to 10 being very challenging)</p>
              <RadioGroup name="q1" className={classes.radioGroup}  onChange={(e, val) => this.handleAnswer('challenging', val)}>
                <FormControlLabel value="1" control={<RadioButton />} label="1" />
                <FormControlLabel value="2" control={<RadioButton />} label="2" />
                <FormControlLabel value="3" control={<RadioButton />} label="3" />
                <FormControlLabel value="4" control={<RadioButton />} label="4" />
                <FormControlLabel value="5" control={<RadioButton />} label="5" />
                <FormControlLabel value="6" control={<RadioButton />} label="6" />
                <FormControlLabel value="7" control={<RadioButton />} label="7" />
                <FormControlLabel value="8" control={<RadioButton />} label="8" />
                <FormControlLabel value="9" control={<RadioButton />} label="9" />
                <FormControlLabel value="10" control={<RadioButton />} label="10" />
              </RadioGroup>
              <br/>
              {(challenging !== null) && (commonsense !== null) && <p>Thanks! You may close this entire page and return back to the MTurk page now.</p> }
            </div>
          </Grid>
        </Grid>
      </Modal>
    )
  }
}


export default withStyles(styles)(CreationExitSurvey)
