import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Fullscreen from './index'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { muiRg6Theme } from '../../../.storybook/themes'

const StateHolder = ({ children = () => {} }) => {
  const [displayed, setDisplayed] = useState(true)

  const onCancel = () => {
    setDisplayed(false)
  }

  const onValidate = () => {
    setDisplayed(false)
  }

  return <>
    <MuiThemeProvider theme={muiRg6Theme}>
      <ThemeProvider theme={{}}>
        {children({ open: displayed, onCancel, onValidate })}
      </ThemeProvider>
    </MuiThemeProvider>
  </>
}

it('should show when open is set and hide when cancel is clicked', () => {
  const { queryByText } = render(
    <StateHolder>
      {({ ...props }) => (
        <Fullscreen {...props} />
      )}
    </StateHolder>,
  )
  const cancel = queryByText('global.action.cancel')
  expect(cancel).toBeVisible()
  fireEvent.click(cancel)
  setTimeout(() => {
    expect(cancel).not.toBeInTheDocument()
  }, 200)
})

it('should show when open is set and hide when x is clicked', () => {
  const { getByRole } = render(
    <StateHolder>
      {({ ...props }) => (
        <Fullscreen {...props} />
      )}
    </StateHolder>,
  )

  const cancel = getByRole('close')
  expect(cancel).toBeVisible()
  fireEvent.click(cancel)
  setTimeout(() => {
    expect(cancel).not.toBeInTheDocument()
  }, 200)
})

it('should call custom function on validate', () => {
  let hasValidated = false
  const validateText = 'validatebutton'
  const onValidate = () => {
    hasValidated = true
  }

  const { getByText } = render(
    <StateHolder>
      {({ ...props }) => (
        <Fullscreen validateText={validateText} {...props} onValidate={onValidate} />
      )}
    </StateHolder>,
  )

  expect(hasValidated).toBe(false)
  fireEvent.click(getByText(validateText))
  expect(hasValidated).toBe(true)
})
