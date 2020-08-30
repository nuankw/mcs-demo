import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Creation from './components/Creation'
import ExitSurvey from './components/ExitSurvey'
import Validation from './components/Validation'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


const REQUIRED_NUM_EVALUATIONS = 6
const EVAL_QUESTIONS = {
  'evalQ1': {
    'type': 'single',
    'answer': '',
  },
  'evalQ2': {
    'type': 'single',
    'answer': '',
  },
  'evalQ3': {
    'type': 'multiple',
    'answer': [],
  },
  'evalQ4': {
    'type': 'multiple',
    'answer': [],
  },
  'evalQ5': {
    'type': 'single',
    'answer': '',
  },
}


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
  header: {
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
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
})


class App extends React.Component {

  constructor(props) {
    super(props)

    const locationQuery = new URLSearchParams(window.location.search)
    const scenario = locationQuery.get('scenario')

    const evalQuestions = JSON.parse(JSON.stringify(EVAL_QUESTIONS))

    this.state = {
      processing: false,
      evaluated: false,
      openSurvey: false,
      enjoyment: null,
      returning: null,
      dataID: null,
      count: null,
      code: '',
      evalCount: 1,
      evalQuestions,
      scenario: scenario,
      prevInput: "will see previous input here",
      prevOptional: "This is an additional knowledge piece provided by the same annotator. We should be able to use this knowledge piece to infer the above statement.",
      prevOutput: null,
    }
  }

  componentDidMount() {
    this.fetchPrevTrial()
  }

  handleOpenSurvey() {
    this.setState({openSurvey: true})
  }

  handleCloseSurvey() {
    this.setState({openSurvey: false})
  }

  fetchPrevTrial() {
    const { scenario } = this.state
    return fetch(`/get_eval?scenario=${scenario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if ( data['status'] === 'ok' ) {
        this.setState({
          dataID: data['id'],
          prevInput: data['input'],
          prevOutput: data['output'],
          // prevOptional: data['optional'],

        })
      }
    })
  }

  getInputRef(inputRef) {
    this.inputField = inputRef
  }

  handleAnswer(question, value) {
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

  handleOnEval(question, selection) {
    const { dataID, evalQuestions } = this.state

    // support multiple choice answers
    const update = {...evalQuestions}
    if ( update[question].type === 'multiple' ) {
      const index = update[question]['answer'].indexOf(selection)
      if ( index >= 0 ) {
        update[question]['answer'].splice(index, 1)
      } else {
        if ( selection === 'none' ) {
          update[question]['answer'] = ['none']
        } else {
          update[question]['answer'] = (
            update[question]['answer'].filter(s => s !== 'none'))
          update[question]['answer'].push(selection)
        }
      }
    } else {
      update[question]['answer'] = selection
    }

    fetch('/set_eval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'dataID': dataID,
        'question': question,
        'answer': update[question]['answer'].toString(),
      }),
    })
    .then(response => response.json())
    .then(data => {
      if ( data['status'] === 'ok' ) {
        this.setState({'evalQuestions': update})
      }
    })
  }

  loadNextTrial() {
    const { evalCount } = this.state
    const evalQuestions = JSON.parse(JSON.stringify(EVAL_QUESTIONS))
    this.fetchPrevTrial()
    .then(
      this.setState({
        evalQuestions,
        evalCount: evalCount + 1,
      })
    )
  }

  render() {
    const { code, prevInput, prevOutput, prevOptional, openSurvey, scenario, evalCount, evalQuestions } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

          <CssBaseline />

          <ExitSurvey open={openSurvey}
            code={code}
            onAnswer={this.handleAnswer.bind(this)}
            onClose={this.handleCloseSurvey.bind(this)} />

          {/* TODO: change inputs */}
          {evalCount <= REQUIRED_NUM_EVALUATIONS ? (
            <Validation
              prevInput={prevInput}
              prevOutput={prevOutput}
              prevOptional={prevOptional}
              scenario={SCENARIOS[scenario]}
              evalCount={evalCount}
              requiredEval={REQUIRED_NUM_EVALUATIONS}
              evalQuestions={evalQuestions}
              loadNextTrial={this.loadNextTrial.bind(this)}
              handleOnEval={(q, s) => this.handleOnEval(q, s)} />
          ) : (
            <Creation scenario={SCENARIOS[scenario]} />
          )}

        </Container>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
