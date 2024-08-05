import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
		customBackground:{
			main:'#f7fafb',
			light:'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
			lighter: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
			dark:'#000'
		},
		text: {
			primary: '#000000',
			main:'#000'
		},
	},
});

export default lightTheme;