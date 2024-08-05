import React from 'react';
import { Box, Grid, Paper, useMediaQuery,useTheme } from '@mui/material';
import Training1 from '../assets/Training1.jpg';
import Training2 from '../assets/Training2.jpg';
import Training3 from '../assets/Training3.jpg';
import Training4 from '../assets/Training4.jpg';
import { SportsGymnastics } from '@mui/icons-material';

const Facilities = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery('(min-width: 768px)');
	return (
		<Box className='mt-6 mb-10 w-full' sx={{ overflow: 'hidden' }}>
		 <Box className='text-3xl font-semibold px-4 py-6'
				sx={{
					color: '#4B79A1',
					background: theme.palette.customBackground.light
				}}><SportsGymnastics sx={{ fontSize: '35px' }} className='mr-3' />Available Facilities And Trainings</Box>
			
			<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ flexWrap: 'wrap' }}>
					{[Training1, Training2, Training3, Training4].map((image, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
								<Box
									component="img"
									src={image}
									alt={`training-${index + 1}`}
									
								/>
							</Paper>
						</Grid>
					))}
				</Grid>

		</Box>
	)
}

export default Facilities