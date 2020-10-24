import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'
import classNames from '../utils/classes'

const styles = theme => ({
  root: {
    marginTop: '1em',
  },
  question: {
    display: 'flex',
    justifyContent: "left",
    color: 'dark',
    padding: theme.spacing(1,1,1,6),
    fontSize: theme.spacing(3),
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    padding: theme.spacing(0,0,0,10),
  },
  button: {
    width: '20%',
    color: 'black',
    fontSize: theme.spacing(2),
    background: 'rgba(254, 254, 254, 0.2)',
    border: '1px solid black',
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1, 4),
    textTransform: "none",
    '&.selected': {
      background: 'rgba(48, 57, 139, 0.6)',
      color: '#dae1c5',
    },
    '&:hover': {
      background: 'rgba(45, 184, 188, 0.6)',
      color: 'black',
    },
  },
  link: {
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    textDecoration: 'underline',
  },
  optional: {
    fontSize: theme.spacing(3),
    display: 'flex',
    justifyContent: "center",
    padding: theme.spacing(1),
    background: 'rgba(41, 28, 51, 0.26)',
    margin: theme.spacing(1,12,1,12),// width: '80%',
    // color: 'white',
  },
  editSuggestion: {
    display: 'flex',
    width: '100%',
    paddingLeft: theme.spacing(6),
    '& .MuiFormControl-root.MuiTextField-root': {
    display: 'flex',
    minWidth: '100%',
    },
    '& .MuiFormControl-root.MuiTextField-root label': {
      color: '#fefefe',
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiFormLabel-root': {
      '@media (min-width:600px)': {
        fontSize: '1rem',
        opacity: 0.85,
      },
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root input': {
      '@media (min-width:600px)': {
        fontSize: '1.2rem',
      },
      color: '#fefefe',
      fontSize: '1.2rem',
    },
    '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fefefe',
    },
  },
})


class Evaluate extends React.Component {

  render() {
    const { classes, questions, editSuggestion, onSelect, onChange} = this.props
    return (
      <div className={classes.root}>

        {/* Should we keep this input pair? Is editting required? How much bonus? */}
        <div>
          <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Should we keep this input pair? Is editting required? How much bonus?
          </Typography>
          <div className={classes.buttonRow}>
            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['keep_edit_bonus']['answer'] === 'no_edit_full_bonus',
                })}
                onClick={() => onSelect('keep_edit_bonus', 'no_edit_full_bonus')}>
                Yes/No/Full
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['keep_edit_bonus']['answer'] === 'need_edit_full_bonus',
                })}
                onClick={() => onSelect('keep_edit_bonus', 'need_edit_full_bonus')}>
                Yes/Yes/Full
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['keep_edit_bonus']['answer'] === 'need_edit_half_bonus',
                })}
                onClick={() => onSelect('keep_edit_bonus', 'need_edit_half_bonus')}>
                Yes/Yes/Half
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['keep_edit_bonus']['answer'] === 'discard_no_bonus',
                })}
                onClick={() => onSelect('keep_edit_bonus', 'discard_no_bonus')}>
                No/No/Zero
            </Button>

          </div>
        </div>

        {/* if edit needed */}
        {(questions['keep_edit_bonus']['answer'] === 'need_edit_half_bonus'
          || questions['keep_edit_bonus']['answer'] === 'need_edit_full_bonus'
          ) && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Please provide your suggestion for editing:
            </Typography>
            <TextField
              className={classes.editSuggestion}
              value={editSuggestion}
              label=""
              onChange={(event) => onChange(event.target.value)} />
          </div>
        )}


        {/* if bonus reduced ask for the reason(s) */}
        {(questions['keep_edit_bonus']['answer'] === 'need_edit_half_bonus'
          || questions['keep_edit_bonus']['answer'] === 'discard_no_bonus'
          ) && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              What are your reason(s) for bonus reduction?
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('not_common_sense') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'not_common_sense')}>
                Not common sense (too specialized or not deterministic)
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('wrong_domain') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'wrong_domain')}>
                Wrong domain
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('wrong_scenario') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'wrong_scenario')}>
                Wrong scenario
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('numeracy_not_found') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'numeracy_not_found')}>
                Numeracy not found
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('grammar_error') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'grammar_error')}>
                Intolerable grammatical issue(s)
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus_reduction_reasons']['answer'].indexOf('other_reasons') >= 0,
                })}
                onClick={() => onSelect('bonus_reduction_reasons', 'other_reasons')}>
                Other(s). Please notify ppl on the channel!!
              </Button>
            </div>
          </div>
        )}

        {/* if bonus *not* reduced ask whether validator wants to recommand this pair */}
        {(questions['keep_edit_bonus']['answer'] === 'no_edit_full_bonus'
          || questions['keep_edit_bonus']['answer'] === 'need_edit_full_bonus'
          ) && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Since you suggested full bonus, this input pair must be valid. How much do you like/recommend it?
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['how_much_like']['answer'] === 'very_much',
                })}
                onClick={() => onSelect('how_much_like', 'very_much')}>
                Very much
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['how_much_like']['answer'] === 'not_bad',
                })}
                onClick={() => onSelect('how_much_like', 'not_bad')}>
                Not bad
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['how_much_like']['answer'] === 'not_really',
                })}
                onClick={() => onSelect('how_much_like', 'not_really')}>
                Not really
              </Button>
            </div>
          </div>
        )}

        {/* if not discarding (zero bonus): 1. check label */}
        {!!questions['keep_edit_bonus']['answer'] &&
          questions['keep_edit_bonus']['answer'] !== 'discard_no_bonus'
          && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Are the labels correct?
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'yes',
                })}
                onClick={() => onSelect('label_check', 'yes')}>
                Yes
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'no',
                })}
                onClick={() => onSelect('label_check', 'no')}>
                No
              </Button>
            </div>
          </div>
        )}

        {/* if not discarding (zero bonus): 2. check domains */}
        {!!questions['keep_edit_bonus']['answer'] &&
          questions['keep_edit_bonus']['answer'] !== 'discard_no_bonus'
          && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Please select all the domains that you think this input pair can be categorized into (WITHOUT edit):
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('physical') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'physical')}>
                Physical
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('social') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'social')}>
                Social
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('time') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'time')}>
                Time
              </Button>
            </div>
          </div>
        )}

        {/* if not discarding (zero bonus): 3. check scenarios */}
        {!!questions['keep_edit_bonus']['answer'] &&
          questions['keep_edit_bonus']['answer'] !== 'discard_no_bonus'
          && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Please select all the scenarios that you think this input pair can be categorized into (WITHOUT edit):
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['scenario_check']['answer'].indexOf('causal') >= 0,
                })}
                onClick={() => onSelect('scenario_check', 'causal')}>
                Cause & effect
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['scenario_check']['answer'].indexOf('comparison') >= 0,
                })}
                onClick={() => onSelect('scenario_check', 'comparison')}>
                Comparison
              </Button>
            </div>
          </div>
        )}

        {/* if not discarding (zero bonus): 4. check numeracy */}
        {!!questions['keep_edit_bonus']['answer'] &&
          questions['keep_edit_bonus']['answer'] !== 'discard_no_bonus'
          && (
          <div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Does the input pair follow numeracy requirement?
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['numeracy_check']['answer'] === 'yes',
                })}
                onClick={() => onSelect('numeracy_check', 'yes')}>
                Yes
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['numeracy_check']['answer'] === 'no',
                })}
                onClick={() => onSelect('numeracy_check', 'no')}>
                No
              </Button>
            </div>
          </div>
        )}

      </div>
    )
  }
}


export default withStyles(styles)(Evaluate)
