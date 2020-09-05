import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import InputGroup from './InputGroup'
import Submit from './Submit'
import CreationInstruction from './CreationInstruction'


const styles = theme => ({
  '@global': {
    body: {
      background: 'rgba(104, 159, 56, 0.6)',
      backgroundSize: '100% 120%',
      padding: theme.spacing(3, 1),
      height: '100vh',
    },
  },
  header: {
    color: '#fefefe',
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    backgroundColor: 'rgba(254, 254, 254, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  underlined: {
    textDecoration: 'underline',
  },
  title: {
    marginBottom: "10px",
    align: "center",
    color: "black",
  },
  note: {
    fontSize: theme.spacing(2.8),
    color: "#8b341d",
    fontWeight: "bold",
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
})



class Creation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputs: {
        s1: {
          1: { input: '', output: null, label: null },
          2: { input: '', output: null, label: null },
          3: { input: '', output: null, label: null },
        },
        s2: {
          1: { input: '', output: null, label: null },
          2: { input: '', output: null, label: null },
          3: { input: '', output: null, label: null },
        },
        s3: {
          1: { input: '', output: null, label: null },
          2: { input: '', output: null, label: null },
          3: { input: '', output: null, label: null },
        },
      },
    }
  }

  updateInputs(id, input) {
    const inputs = {...this.state.inputs}
    inputs[id] = {...inputs[id], ...input}
    this.setState({inputs})
  }

  postData(inputs) {
    return new Promise((resolve, reject) => {
      fetch('/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }

  submit(event) {
    event.preventDefault()
    const { inputs } = this.state
    this.setState({loading: true}, () => {
      this.postData(inputs).then(data => {
        this.setState({loading: false, inputs: {...data}})
      })
    })
  }

  checkInputs() {
    const { inputs } = this.state
    return Object.keys(inputs).every(key =>
      (!inputs[key][1].input && !inputs[key][2].input) ||
      (!!inputs[key][1].input && !!inputs[key][2].input && inputs[key][1].label !== null)
    ) && !Object.keys(inputs).every(key => !inputs[key][1].input && !inputs[key][2].input)
  }

  checkOutputs() {
    const { inputs } = this.state
    return Object.keys(inputs).every(key =>
      (!!inputs[key][1].input && inputs[key][1].output !== null)
    )
  }

  render() {
    const { inputs, loading } = this.state
    const { classes, scenario, domain, onSubmit, cost_per_assignment, samples_per_assignment } = this.props

    const testBtnDisabled = !this.checkInputs()
    const submitBtnDisabled = !this.checkOutputs()

    return (
      <React.Fragment>

        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <span className={classes.title}>Part 2: Creation</span>
          <p className={classes.note}>NOTE: Please take 5 minutes to read this instruction carefully.
            We will have another user to examine your inputs {!!scenario && `about ${scenario} scenario`} and will reject your HITs
            if you fail to provide inputs that are compliant with the instruction.</p>
          <CreationInstruction
            scenario={scenario}
            domain={domain}
            cost_per_assignment={cost_per_assignment}
            samples_per_assignment={samples_per_assignment}/>
        </Typography>

        <form className={classes.form} noValidate onSubmit={this.submit.bind(this)}>
          <Grid container spacing={3}>

            <Grid item xs={12} align="center">

              <div>
                <InputGroup
                  loading={loading}
                  inputs={inputs['s1']}
                  onChange={(inputs) => this.updateInputs('s1', inputs)}>
                </InputGroup>

                <InputGroup
                  loading={loading}
                  inputs={inputs['s2']}
                  onChange={(inputs) => this.updateInputs('s2', inputs)}>
                </InputGroup>

                <InputGroup
                  loading={loading}
                  inputs={inputs['s3']}
                  onChange={(inputs) => this.updateInputs('s3', inputs)}>
                </InputGroup>
              </div>

              <Grid container>
                <Grid item xs={6} align="center">
                  {<Submit type='submit' text='Test what I got!' disabled={testBtnDisabled} />}
                </Grid>
                <Grid item xs={6} align="center">
                  {<Submit type='button' text='Inputs confirmed, submit!' disabled={submitBtnDisabled} onClick={onSubmit}/>}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </form>

      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Creation)
