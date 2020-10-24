import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import InputGroup from './InputGroup'
import Submit from './Submit'
import CreationInstructions from './CreationInstructions'


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
    color: "black",
  },
  subtitle: {
    align: "center",
    color: "#00000096",
    paddingLeft: theme.spacing(8),
    fontSize: theme.spacing(3.5),
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
          1: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          2: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          3: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
        },
        s2: {
          1: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          2: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          3: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
        },
        s3: {
          1: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          2: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
          3: { input: '', output: null, label: null, score: null, input_change_not_tested: false, },
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

  test(event, type) {
    event.preventDefault()
    const { inputs } = this.state
    this.setState({loading: true}, () => {
      this.postData(inputs).then(data => {
        this.setState({loading: false, inputs: {...data}})
      })
    })
  }

  checkInputs() {
    // return true to enable test button
    // which means we only return True / enable test button when:
    //  1. not all input_change_not_tested is false, and
    //  2. for those that input is not empty: label must be provided, and
    //  3. not all inputs are empty, and
    //  4. not loading
    const { inputs, loading } = this.state
    return (
      !Object.keys(inputs).every(key => (
        !inputs[key][1].input_change_not_tested
        && !inputs[key][2].input_change_not_tested
        // && !inputs[key][3].input_change_not_tested // we decided to not show model prediction for the optional sentence even if we include the optional piece
        )
      )
      && Object.keys(inputs).every(key => (
          (inputs[key][1].input === '' || (inputs[key][1].input !== '' && inputs[key][1].label !== null))
          && (inputs[key][2].input === '' || (inputs[key][2].input !== '' && inputs[key][2].label !== null))
        )
      )
      && !Object.keys(inputs).every(key => (
          inputs[key][1].input === ''
          && inputs[key][2].input === ''
        )
      )
      && !loading
    )
  }

  checkOutputs() {
    // return true to enable submit button
    // which means we only return True / enable submit button when:
    //  1. all input_change_not_tested is false, and
    //  2. all mandatory text fields are filled and all labels selected, and
    //  3. not loading
    const { inputs, loading } = this.state
    return (
      Object.keys(inputs).every(key => (
        !inputs[key][1].input_change_not_tested
        && !inputs[key][2].input_change_not_tested
        // && !inputs[key][3].input_change_not_tested // we decided to not show model prediction for the optional sentence even if we include the optional piece
        )
      )
      && Object.keys(inputs).every(key => (
        !!inputs[key][1].input && inputs[key][1].output !== null && inputs[key][1].label !== null
        && !!inputs[key][2].input && inputs[key][2].output !== null && inputs[key][2].label !== null
        )
      )
      && !loading
    )
  }

  render() {
    const { inputs } = this.state
    const { classes, scenario, domain, onSubmit } = this.props

    const testBtnDisabled = !this.checkInputs()
    const submitBtnDisabled = !this.checkOutputs()

    return (
      <React.Fragment>

        <Typography
          component="h3"
          variant="h3"
          className={classes.header}>
          <span className={classes.title}>Common Sense Reasoning -- Creation HIT </span>
          <br/>
          <span className={classes.subtitle}> For <u><b>{domain}</b></u> domain and <u><b>{scenario}</b></u> scenario </span>
          {/* subtitle margin/paddingBotton does not work when directly above Accordian? */}
          <p style={{'height': '12px', 'margin': '0px'}}></p>
          <CreationInstructions
            scenario={scenario}
            domain={domain} />
        </Typography>

        <form className={classes.form} noValidate onSubmit={this.test.bind(this)}>
          <Grid container spacing={3}>

            <Grid item xs={12} align="center">

              <div>
                <InputGroup
                  inputs={inputs['s1']}
                  onChange={(inputs) => this.updateInputs('s1', inputs)}>
                </InputGroup>

                <InputGroup
                  inputs={inputs['s2']}
                  onChange={(inputs) => this.updateInputs('s2', inputs)}>
                </InputGroup>

                <InputGroup
                  inputs={inputs['s3']}
                  onChange={(inputs) => this.updateInputs('s3', inputs)}>
                </InputGroup>
              </div>

              <Grid container>
                <Grid item xs={6} align="center">
                  {<Submit type='submit' text='Test Carl with what I have!' disabled={testBtnDisabled} />}
                </Grid>
                <Grid item xs={6} align="center">
                  {<Submit type='button' text='Inputs confirmed, submit!' disabled={submitBtnDisabled} onClick={(event) => onSubmit(event, inputs)}/>}
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
