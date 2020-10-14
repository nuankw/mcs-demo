import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Creation from './components/Creation'
import CreationExitSurvey from './components/CreationExitSurvey'
import ValidationExit from './components/ValidationExit'
import Validation from './components/Validation'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


const SCENARIOS = {
  'null': 'cause-and-effect',
  's1': 'cause-and-effect',
  's2': 'comparison',
  's3': 'numeracy',
}

const DOMAINS = {
  'null': 'physical',
  'd1': 'physical',
  'd2': 'social',
  'd3': 'time',
  'd1_n': 'numerical-physical',
  'd2_n': 'numerical-social',
  'd3_n': 'numerical-time'
}

const styles = theme => ({
  '@global': {
    body: {
      background: 'rgba(78, 163, 191, 0.6)',
      backgroundSize: '100% 120%',
      padding: theme.spacing(3, 1),
      height: '100vh',
    },
  },
})


class App extends React.Component {

  constructor(props) {
    super(props)

    const locationQuery = new URLSearchParams(window.location.search)
    const mode = locationQuery.get('mode') // either 'validation' or 'creation'
    const scenario = locationQuery.get('scenario')
    const domain = locationQuery.get('domain')

    this.state = {
      code: '[ERROR: display code]',
      openSurvey: false,
      mode: mode,
      scenario: scenario,
      domain: domain,
      max_pay: "[ERROR: display max_possible_pay]",
    }
  }

  handleCloseSurvey() {
    this.setState({openSurvey: false})
  }

  submit(optionalInputs) {
    return new Promise((resolve, reject) => {
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'creationInputs': optionalInputs}),
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }

  handleOnSubmit(event, optionalInputs) {
    event.preventDefault()
    this.submit(optionalInputs).then(data => {
      this.setState({openSurvey: true, ...data})
    })
  }

  render() {
    const {
      code,
      mode,
      scenario,
      domain,
      openSurvey,
      max_pay,
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

          <CssBaseline />

          {mode === 'validation' ? (
            <ValidationExit
              open={openSurvey}
              code={code}
              onClose={this.handleCloseSurvey.bind(this)} />
          ) : (
            <CreationExitSurvey
              open={openSurvey}
              code={code}
              max_pay={max_pay}
              onClose={this.handleCloseSurvey.bind(this)} />
          )}

          {mode === 'validation' ? (
            <Validation onSubmit={this.handleOnSubmit.bind(this)} />
          ) : (
            <Creation
              scenario={SCENARIOS[scenario]}
              domain={DOMAINS[domain]}
              onSubmit={this.handleOnSubmit.bind(this)} />
          )}

        </Container>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
