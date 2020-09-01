import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import InputGroup from './InputGroup'
import Submit from './Submit'
import Instructions from './CreationInstruction'


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
  button: {
    color: 'white',
    borderColor: 'whitesmoke',
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
    fontSize: theme.spacing(3),
    color: "black",
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
          1: { input: 'default text 1.1', output: null, label: null },
          2: { input: 'default text 1.2', output: null, label: null },
          3: { input: '', output: null, label: null },
        },
        s2: {
          1: { input: 'default text 2.1', output: null, label: null },
          2: { input: 'default text 2.2', output: null, label: null },
          3: { input: '', output: null, label: null },
        },
        s3: {
          1: { input: 'default text 3.1', output: null, label: null },
          2: { input: 'default text 3.2', output: null, label: null },
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
        this.setState({
          dataID: data['id'],
          inputs: {
            s1: {...inputs.s1, output: data['s1']['output'], scores: data['s1']['scores']},
            s2: {...inputs.s2, output: data['s2']['output'], scores: data['s2']['scores']},
            s3: {...inputs.s3, output: data['s3']['output'], scores: data['s3']['scores']},
          },
        })
      })
    })
  }

  render() {
    const { inputs } = this.state
    const { classes, scenario } = this.props

    const tested = false

    return (
      <React.Fragment>

        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <span className={classes.title}>Part 2: Creation</span>
          <p className={classes.note}>NOTE: Please take 5 minutes to read this instruction carefully.
            We will have another user to examine your inputs {!!scenario && `about ${scenario}`} and will reject your HITs
            if you fail to provide inputs that are compliant with the instruction. {scenario}</p>
          <Instructions/>
        </Typography>

        <form className={classes.form} noValidate onSubmit={this.submit.bind(this)}>
          <Grid container spacing={3}>

            <Grid item xs={12} align="center">

              <div>
                <InputGroup
                  index='1'
                  inputs={inputs['s1']}
                  onChange={(inputs) => this.updateInputs('s1', inputs)}>
                </InputGroup>

                <InputGroup
                  index='2'
                  inputs={inputs['s2']}
                  onChange={(inputs) => this.updateInputs('s2', inputs)}>
                </InputGroup>

                <InputGroup
                  index='3'
                  inputs={inputs['s3']}
                  onChange={(inputs) => this.updateInputs('s3', inputs)}>
                </InputGroup>
              </div>

              <Grid container spacing={5}>
                <Grid item xs={6} align="left">
                  {<Submit type='submit' text='Test All' />}
                </Grid>
                <Grid item xs={6} align="right">
                  {<Submit type='button' text='Submit' disabled={!tested} />}
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
