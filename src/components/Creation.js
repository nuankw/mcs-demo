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


  postData(inputs) {
    return new Promise((resolve, reject) => {
      const s1 = inputs.s1.value
      const s2 = inputs.s2.value
      fetch('/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({s1, s2}),
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }

  submit(event) {
    event.preventDefault()
    const { inputs } = this.state

    if ( !Object.keys(inputs).every(key => !!inputs[key].value) ) {
      return
    }

    this.setState({processing: true}, () => {
      this.postData(inputs).then(data => {
        this.setState({
          processing: false,
          dataID: data['id'],
          inputs: {
            s1: {...inputs.s1, output: data['s1']['output'], scores: data['s1']['scores']},
            s2: {...inputs.s2, output: data['s2']['output'], scores: data['s2']['scores']},
          },
        })
      })
    })
  }

  render() {
    const { classes, scenario } = this.props
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
                <InputGroup>
                </InputGroup>

                <InputGroup>
                </InputGroup>

                <InputGroup>
                </InputGroup>
              </div>

              {<Submit />}
            </Grid>

          </Grid>
        </form>

      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Creation)
