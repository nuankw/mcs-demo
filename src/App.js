import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import scramble from './utils/scramble'
import Creation from './components/Creation'
import ExitSurvey from './components/ExitSurvey'
import Validation from './components/Validation'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


const MIN_NUM_TRIALS = 6
const REQUIRED_NUM_EVALUATIONS = 6
const EVAL_QUESTIONS = ['evalQ1', 'evalQ2', 'evalQ3', 'evalQ4']


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
      background: 'rgba(104, 159, 56, 0.6)',
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

    const s1_value = 'roses are red'
    const s2_value = 'roses are blue'

    this.state = {
      processing: false,
      evaluated: false,
      openSurvey: false,
      enjoyment: null,
      returning: null,
      openRules: false,
      dataID: null,
      progress: 0,
      count: null,
      code: '',
      evalCount: 1,
      evalQuestions: EVAL_QUESTIONS,
      scenario: scenario,
      inputs: {
        s1: {
          id: 's1',
          name: 's1',
          label: 'input 1',
          changed: true,
          value: s1_value,
          output: null,
          scores: null,
        },
        s2: {
          id: 's2',
          name: 's2',
          label: 'input 2',
          changed: true,
          value: s2_value,
          output: null,
          scores: null,
        },
      },
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

  handleOpenRules() {
    this.setState({openRules: true})
  }

  handleCloseRules() {
    this.setState({openRules: false})
  }

  handleUpdate(id, value) {
    let inputs = {...this.state.inputs}
    inputs[id] = {...inputs[id], value, changed: true}
    this.setState({inputs}, () => {
      const count = Object.keys(inputs).reduce((c, id) => {
        return c + (+inputs[id]['changed'])
      }, 0)
      if ( count === 1 ) {
        Object.keys(inputs).forEach(id => {
          if ( !inputs[id].changed ) {
            inputs[id] = {...inputs[id], value}
            this.setState({inputs})
          }
        })
      }
    })
  }

  setInputDefaults() {
    const { inputs, scenario } = this.state

    let s1_value = 'roses are red'
    let s2_value = 'roses are blue'

    if ( scenario === 's1' ) {
      s1_value = 'Basketball is not non-sports'
      s2_value = 'Singing is not non-sports'
    }
    if ( scenario === 's2' ) {
      s1_value = 'Cars are manufactured by factory workers'
      s2_value = 'Factory workers are manufactured by cars'
    }
    if ( scenario === 's3' ) {
      s1_value = 'Some fish are mammals'
      s2_value = 'All fish are mammals'
    }
    if ( scenario === 's4' ) {
      s1_value = 'We have lunch before dinner'
      s2_value = 'We have dinner before lunch'
    }
    if ( scenario === 's5' ) {
      s1_value = 'Sushi is Japanese food'
      s2_value = 'Tofu is American food'
    }

    this.setState({
      inputs: {
        s1: {...inputs.s1, value: s1_value},
        s2: {...inputs.s2, value: s2_value},
      }
    })
  }

  fetchPrevTrial() {
    const { inputs, scenario } = this.state
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
          inputs: {
            s1: {...inputs.s1, value: data['s1']['input'], output: data['s1']['output'], scores: data['s1']['scores']},
            s2: {...inputs.s2, value: data['s2']['input'], output: data['s2']['output'], scores: data['s2']['scores']},
          },
        })
      }
    })
  }

  scrambleText() {
    const { inputs } = this.state
    this.setState({
      inputs: {
        s1: {...inputs.s1, value: scramble(inputs.s1.value)},
        s2: {...inputs.s2, value: scramble(inputs.s2.value)},
      }
    })
  }

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
      this.interval = setInterval(this.scrambleText.bind(this), 50)
      this.postData(inputs).then(data => {
        clearInterval(this.interval)
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

  getInputRef(inputRef) {
    this.inputField = inputRef
  }

  handleEvaluate(evaluation) {
    const { dataID } = this.state
    if ( !dataID ) { return }
    fetch('/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({dataID, evaluation}),
    })
    .then((response) => response.json())
    .then((data) => {
      let progress = 0
      if ( !!data['count'] ) {
        progress = Math.min(Math.round(data['count'] / MIN_NUM_TRIALS * 100), 100)
      }
      this.setState({
        evaluated: true,
        count: data['count'],
        progress: progress,
        code: data['code']
      })
    })
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

  handleOnEval(question, answer) {
    const { dataID, evalQuestions, evalCount } = this.state

    fetch('/set_eval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'dataID': dataID,
        'question': question,
        'answer': answer,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if ( data['status'] === 'ok' ) {
        const updatedQuestions = evalQuestions.filter(q => q !== question)
        if ( !updatedQuestions.length ) {
          this.fetchPrevTrial()
          .then(
            this.setState({
              evalCount: evalCount + 1,
              evalQuestions: EVAL_QUESTIONS,
            })
          )
        } else{
          this.setState({
            evalQuestions: updatedQuestions,
          })
        }
      }
    })
  }

  clearInputs() {
    const { inputs } = this.state
    inputs.s1 = {...inputs.s1, value: '', changed: false, output: null, scores: null}
    inputs.s2 = {...inputs.s2, value: '', changed: false, output: null, scores: null}
    this.setState({dataID: null, evaluated: false, inputs}, () => {
      this.inputField.focus()
    })
  }

  render() {
    const { classes } = this.props
    const { code, inputs, openSurvey, progress, scenario, evalCount, evalQuestions } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

          <CssBaseline />

          <ExitSurvey open={openSurvey}
            code={code}
            onAnswer={this.handleAnswer.bind(this)}
            onClose={this.handleCloseSurvey.bind(this)} />

          {evalCount <= REQUIRED_NUM_EVALUATIONS ? (
            <Validation
              inputs={inputs}
              scenario={SCENARIOS[scenario]}
              evalCount={evalCount}
              evalQuestions={evalQuestions}
              handleOnEval={(q, a) => this.handleOnEval(q, a)} />
          ) : (
            <Creation
              scenario={SCENARIOS[scenario]}
            />
          )}

        </Container>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
