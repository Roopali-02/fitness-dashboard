import React, { useState, useEffect } from 'react';
import {
	Box,
	useTheme,
	Card,
	useMediaQuery,
	Grid,
	CardContent,
	CardMedia,
	Paper,
	CircularProgress
} from '@mui/material';
import constants from '../constants/index';
import Piechart from './Piechart';
import BarChart from './BarChart';
import { SportsGymnastics } from '@mui/icons-material';
import Facilities from './Facilities';


const Dashboard = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery('(min-width: 768px)');
	const [exercises, setExercises] = useState([]);
	const [responseWithImages, setResponseWithImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [resizeKey, setResizeKey] = useState(0); 
	const [chartData, setChartData] = useState({
		pieChartData: [],
		barChartData: [],
	});
	const limit = 800;
	const batchSize = 100;

	useEffect(() => {
		const handleResize = () => setResizeKey(prevKey => prevKey + 1);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const cachedFetch = (() => {
		const cache = {};
		return async (url) => {
			if (!cache[url]) {
				const response = await fetch(url);
				const data = await response.json();
				cache[url] = data;
			}
			return cache[url];
		};
	})();

	const fetchInBatches = async (urls, batchSize) => {
		const results = [];
		for (let i = 0; i < urls.length; i += batchSize) {
			const batch = urls.slice(i, i + batchSize);
			const batchResults = await Promise.all(batch.map(url => cachedFetch(url)));
			results.push(...batchResults);
		}
		return results;
	};

	const excludedNames = [
		'Accroupi', 'Agachamentos', 'Beckenheben', 'Crunches HD', 'Dumbbell drag curls',
		'Dumbbell rear delt row', 'Dřepy', 'Dumbbell wide bicep curls'
	];
	const getObjectFormattedData =(arr,typeKey)=>{
		  const chartData = [];
		const formattedData = arr.filter((each) => typeKey === 'equipment'?each.equipment.length !== 0:true).reduce((acc, current) => {
			const value = typeKey === 'category' ? current?.category?.name : current.equipment[0]?.name;
			if (value) {
				acc[value] = (acc[value] || 0) + 1;
			}
			return acc;
		}, {})

		Object.keys(formattedData).forEach((key) => {
			chartData.push(typeKey === 'equipment'
				? { equipment: key, exercises: formattedData[key] }
				: { id: key, label: key, value: formattedData[key] }
			);
		});
		return chartData;
	}
	const uniqueByName = (array, key) => {
		const seen = new Set();
		return array.filter(item => {
			const keyValue = item[key];
			if (seen.has(keyValue)) {
				return false;
			} else {
				seen.add(keyValue);
				return true;
			}
		});
	};

	useEffect(() => {
		const fetchAllData = async () => {
			setLoading(true);
			const exerciseUrls = Array.from(
				{ length: Math.ceil(limit / batchSize) },
				(_, i) => `https://wger.de/api/v2/exerciseinfo?limit=${batchSize}&offset=${i * batchSize}`
			);
			try {
				const exerciseDataBatches = await fetchInBatches(exerciseUrls, batchSize);
				const allExercises = exerciseDataBatches.flatMap(batch => batch.results);
				setExercises(allExercises);
				const recordsWithImages = allExercises
					.filter((record) => record?.images.length !== 0 && record?.images[0]?.image.includes('.gif') && !excludedNames.includes(record.name));

				//CARD DATA MANIPULATION
				const uniqueRecordsWithImages = uniqueByName(recordsWithImages, 'name');
				setResponseWithImages(uniqueRecordsWithImages);

			  //ChartData Manipulation
				const pieChartData = getObjectFormattedData(allExercises, 'category');
				const barChartData = getObjectFormattedData(allExercises, 'equipment');

				setChartData({ pieChartData, barChartData });
			} catch (error) {
				
			} finally {
				 setLoading(false);
			}
		};
		fetchAllData();
	}, [limit]);

	return (
		<Box sx={{ background: theme.palette.customBackground.main }}>
			<Box className='text-3xl font-semibold mb-3 px-4 py-6' 
			sx={{ color:'#4B79A1',
				background: theme.palette.customBackground.light
				}}><SportsGymnastics sx={{fontSize:'35px'}} className='mr-3'/>{constants.featuredExercises}</Box>
				{
					!loading && 
				<Grid container direction="row" className='flex' spacing={2}>
					{responseWithImages.slice(0, 8).map((featured, i) => (
						<Grid item xs={12} sm={6} md={3} lg={3} key={i}>
							<Card className='w-full' sx={{ border: 'unset !important' }}>
								<Box className='' sx={{
									background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
								}}>
									<CardMedia
										component="img"
										image={featured.images[0].image}
										alt="exercise"
										sx={{
											objectFit: 'cover',
											objectPosition: 'center',
											width: '120px',
											height: '120px !important',
											borderRadius: '50%',
											margin: 'auto',
											position: 'relative',
											top: '25px'
										}}
										className='mt-3'
									/>
								</Box>
								<CardContent className='my-3 text-center'>
									<Box className='font-bold capitalize'>{featured?.name}</Box>
									<Box className='text-sm font-semibold text-neutral-500'>Category : {featured?.category?.name}</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
				}
			{loading && <Box className='text-center'><CircularProgress color="secondary"></CircularProgress></Box>}
			<Box className='text-3xl font-semibold my-5 px-4 py-6' sx={{ color: '#4B79A1', background: theme.palette.customBackground.light }}><SportsGymnastics sx={{ fontSize: '35px' }} className='mr-3' />{constants.chartSectionTitle}</Box>
			<Grid container direction='row' className='flex' spacing={2}>
				<Grid item xs={12} sm={12} md={12} lg={6}>
					<Paper sx={{height:'500px'}}>
						<Piechart data={chartData.pieChartData} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={6}>
					<Paper sx={{ height: '500px' }}>
						<BarChart data={chartData.barChartData} keys={['exercises']} />
					</Paper>
				</Grid>
			</Grid>
			<Facilities/>
		</Box>
	);
};

export default Dashboard;
