// LineChartWithFilter.tsx
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { covidData } from '../db';
import { Data } from 'plotly.js';

const LineChartWithFilter: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');

  // Prepare the options for the dropdown including a 'Total' option
  const states = ['Total', ...covidData.map((data) => data.state)];

  // Calculate total data across all states
  const totalData = covidData.reduce(
    (acc, data) => {
      acc.totalCases += data.totalCases;
      acc.activeCases += data.activeCases;
      acc.recovered += data.recovered;
      acc.deaths += data.deaths;
      return acc;
    },
    { totalCases: 0, activeCases: 0, recovered: 0, deaths: 0 }
  );

  // Find the selected state's data or use total data if 'Total' is selected
  const selectedStateData =
    selectedState === 'Total' ? totalData : covidData.find((data) => data.state === selectedState);

  // Line chart data setup
  const lineChartData: Data[] = selectedStateData
    ? [
        {
          x: ['Total Cases', 'Active Cases', 'Recovered', 'Deaths'],
          y: [
            selectedStateData.totalCases,
            selectedStateData.activeCases,
            selectedStateData.recovered,
            selectedStateData.deaths,
          ],
          type: 'scatter',
          mode: 'lines+markers',
          name: selectedState,
          line: { shape: 'linear' },
        },
      ]
    : [];

  return (
    <div style={{ padding: '20px' }}>
      <h2>COVID-19 Cases Overview for {selectedState}</h2>
      
      {/* State selection filter */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Select State</InputLabel>
        <Select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value as string)}
          label="Select State"
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Line chart visualization */}
      {selectedStateData ? (
        <Plot
          data={lineChartData}
          layout={{
            title: `COVID-19 Cases Trend in ${selectedState}`,
            xaxis: {
              title: 'Case Types',
            },
            yaxis: {
              title: 'Number of Cases',
            },
            width: 800, // Width of the line chart
            height: 600, // Height of the line chart
          }}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <p>No data available for the selected state.</p>
      )}
    </div>
  );
};

export default LineChartWithFilter;
