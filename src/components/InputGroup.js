import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { withStyles } from '@material-ui/core/styles'

import Input from './Input'
import Output from './Output'
import classNames from '../utils/classes'


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'rgba(254, 254, 254, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  inputWrapper: {
    display: 'flex',
    height: theme.spacing(12),
  },
  buttonWrapper: {
    display: 'flex',
    height: theme.spacing(12),
  },
  buttonTrue: {
    '&:hover': {
      background: 'rgba(0, 80, 0, 0.8)',
      color: 'snow',
    },
    '&.selected': {
      background: 'rgba(0, 80, 0, 0.8)',
      color: 'snow',
    },
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: theme.spacing(2.2),
    letterSpacing: 1.5,
    textTransform: "none",
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(1),
  },
  buttonFalse: {
    '&:hover': {
      background: 'rgba(140, 0, 0, 0.8)',
      color: 'snow',
    },
    '&.selected': {
      background: 'rgba(140, 0, 0, 0.8)',
      color: 'snow',
    },
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: theme.spacing(2.2),
    letterSpacing: 1.5,
    textTransform: "none",
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
})


class InputGroup extends React.Component {

  getInputRef(inputRef) {
    this.inputField = inputRef
  }

  handleUpdate(id, input) {
    const inputs = {...this.props.inputs}
    inputs[id] = {...inputs[id], ...{input}}
    inputs[id] = {...inputs[id], ...{'input_change_not_tested': true}}
    this.props.onChange(inputs)
  }

  select(id, label) {
    const inputs = {...this.props.inputs}
    inputs[id] = {...inputs[id], ...{'label': label}}
    if ( id === 1 ) {
      inputs[2] = {...inputs[2], ...{'label': !label}}
    }
    if ( id === 2 ) {
      inputs[1] = {...inputs[1], ...{'label': !label}}
    }
    this.props.onChange(inputs)
  }

  render () {
    const { classes, inputs } = this.props
    return (
      <Paper component="div" className={classes.paper} square>
        <Grid container spacing={3}>
          <Grid item xs={11} className={classes.inputWrapper}>
            <Input
              className={classes.input}
              label={'Please provide the first sentence of your input pair and whether it is True/False:'}
              text={inputs[1].input}
              autoFocus={false}
              disabled={false}
              passInputRef={this.getInputRef.bind(this)}
              updateText={(text) => this.handleUpdate(1, text)}
            />
          </Grid>

          <Grid item xs={1} className={classes.buttonWrapper}>

            <Output
              fooled={inputs[1].output !== inputs[1].label}
              hideResult={inputs[1].input_change_not_tested || inputs[1].input === ""}/>

            <ButtonGroup className={classes.buttonGroup}>
              <Button
                className={classNames(classes.buttonTrue, {
                  'selected': inputs[1].label === true,
                })}
                onClick={() => this.select(1, true)}>T</Button>
              <Button
                className={classNames(classes.buttonFalse, {
                  'selected': inputs[1].label === false,
                })}
                onClick={() => this.select(1, false)}>F</Button>
            </ButtonGroup>

          </Grid>

          <Grid item xs={11} className={classes.inputWrapper}>
            <Input
              label={'and the other sentence of the pair with opposite True/False:'}
              text={inputs[2].input}
              disabled={false}
              updateText={(text) => this.handleUpdate(2, text)}
            />
          </Grid>

          <Grid item xs={1} className={classes.buttonWrapper}>

            <Output
              fooled={inputs[2].output !== inputs[2].label}
              hideResult={inputs[2].input_change_not_tested || inputs[2].input === ""}/>

            <ButtonGroup className={classes.buttonGroup}>
              <Button
                className={classNames(classes.buttonTrue, {
                  'selected': inputs[2].label === true,
                })}
                onClick={() => this.select(2, true)}>T</Button>
              <Button
                className={classNames(classes.buttonFalse, {
                  'selected': inputs[2].label === false,
                })}
                onClick={() => this.select(2, false)}>F</Button>
            </ButtonGroup>
          </Grid>

          {/* <Grid item xs={12}>
            <Input
              label='(optional, please leave it blank if no input) the common sense knowledge piece you used to create the above sentence pair:'
              text={inputs[3].input}
              disabled={false}
              updateText={(text) => this.handleUpdate(3, text)}
            />
          </Grid> */}

        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(InputGroup)
