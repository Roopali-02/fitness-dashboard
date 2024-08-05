import React from 'react';
import {ResponsivePie} from '@nivo/pie';
import { Box, useTheme } from '@mui/material';
import constants from '../constants/index';

const Piechart = ({data}) => {
  const theme = useTheme();
  const colors = [
    "rgb(244, 117, 96)", "rgb(241, 225, 91)", "rgb(216, 180, 149)", "rgb(90, 191, 174)", "rgb(216, 156, 52)",
    "#26a0da", "#B06AB3", "#4481eb", "#56ab2f"
  ];

  
  return (
    <Box className='w-full h-full'>
    	<Box variant="h6" component="div" className="font-bold text-center py-2 text-lg">
        {constants.pieChartTitle}
			</Box>
      <ResponsivePie
        data={data}
        margin={{ top: 80, right: 10, bottom: 80, left: 5 }}
        innerRadius={0.65}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        arcLinkLabelsSkipAngle={1}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={1}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              3
            ]
          ]
        }}
         colors={colors}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: -80,
            translateY: -40,
            itemsSpacing: 0,
            itemWidth: 10,
            itemHeight: 22,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 10,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
        theme={{
          labels: {
            text: {
              fontSize: 12, 
              fontWeight: 600, 
              fill: theme.palette.text.primary,
            }
          },
          legends: {
            text: {
              fontSize: 12, // Customize font size for legends
              fill: theme.palette.text.primary,
            }
          },
          arcLinkLabels: {
            text: {
              fontSize: 12, // Customize font size for arc link labels
              fontWeight: 500, // Customize font weight for arc link labels
              fill: theme.palette.text.primary, // Use theme palette for arc link label color
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary, // Use theme palette for tooltip text color
            },
          },
        }}
      />
    </Box>
  )
}

export default Piechart