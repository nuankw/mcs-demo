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

    this.state = {
      openSurvey: false,
      enjoyment: null,
      returning: null,
      code: '',
      mode: 'validation',
      scenario: scenario,
    }
  }

  handleOpenSurvey() {
    this.setState({openSurvey: true})
  }

  handleCloseSurvey() {
    this.setState({openSurvey: false})
  }

  handleSurveyAnswer(question, value) {
    let update = {}
    update[question] = value
    this.setState({...update}, () => {
      const {enjoyment, returning} = this.state
      fetch('/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({enjoyment, returning}),
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

  handleOnSwitch(mode) {
    this.setState({mode})
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
            onAnswer={this.handleSurveyAnswer.bind(this)}
            onClose={this.handleCloseSurvey.bind(this)} />

          {mode === 'validation' ? (
            <Validation onSwitch={this.handleOnSwitch.bind(this)} />
          ) : (
            <Creation scenario={SCENARIOS[scenario]} />
          )}

        </Container>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
