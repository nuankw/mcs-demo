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
  'null': 'causality',
  's1': 'causality',
  's2': 'comparison',
  's3': 'numeracy',
}

const DOMAINS = {
  'null': 'physical',
  'd1': 'physical',
  'd2': 'social',
  'd3': 'temporal'
}

const styles = theme => ({
  '@global': {
    body: {
      background: 'rgba(78, 163, 191, 0.73)',
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
      code: '',
      openSurvey: false,
      mode: mode,
      scenario: scenario,
      domain: domain,
    }
  }

  handleCloseSurvey() {
    this.setState({openSurvey: false})
  }

  handleOnSwitch(mode) {
    this.setState({mode})
  }

  submit() {
    return new Promise((resolve, reject) => {
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }

  handleOnSubmit() {
    this.submit().then(data => {
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
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

          <CssBaseline />

          {mode === 'validation' ? (
            <ValidationExit open={openSurvey} code={code}
              onClose={this.handleCloseSurvey.bind(this)} />
          ) : (
            <CreationExitSurvey open={openSurvey} code={code}
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
