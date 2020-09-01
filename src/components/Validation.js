import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import Output from './Output'
import UserEval from './UserEval'
import Instructions from './ValidationInstruction'

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


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
  nextButton: {
    color: 'white',
    background: 'rgba(48, 57, 139, 0.6)', // TODO
    fontSize: theme.spacing(2.8),
    margin: theme.spacing(2, 3),
    padding: theme.spacing(1.5, 6),
    textTransform: "none",
    '&:hover': {
      background: 'rgba(45, 184, 188, 0.6)',
    },
  },
  underlined: {
    textDecoration: 'underline',
  },
  link: {
    cursor: 'pointer',
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
  progress: {
    fontSize: theme.spacing(4),
  },
  linebreak: {
    textAlign: 'left',
    marginLeft: '0',
    height: '2px',
    borderWidth: '0',
    color: 'bllack',
    backgroundColor: 'black',
  }
})


const REQUIRED_NUM_EVALUATIONS = 3


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


class Validation extends React.Component {

  constructor(props) {
    super(props)

    const evalQuestions = JSON.parse(JSON.stringify(EVAL_QUESTIONS))

    this.state = {
      dataID: null,

      prevInput: '',
      prevOutput: null,
      prevOptional: '',

      evalCount: 1,
      evalQuestions,
    }
  }

  componentDidMount() {
    this.loadEvaluationData()
  }

  loadEvaluationData() {
    return fetch('/get_eval', {
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
          prevOptional: "// prevOptional: data['optional'] won't display this ques if null or empty",
        })
      }
    })
  }

  loadMoreEvaluationData() {
    const { evalCount } = this.state
    if ( evalCount >=  REQUIRED_NUM_EVALUATIONS ) {
      this.props.onSwitch('creation')
    } else {
      this.loadEvaluationData()
      .then(
        this.setState({
          evalQuestions: JSON.parse(JSON.stringify(EVAL_QUESTIONS)),
          evalCount: evalCount + 1,
        })
      )
    }
  }

  handleOnSelect(question, selection) {
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

  render() {
    const { classes } = this.props
    const {
      evalCount,
      prevInput,
      prevOutput,
      prevOptional,
      evalQuestions,
    } = this.state

    const enableNext = (
      evalQuestions['evalQ1'].answer === 'no' ||
      Object.keys(evalQuestions).every(key => !!evalQuestions[key].answer))

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>

          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            <span className={classes.title}>Part 1: Validation </span>
            <p className={classes.note}>NOTE: Please take 5 minutes to read this instruction carefully.
                We will have another user to examine your inputs and will reject your HITs
                if you fail to provide inputs that are compliant with the instruction.</p>
          </Typography>

          <Instructions/>

          <Typography
            component="h3"
            variant="h3">
            <p className={classes.progress}> Reviewing {evalCount} out of {REQUIRED_NUM_EVALUATIONS} statements. </p>
          </Typography>

          <Grid item xs={12}>
            <Paper component="div" className={classes.paper} square>
              {prevOutput != null && <Output output={prevOutput} />}
              <Typography
                component="h4"
                variant="h4">
                  {prevInput}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} align="center">
            {prevOutput != null && (
              <UserEval
                optional={prevOptional}
                questions={evalQuestions}
                onSelect={this.handleOnSelect.bind(this)} />
            )}
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              className={classes.button}
              disabled={!enableNext}
              onClick={this.loadMoreEvaluationData.bind(this)}>
              { evalCount < REQUIRED_NUM_EVALUATIONS ? ("Next Statement") : ("Let's proceed to creation step!") }
            </Button>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Validation)
