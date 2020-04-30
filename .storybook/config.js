import React from 'react'
import util from '@date-io/date-fns'
import { fr } from 'date-fns/locale'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { withTests } from '@storybook/addon-jest'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import ThemeProvider from './theme-provider';

import { MuiPickersUtilsProvider } from '../src/Atoms/DateTimePicker'
import { TransProvider } from '../src/Atoms/Trans'
import results from '../.jest-test-results.json'
import { rg6, dark } from '../src/themes'
import { en } from './locales'

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(withThemesProvider([rg6, dark], ThemeProvider))
addDecorator(withTests({ results }))
addDecorator(storyFn => <TransProvider value={en}>{storyFn()}</TransProvider>)
addDecorator(storyFn => <MuiPickersUtilsProvider utils={util} locale={fr}>{storyFn()}</MuiPickersUtilsProvider>)
// automatically import all files ending in *.stories.jsx
configure(require.context('../src', true, /\.stories\.jsx$/), module)
