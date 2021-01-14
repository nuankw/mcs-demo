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
    textAlign: 'left',
    color: 'dark',
    padding: theme.spacing(1,1,1,1),
    fontSize: theme.spacing(3),
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    padding: theme.spacing(0,0,0,3),
  },
  button: {
    // width: '20%',
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
    paddingLeft: theme.spacing(1),
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
  recommendReason: {
    display: 'flex',
    width: '100%',
    paddingLeft: theme.spacing(1),
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
  }
})


class Evaluate extends React.Component {
  render() {
    const { classes, questions, editSuggestion, recommendReason, onSelect, onEditSuggestionChange, onRecommendReasonChange} = this.props
    return (

      <div className={classes.root}>
        {/*
          // discard: yes  --> skip to next pair (suggesting no bonus)
          //          no   --> continue with following questions

          'discard': {
              'type': 'single',
              'answer': '', // 'yes' or 'no'
          },
        */}
        <div>
          <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Should we discard this input pair from our dataset (repeatitive / not fixable at all)?
              Notice you will have a chance to accept this pair but give zero bonus.
          </Typography>
          <div className={classes.buttonRow}>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['discard']['answer'] === 'no',
                })}
                onClick={() => onSelect('discard', 'no')}>
                No, keep it. It's fixable / not (that) bad.
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['discard']['answer'] === 'yes',
                })}
                onClick={() => onSelect('discard', 'yes')}>
                Yes, discard. We don't want this pair in our dataset.
            </Button>

          </div>
        </div>

        {/*
          // discard: yes  --> skip to next pair (suggesting no bonus)
          //          no   --> continue with following questions

          // bonus:   pair_based full  (0.8) --> both creative and correctly fooled, ask for recommend reason e.g. tricks/topics/etc,
          //          pair_based basic (0.5) --> either creative or correctly fooled, ask for recommend reason e.g. tricks/topics/etc,
          //          pair_based zero  (0,0) --> skip to edit

          'discard': {
              'type': 'single',
              'answer': '', // 'yes' or 'no'
          },

          'bonus': {
            'type': 'single',
            'answer': '', // 'full', 'basic' or 'zero'
          },

          recommend_reason: string,

        */}
        {(!!questions['discard']['answer']
          ) && (questions['discard']['answer'] === "no") && (
        <div>
          <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              How much bonus should we pay for this pair?
          </Typography>
          <div className={classes.buttonRow}>
            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus']['answer'] === 'full',
                })}
                onClick={() => onSelect('bonus', 'full')}>
                Full (both creative and properly fooled)
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus']['answer'] === 'basic',
                })}
                onClick={() => onSelect('bonus', 'basic')}>
                Basic (either creative or properly fooled)
            </Button>

            <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['bonus']['answer'] === 'zero',
                })}
                onClick={() => onSelect('bonus', 'zero')}>
                Zero (failed both criteria)
            </Button>
          </div>
        </div>)}

        {/* ask for recommend reason */}
        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (questions['bonus']['answer'] !== "zero") &&
          (<div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Since you selected positive bonus, what's good about this pair?
              (e.g. interesting topics. unique content, inspirations, fooling tricks, etc)
              Only comment when you have good observations, otherwise leave it blank.
            </Typography>
            <TextField
              className={classes.recommendReason}
              value={recommendReason}
              label="optional"
              onChange={(event) => onRecommendReasonChange(event.target.value)} />
          </div>)
        }


        {/*
          // discard: yes  --> skip to next pair (suggesting no bonus)
          //          no   --> continue with following questions

          // bonus:   pair_based full  (0.8) --> both creative and correctly fooled, ask for recommend reason e.g. tricks/topics/etc,
          //          pair_based basic (0.5) --> either creative or correctly fooled, ask for recommend reason e.g. tricks/topics/etc,
          //          pair_based zero  (0,0) --> skip to edit

          // edit:    yes --> optional edit suggestion, skip to next pair
          //          no  --> validation (remove numeracy check)

          'discard': {
              'type': 'single',
              'answer': '', // 'yes' or 'no'
          },

          'bonus': {
            'type': 'single',
            'answer': '', // 'full', 'basic' or 'zero'
          },

          recommendReason: string,

          'edit': {
            'type': 'single',
            'answer': '', // 'yes' or 'no'
          },

        */}

        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (<div>
            <Typography
                component="h3"
                variant="h3"
                className={classes.question}>
                Does the sentence pair need any editing to reduce ambiguity or to further fool the model?
            </Typography>
            <div className={classes.buttonRow}>
              <Button
                  variant="contained"
                  className={classNames(classes.button, {
                    'selected': questions['edit']['answer'] === 'yes',
                  })}
                  onClick={() => onSelect('edit', 'yes')}>
                  Yes, it needs to be edited. Proceed to optional editing suggestion.
              </Button>

              <Button
                  variant="contained"
                  className={classNames(classes.button, {
                    'selected': questions['edit']['answer'] === 'no',
                  })}
                  onClick={() => onSelect('edit', 'no')}>
                  No, it's all good. Proceed to validation.
              </Button>

            </div>
          </div>)
        }

        {/* ask for edit suggestion */}
        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (questions['edit']['answer'] === "yes") &&
          (<div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              (Optional) any editing suggestions?
            </Typography>
            <TextField
              className={classes.editSuggestion}
              value={editSuggestion}
              label="optional"
              onChange={(event) => onEditSuggestionChange(event.target.value)} />
          </div>
        )}

        {/*
          validation

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
        */}
        {/* 1. check label */}
        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (questions['edit']['answer'] === "no") &&
          (<div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Check the T/F of the two sentences, they are:
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'correct',
                })}
                onClick={() => onSelect('label_check', 'correct')}>
                True/False Both Correct
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'flipped',
                })}
                onClick={() => onSelect('label_check', 'flipped')}>
                True/False Flipped
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'both_true',
                })}
                onClick={() => onSelect('label_check', 'both_true')}>
                Double True
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['label_check']['answer'] === 'both_false',
                })}
                onClick={() => onSelect('label_check', 'both_false')}>
                Double False
              </Button>
            </div>
          </div>
        )}

        {/* 2. check domains */}
        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (questions['edit']['answer'] === "no") &&
          (<div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Please select the domain that you think this input pair can be categorized into:
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('d1') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'd1')}>
                Physical
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('d2') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'd2')}>
                Social
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['domain_check']['answer'].indexOf('d3') >= 0,
                })}
                onClick={() => onSelect('domain_check', 'd3')}>
                Time
              </Button>
            </div>
          </div>
        )}

        {/* 3. check scenarios */}
        {(!!questions['discard']['answer']) &&
          (questions['discard']['answer'] === "no") &&
          (!!questions['bonus']['answer']) &&
          (questions['edit']['answer'] === "no") &&
          (<div>
            <Typography
              component="h3"
              variant="h3"
              className={classes.question}>
              Please select one of the scenarios that you think this input pair can be categorized into:
            </Typography>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['scenario_check']['answer'].indexOf('s1') >= 0,
                })}
                onClick={() => onSelect('scenario_check', 's1')}>
                Cause & effect
              </Button>

              <Button
                variant="contained"
                className={classNames(classes.button, {
                  'selected': questions['scenario_check']['answer'].indexOf('s2') >= 0,
                })}
                onClick={() => onSelect('scenario_check', 's2')}>
                Comparison
              </Button>
            </div>
          </div>
        )}

      </div>
    )
  }
}


export default withStyles(styles)(Evaluate)
