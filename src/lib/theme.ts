import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ED1B25' // Vibrant Red
		},
		secondary: {
			main: '#1BA39C' // Teal
		},
		error: {
			main: '#FF5252' // Vivid Red for errors
		},
		warning: {
			main: '#FFB74D' // Modern Orange
		},
		info: {
			main: '#4FC3F7' // Cool Blue (for contrast)
		},
		success: {
			main: '#81C784' // Soft Green
		},
		background: {
			default: '#121212', // Dark Gray Background
			paper: '#1E1E1E' // Slightly Lighter for Cards
		},
		text: {
			primary: '#FFFFFF', // Bright white for primary text
			secondary: '#B0BEC5' // Soft Gray for secondary text
		}
	},
	typography: {
		fontFamily: '"JetBrains Mono", monospace'
	},
	components: {
		MuiTooltip: {
			defaultProps: {
				arrow: true
			}
		},
		MuiButton: {
			defaultProps: {
				variant: 'contained'
			},
			styleOverrides: {
				root: {
					textTransform: 'none'
				}
			}
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: '20px 24px !important'
				}
			}
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderBottom: `1px solid ${theme.palette.divider}`
				})
			}
		},
		MuiDialogActions: {
			styleOverrides: {
				root: ({ theme }) => ({
					padding: theme.spacing(2, 2),
					borderTop: `1px solid ${theme.palette.divider}`
				})
			}
		}
	}
});

export const hover = () => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity);

export default theme;
