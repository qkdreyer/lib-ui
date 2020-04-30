import React from 'react';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeProvider = ({ theme, children }) => (
  <StylesProvider>
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
)

export default ThemeProvider
