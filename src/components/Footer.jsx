import React, {  } from 'react';
import { Box, InputBase, useTheme, useMediaQuery, Fab } from '@mui/material';
import weightLift from '../assets/weightLift.jpg';
import constants from '../constants/index';
import { WhatsApp, X, Instagram, Reddit } from '@mui/icons-material'

const Footer = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery('(min-width: 768px)');

	return (
		<Box className='p-8 mt-3' sx={{ background: theme.palette.customBackground.light}}>
			<Box className={`${isNonMobile?'flex':'flex flex-col'} gap-5`}>
				<Box className='flex flex-col basis-30'>
					<Box className='text-4xl font-mono font-extrabold tracking-wider'>
						<Box component="span">{constants.fit}</Box><Box component="span" sx={{ color: '#FDC830' }} className=''>{constants.freak}</Box>
					</Box>
				<Box><img src={weightLift} alt='person' width={350} height={300}></img></Box>
				</Box>
				<Box className='flex flex-col gap-3 basis-30'>
					<Box className='font-bold text-lg' sx={{ color: theme.palette.text.main }}>{constants.workingHours}</Box>
					{
						constants.middleContent.map((content)=>(
							<Box className='font-semibold text-base mb-2 text-neutral-500'>{content?.htmlContent}</Box>
						))
					}
				</Box>
				<Box className='flex flex-col basis-40'>
					<Box className='font-bold text-lg' sx={{ color: theme.palette.text.main }}>{constants.contactUs}</Box>
					<Box className='w-full'>
						<Box className='font-bold text-neutral-500 mb-2'>{constants.emailTitle}</Box>
						<InputBase 
							className='mb-2' sx={{ width:'100%', background: '#7393B3', paddingLeft: '10px', color: '#ffffff' }}
							placeholder={constants.emailTitle}
							/>
						<Box className='mt-2 font-bold'><Box component='button' className='font-bold px-3 py-1' sx={{ background: theme.palette.customBackground.dark, color: theme.palette.customBackground.main, textTransform: 'none' }}>{constants.submit}</Box></Box>
						<Box className='flex mt-5 gap-3'>
							<WhatsApp></WhatsApp>
							<X></X>
							<Instagram></Instagram>
							<Reddit></Reddit>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box sx={{ position: 'relative' }}>
				<Fab
					color="primary"
					aria-label="add"
					sx={{
						position: 'fixed',
						bottom: 20,
						right: 20
					}}
				>
					<WhatsApp />
				</Fab>
			</Box>
		</Box>
	)
}

export default Footer