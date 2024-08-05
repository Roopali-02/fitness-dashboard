import React, { useState, useEffect, useContext } from 'react';
import { Box, AppBar, IconButton, Toolbar, Drawer, List, ListItem, ListItemButton, Divider, ListItemIcon, ListItemText, useMediaQuery, useTheme, Button } from "@mui/material";
import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ThemeContext } from '../context/CustomThemeProvider';
import constants from '../constants/index';
import { FitnessCenter, SportsGymnastics } from '@mui/icons-material';
import {Link} from 'react-router-dom';

const Layout = ({ children }) => {
	const { toggleTheme } = useContext(ThemeContext);
	const drawerWidth = 200;
	const isNonMobile = useMediaQuery('(min-width: 600px)');
	const [open, setOpen] = useState(isNonMobile);
	const theme = useTheme();
	const options = ['Home','Option1','Option1','Option3'];

	const handleDrawerToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	useEffect(() => {
		if (!isNonMobile) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [isNonMobile]);
	return (
		<Box sx={{display: 'flex',}}>
			<AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar className='flex justify-between'>
				<Box>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleDrawerToggle}
					>
					<Menu className='mr-5'/>
						<Box className='text-3xl font-mono font-extrabold tracking-wider'>
							<FitnessCenter className='mr-1' sx={{ color: '#FDC830' }} />
							<Box component="span">{constants.fit}</Box><Box component="span" sx={{ color:'#FDC830'}}>{constants.freak}</Box>
						</Box>
					</IconButton>
				
					</Box>
					<Box>
						<Button sx={{ textTransform: 'none',fontWeight:'700', background: theme.palette.customBackground.lighter, color: "#000000" }}  variant="contained" onClick={toggleTheme} className='font-bold text-sm'>
							{constants.changeTheme}
					</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer 
				variant='permanent' 
			open={open}
				sx={{
					width: (theme) => open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: (theme) => open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
						boxSizing: 'border-box',
						marginTop: '64px', 
						backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main :'#434343', 
						color: theme.palette.mode === 'light' ?'#fff':theme.palette.text.primary, 
						transition: theme => theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
					},
				}}
			>
				<Box className='flex justify-end items-center' p={1}>
					<IconButton onClick={handleDrawerToggle}>
						{open ? <ChevronLeft className='text-white' /> : <ChevronRight className='text-white' />}
					</IconButton>
				</Box>
				<Divider />
				<List className='flex flex-col justify-center items-center'>
					{
						options.map((option,index)=>(
							<ListItem 
								key={index} 
								sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}
              >
								<Link to={option === 'Home'?'/':'/exercises'}>
								<ListItemButton>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
											color: theme.palette.text.primary 
										}}
									>
										<SportsGymnastics className='text-white'/>
									</ListItemIcon>
									<ListItemText primary={option} sx={{ opacity: open ? 1 : 0,fontSize:'30px' }}/>
								</ListItemButton>
								</Link>
							</ListItem>
						))
					}
				</List>
			</Drawer>
			<Box
				className='mt-16 px-2 pb-0 w-full'
				component="main"
			>
				{children}
			</Box>
		</Box>
	)
}

export default Layout;