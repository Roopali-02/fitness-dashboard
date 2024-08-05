import React from 'react';
import { Box, useTheme } from '@mui/material';
import {ResponsiveBar} from '@nivo/bar';
import constants from '../constants/index';

const BarChart = ({data,keys}) => {
	const theme = useTheme();
	const colors = ['#faaca8', '#f6d365', '#6f86d6', '#80d0c7', '#ff758c', '#89f7fe', '#667eea', '#38f9d7', '#ff7eb3','#00cdac'];
	const equipmentColors = {};

	// Generate a mapping between equipment names and colors
	data.forEach((item, index) => {
		if (!equipmentColors[item.equipment]) {
			equipmentColors[item.equipment] = colors[index % colors.length];
		}
	});
	return (
		<Box className='w-full h-full'>
			<Box variant="h6" component="div" className="font-bold text-center py-2 text-lg">
				{constants.barChartTitle}
			</Box>
			<ResponsiveBar
				data={data}
				keys={keys}
				indexBy="equipment"
				margin={{ top: 50, right: 130, bottom: 200, left: 80 }}
				padding={0.3}
				valueScale={{ type: 'linear',min:0,max:400 }}
				indexScale={{ type: 'band', round: true }}
				colors={(bar) => equipmentColors[bar.data.equipment]}
				borderRadius={1}
				borderColor={{
					from: 'color',
					modifiers: [
						['darker', 1.6]
					]
				}}
				 enableLabel={false}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 12,
					tickPadding: 5,
					tickRotation: -45,
					legend: 'Equipment',
					legendPosition: 'middle',
					legendOffset: 120
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Exercises',
					legendPosition: 'middle',
					legendOffset: -60
				}}
				enableTotals={true}
				totalsOffset={20}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: 'theme',
					modifiers: [
						['darker', 1.6]
					]
				}}
				labels={({ value }) => (
					
					<text
						x={0}
						y={-10}
						fill={theme.palette.text.primary} // Use theme palette for color
						fontSize={12}
						fontWeight={600}
						textAnchor="middle"
					>
						{value}
					</text>
					
				)}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'top-right',
						direction: 'column',
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 2,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: 'left-to-right',
						itemOpacity: 0,
						symbolSize: 20,
						effects: [
							{
								on: 'hover',
								style: {
									itemOpacity: 1
								}
							}
						]
					}
				]}
				theme={{
					axis: {
						ticks: {
							line: {
								stroke: theme.palette.text.primary, // Use theme palette for axis tick line color
								strokeWidth: 1,
							},
							text: {
								fontSize: 13,
								fontWeight:600,
								fill: theme.palette.text.primary,
								  // Customize font size for axis ticks
							}
						},
						legend: {
							text: {
								fontSize: 14,
								fontWeight:600,
								fill: theme.palette.text.primary,
							}
						}
					},
					legends: {
						text: {
							fontSize: 14, // Customize font size for legends
							fill: theme.palette.text.primary,
						}
					},
					tooltip: {
						container: {
							background: theme.palette.background.paper,
							color: theme.palette.text.primary, // Use theme palette for tooltip text color
						},
					},
				}}
				role="application"
				ariaLabel="Nivo bar chart demo"
				barAriaLabel={e => `${e.id}: ${e.formattedValue} exercises for ${e.indexValue}`}
			/>
		</Box>
	)
}

export default BarChart