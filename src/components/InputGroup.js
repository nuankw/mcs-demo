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
  inputWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: theme.spacing(12),
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'space-around',
    justifyContent: 'center',
    height: theme.spacing(12),
  },
  buttonTrue: {
    '&:hover': {
      background: 'rgba(0, 255, 0, 0.5)',
    },
    '&.selected': {
      background: 'rgba(0, 255, 0, 0.5)',
    },
  },
  buttonFalse: {
    '&:hover': {
      background: 'rgba(255, 0, 0, 0.5)',
    },
    '&.selected': {
      background: 'rgba(255, 0, 0, 0.5)',
    },
  },
})


class InputGroup extends React.Component {

  getInputRef(inputRef) {
    this.inputField = inputRef
  }

  handleUpdate(id, input) {
    const inputs = {...this.props.inputs}
    inputs[id] = {...inputs[id], ...{input}}
    this.props.onChange(inputs)
  }

  select(id, label) {
    const inputs = {...this.props.inputs}
    inputs[id] = {...inputs[id], ...{'label': label}}
    if ( id === 1 ) {
      inputs[2] = {...inputs[id], ...{'label': !label}}
    }
    if ( id === 2 ) {
      inputs[1] = {...inputs[id], ...{'label': !label}}
    }
    this.props.onChange(inputs)
  }

  render () {
    const { classes, index, inputs } = this.props
    return (
      <Paper component="div" className={classes.paper} square>
        <Grid container spacing={3}>
          <Grid item xs={10} className={classes.inputWrapper}>
            {inputs[1].output != null && <Output output={inputs[1].output} />}
            <Input
              label={'Please provide the first sentence of your input pair:'}
              text={inputs[1].input}
              autoFocus={false}
              disabled={false}
              passInputRef={this.getInputRef.bind(this)}
              updateText={(text) => this.handleUpdate(1, text)} />
          </Grid>
          <Grid item xs={2} className={classes.buttonWrapper}>
            <ButtonGroup className={classes.buttonGroup}>
              <Button
                className={classNames(classes.buttonTrue, {
                  'selected': inputs[1].label === true,
                })}
                onClick={() => this.select(1, true)}>True</Button>
              <Button
                className={classNames(classes.buttonFalse, {
                  'selected': inputs[1].label === false,
                })}
                onClick={() => this.select(1, false)}>False</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={10} className={classes.inputWrapper}>
            {inputs[2].output != null && <Output output={inputs[2].output} />}
            <Input
              label={'and the other sentence of the pair:'}
              text={inputs[2].input}
              disabled={false}
              updateText={(text) => this.handleUpdate(2, text)} />
          </Grid>
          <Grid item xs={2} className={classes.buttonWrapper}>
            <ButtonGroup className={classes.buttonGroup}>
              <Button
                className={classNames(classes.buttonTrue, {
                  'selected': inputs[2].label === true,
                })}
                onClick={() => this.select(2, true)}>True</Button>
              <Button
                className={classNames(classes.buttonFalse, {
                  'selected': inputs[2].label === false,
                })}
                onClick={() => this.select(2, false)}>False</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            {inputs[3].output != null && <Output output={inputs[3].output} />}
            <Input
              label='(optional, please leave it blank if no input) the common sense knowledge piece you used to create the above sentence pair:'
              text={inputs[3].input}
              disabled={false}
              updateText={(text) => this.handleUpdate(3, text)} />
          </Grid>

        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(InputGroup)
