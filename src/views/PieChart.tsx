// PieChartWithFilter.tsx
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { covidData } from '../db';
import { Data } from 'plotly.js';

const PieChartWithFilter: React.FC = () => {
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

  // Pie chart data setup
  const chartData: Data[] = selectedStateData
    ? [
        {
          values: [
            selectedStateData.activeCases,
            selectedStateData.recovered,
            selectedStateData.deaths,
          ],
          labels: ['Active Cases', 'Recovered', 'Deaths'],
          type: 'pie',
          textinfo: 'label+percent',
          hoverinfo: 'label+value',
          marker: {
            colors: ['#FF7F0E','#2CA02C','#1F77B4', ],
          },
        },
      ]
    : [];

  return (
    <div style={{ padding: '20px' }}>
      <h2>COVID-19 Cases in {selectedState}</h2>
      
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

      {/* Pie chart visualization */}
      {selectedStateData ? (
        <Plot
          data={chartData}
          layout={{
            title: {
              text: `COVID-19 Cases Distribution in ${selectedState}`,
              font: { size: 24 },
            },
            showlegend: true,
            legend: { font: { size: 16 } },
            width: 700, // Increase the width of the chart
            height: 700, // Increase the height of the chart
          }}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <p>No data available for the selected state.</p>
      )}

      {/* Displaying the total cases below the chart */}
      {selectedStateData && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Total Cases:</strong> {selectedStateData.totalCases.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default PieChartWithFilter;
