import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import Input from './Input'
import Output from './Output'


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
})


class InputGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputs: {
        s1: {
          id: 's1',
          name: 's1',
          value: 'Roses are red',
          label: 'input 1',
          changed: true,
          output: null,
          scores: null,
        },
        s2: {
          id: 's2',
          name: 's2',
          value: 'Roses are blue',
          label: 'input 2',
          changed: true,
          output: null,
          scores: null,
        },
        s3: {
          id: 's3',
          name: 's3',
          value: '[optional input statement]',
          label: 'input 3',
          changed: true,
          output: null,
          scores: null,
        },
      },
    }
  }

  getInputRef(inputRef) {
    this.inputField = inputRef
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

  render () {
    const { inputs } = this.state
    const { classes } = this.props

    return (
      <Grid item xs={12}>
        <Paper component="div" className={classes.paper} square>

          {/* input statement 1 */}
          {inputs.s1.output != null && <Output statement={inputs.s1} />}
          <Input
            text={inputs.s1}
            autoFocus={true}
            disabled={false}
            passInputRef={this.getInputRef.bind(this)}
            updateText={this.handleUpdate.bind(this)} />

          {/* input statement 2 */}
          {inputs.s2.output != null && <Output statement={inputs.s2} />}
          <Input
            text={inputs.s2}
            disabled={false}
            updateText={this.handleUpdate.bind(this)} />

          {/* optional input statement 3 */}
          {inputs.s3.output != null && <Output statement={inputs.s3} />}
          <Input
            text={inputs.s3}
            disabled={false}
            updateText={this.handleUpdate.bind(this)} />

        </Paper>
      </Grid>
    )
  }
}


export default withStyles(styles)(InputGroup)
