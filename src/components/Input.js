import React from 'react'
import {
  TextField,
} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'


const CustomTextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      '@media (min-width:600px)': {
        fontSize: '1rem',
        opacity: 0.85,
      },
    },
    '& .MuiInput-input': {
      '@media (min-width:600px)': {
        fontSize: '1.1rem',
      },
      color: '#000000',
      transition: 'background 0.3s ease',
      fontSize: '1.1rem',
    },
    '& label.Mui-focused': {
      color: '#000000',
    },
    '&:hover .MuiInput-input': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: '#fefefe',
      borderBottom: '3px solid',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#fefefe',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fefefe',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0px, -10px)',
    },
  },
})(TextField)


class Input extends React.Component {

  componentDidMount() {
    const { passInputRef } = this.props
    if ( typeof(passInputRef) === 'function' ) {
      passInputRef(this.refs.input.getElementsByTagName('input')[0])
    }
  }

  handleOnChange(e) {
    const { updateText } = this.props
    const value = e.target.value
    updateText(value)
  }

  render() {
    const { autoFocus, disabled, label, text } = this.props
    return (
      <CustomTextField
        InputProps={{
          spellCheck: true,
          lang: 'en'
        }}
        inputProps={{
          spellCheck: true,
          lang: 'en'
        }}
        spellCheck={true}
        ref="input"
        label={label}
        value={text}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        onChange={this.handleOnChange.bind(this)}
        fullWidth
      />
    )
  }
}


export default Input
