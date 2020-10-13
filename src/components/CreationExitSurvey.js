import React from 'react'
import { Button, Grid, Modal, TextField, Typography } from '@material-ui/core/'
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
  input: {
    color: 'white',
    '& .MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
    '& .MuiFormControl-root.MuiTextField-root label': {
      color: '#fefefe',
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiFormLabel-root': {
      '@media (min-width:600px)': {
        fontSize: '1rem',
        opacity: 0.85,
      },
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root input': {
      '@media (min-width:600px)': {
        fontSize: '1.2rem',
      },
      color: '#fefefe',
      fontSize: '1.2rem',
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fefefe',
    },
  },
})


class CreationExitSurvey extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      comments: '',
      clear_instruction: null,
      challenging_creation: null,
    }
  }

  handleAnswer(question, value) {
    let update = {}
    update[question] = value
    this.setState({...update}, () => {
      const {clear_instruction, challenging_creation} = this.state
      fetch('/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({clear_instruction, challenging_creation}),
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

  handleOnChange(event) {
    const comments = event.target.value
    this.setState({comments})
  }

  handleOnSubmit() {
    const {comments, clear_instruction, challenging_creation} = this.state
    fetch('/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({clear_instruction, challenging_creation, comments}),
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        surveySubmitted: true,
        surveyComplete: true,
        ...data,
      })
    })
  }

  render() {
    const { classes, open, code, max_pay} = this.props
    const { comments, clear_instruction, challenging_creation, surveySubmitted } = this.state

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
              <Typography component="h5" variant="h5" className={classes.header}>
                Your estimated total earning (base + bonus) is ${max_pay} if all input is valid. <br/>
              </Typography>
            </div>
            <span className={classes.divider} />
            <div className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.header}>
                Exit Survey
              </Typography>
              <p style={{'fontSize': '20px', 'color': 'white'}}>Did you find our instructions to be helpful?</p>
              <p style={{'fontSize': '16px', 'color': 'gray'}}>(from 1 being not easy at all to 5 very easy)</p>
              <RadioGroup name="q1" className={classes.radioGroup} onChange={(e, val) => this.handleAnswer('clear_instruction', val)}>
                <FormControlLabel value="1" control={<RadioButton />} label="1" />
                <FormControlLabel value="2" control={<RadioButton />} label="2" />
                <FormControlLabel value="3" control={<RadioButton />} label="3" />
                <FormControlLabel value="4" control={<RadioButton />} label="4" />
                <FormControlLabel value="5" control={<RadioButton />} label="5" />
             </RadioGroup>
              <br/>
              <p style={{'fontSize': '20px', 'color': 'white'}}>How challenging was it to fool the model?</p>
              <p style={{'fontSize': '16px', 'color': 'gray'}}>(from 1 being not challenging at all to 5 very challenging)</p>
              <RadioGroup name="q1" className={classes.radioGroup}  onChange={(e, val) => this.handleAnswer('challenging_creation', val)}>
                <FormControlLabel value="1" control={<RadioButton />} label="1" />
                <FormControlLabel value="2" control={<RadioButton />} label="2" />
                <FormControlLabel value="3" control={<RadioButton />} label="3" />
                <FormControlLabel value="4" control={<RadioButton />} label="4" />
                <FormControlLabel value="5" control={<RadioButton />} label="5" />
              </RadioGroup>
              <br/>
              <div className={classes.input}>
                <p>(optional) any additional comments?</p>
                <TextField
                  id="outlined-basic"
                  value={comments}
                  label="Outlined"
                  variant="outlined"
                  onChange={(e) => this.handleOnChange(e)} />
              </div>
              <br/>
              <Button variant="contained"
                onClick={() => this.handleOnSubmit()}>
                Submit
              </Button>
              {surveySubmitted && <p>Your answers have been recorded.</p> }
              {(challenging_creation !== null) && (clear_instruction !== null) && <p>Thanks for the feedback!</p> }
            </div>
          </Grid>
        </Grid>
      </Modal>
    )
  }
}


export default withStyles(styles)(CreationExitSurvey)
