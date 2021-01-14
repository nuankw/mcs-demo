import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import UserEval from './UserEval'
import ValidationInstruction from './ValidationInstruction'
import InputGroup from './InputGroup'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  nextButton: {
    color: 'white',
    background: 'rgba(48, 57, 139, 0.6)',
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
    fontSize: theme.spacing(2.8),
    color: "#8b341d",
    fontWeight: "bold",
  },
  progress: {
    fontSize: theme.spacing(3),
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


const REQUIRED_NUM_EVALUATIONS = 1000

const EVAL_QUESTIONS = {
  'discard': {
    'type': 'single',
    'answer': '', // 'yes' or 'no'
  },
  'bonus': {
    'type': 'single',
    'answer': '', // 'full', 'basic' or 'zero'
  },
  'edit': {
    'type': 'single',
    'answer': '', // 'yes' or 'no'
  },
  'label_check': {
    'type': 'single',
    'answer': '', // 'correct', 'flipped', 'both_true', 'both_false'
  },
  'domain_check': {
    'type': 'multiple',
    'answer': [],
  },
  'scenario_check': {
    'type': 'single',
    'answer': '',
  },
}


class Validation extends React.Component {

  constructor(props) {
    super(props)

    const evalQuestions = JSON.parse(JSON.stringify(EVAL_QUESTIONS))

    this.state = {
      dataID: '',
      one_input_pair: {
        1: { input: '', output: null, label: null, score: null},
        2: { input: '', output: null, label: null, score: null},
      },
      domain: '',
      scenario: '',
      editSuggestion: '',
      recommendReason: '',
      evalCount: 1,
      evalQuestions,
      worker_id: '',
      time_stamp: '',
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
          one_input_pair:data['one_input_pair'],
          time_stamp: data['time_stamp'],
          worker_id: data['worker_id'],
        })
      }
    })
  }

  loadMoreEvaluationData() {
    const { evalCount } = this.state
    if ( evalCount >=  REQUIRED_NUM_EVALUATIONS ) {
      this.props.onSubmit()
    } else {
      this.loadEvaluationData()
      .then(
        this.setState({
          evalQuestions: JSON.parse(JSON.stringify(EVAL_QUESTIONS)),
          evalCount: evalCount + 1,
          editSuggestion: '',
          recommendReason: '',
        })
      )
    }
  }

  handleOnSelect(question, selection) {
    const { evalQuestions } = this.state

    // support multiple choice answers
    const update = {...evalQuestions}
    if ( update[question].type === 'multiple' ) {
      const index = update[question]['answer'].indexOf(selection)
      if ( index >= 0 ) {
        update[question]['answer'].splice(index, 1)
      } else {
        if ( selection === 'other' ) {
          update[question]['answer'] = ['other']
        } else {
          update[question]['answer'] = (
            update[question]['answer'].filter(s => s !== 'other'))
          update[question]['answer'].push(selection)
        }
      }
    } else {
      update[question]['answer'] = selection
    }

    this.setState({'evalQuestions': update})

  }

  handleOnNext() {
    const { dataID, evalQuestions, editSuggestion, recommendReason } = this.state
    fetch('/set_eval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'dataID': dataID,
        'discard': evalQuestions['discard']['answer'],// 'yes' or 'no'
        'bonus': evalQuestions['bonus']['answer'],// 'full', 'basic' or 'zero'
        'edit': evalQuestions['edit']['answer'],// 'yes' or 'no'
        'label_check': evalQuestions['label_check']['answer'],
        'domain_check': evalQuestions['domain_check']['answer'],
        'scenario_check': evalQuestions['scenario_check']['answer'],
        'edit_suggestion': editSuggestion,
        'recommend_reason': recommendReason,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if ( data['status'] === 'ok' ) {
        this.loadMoreEvaluationData()
      } else {
        // what should we do here? disable "next statement" for sure but anything else?
        // e.g. we apologize for inconvenience but currently experiencing server error.
        //      please refresh if not working / come back later?
      }
    })
  }

  handleOnChangeEditSuggestion(suggestion) {
    this.setState({editSuggestion: suggestion})
  }

  handleOnChangeRecommendReason(reason_comment) {
    this.setState({recommendReason: reason_comment})
  }

  render() {
    const { classes, domain, scenario, bonus, mode } = this.props
    const {
      evalCount,
      one_input_pair,
      evalQuestions,
      editSuggestion,
      recommendReason,
      time_stamp,
      worker_id,
      dataID
    } = this.state

    const enableNext = (
      // 1. not discard
      evalQuestions['discard'].answer === 'no'
      && !!evalQuestions['bonus'].answer
      && ((
        evalQuestions['edit'].answer === 'no'
        && !!evalQuestions['label_check'].answer
        && evalQuestions['domain_check'].answer.length >= 1
        && !!evalQuestions['scenario_check'].answer
      ) || (
        evalQuestions['edit'].answer === 'yes'
      ))
    )|| (
      // . discard
      evalQuestions['discard'].answer === 'yes'
    )

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>

          <Typography
            component="h3"
            variant="h3"
            className={classes.header}>
            <span className={classes.title}>Part 1: Validation </span>
            <p className={classes.note}>Internal use only.</p>
          </Typography>

          <ValidationInstruction
            domain={domain}
            scenario={scenario}
            bonus={bonus}/>

          <Typography
            component="h3"
            variant="h3">
            <p className={classes.progress}> Reviewing {evalCount} out of {REQUIRED_NUM_EVALUATIONS} statements.
            <br/>Worker: {worker_id}<br/>Creation Time: {time_stamp}<br/>Data ID: {dataID}</p>
          </Typography>

          <Grid item xs={12}>
            <InputGroup
              inputs={one_input_pair}
              mode={mode}/>
          </Grid>

          <Grid item xs={12} align="center">
            {one_input_pair != null && (
              <UserEval
                questions={evalQuestions}
                editSuggestion={editSuggestion}
                recommendReason={recommendReason}
                onSelect={this.handleOnSelect.bind(this)}
                onEditSuggestionChange={this.handleOnChangeEditSuggestion.bind(this)}
                onRecommendReasonChange={this.handleOnChangeRecommendReason.bind(this)}
              />
            )}
          </Grid>

          <hr className={classes.linebreak} />

          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              className={classes.nextButton}
              disabled={!enableNext}
              onClick={this.handleOnNext.bind(this)}>
              { evalCount < REQUIRED_NUM_EVALUATIONS ? ("Next Statement") : ("All done! Click to submit") }
            </Button>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Validation)
