import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#f48fb1',
		},
		customBackground: {
			main: '#181818',
			light: '#303030',
			lighter: '#B2BEB5',
			dark: '#fff'
		},
		text: {
			primary: '#ffffff',
			main: '#D3D3D3'
		},
	},
});

export default darkTheme;