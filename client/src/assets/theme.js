import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

export default function Theme() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = responsiveFontSizes(React.useMemo(
      () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
      [prefersDarkMode],
    ))
    return theme
}