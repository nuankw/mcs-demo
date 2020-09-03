import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Creation from './components/Creation'
import ExitSurvey from './components/ExitSurvey'
import Validation from './components/Validation'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


const SCENARIOS = {
  'null': 'general',
  's1': 'negation',
  's2': 'active/passive expressions',
  's3': 'logic exist/all',
  's4': 'event temporal relation',
  's5': 'cultural common sense',
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
    const scenario = locationQuery.get('scenario')
    // const do_val = locationQuery.get('do_val')

    this.state = {
      code: '',
      openSurvey: false,
      // mode: 'not validation',
      mode: 'validation',
      scenario: scenario,
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
      openSurvey,
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

          <CssBaseline />

          <ExitSurvey open={openSurvey} code={code}
            onClose={this.handleCloseSurvey.bind(this)} />

          {mode === 'validation' ? (
            <Validation onSwitch={this.handleOnSwitch.bind(this)} />
          ) : (
            <Creation
              scenario={SCENARIOS[scenario]}
              onSubmit={this.handleOnSubmit.bind(this)} />
          )}

        </Container>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
