// CovidMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

// Example data for states with COVID-19 cases (latitude, longitude, cases)
const stateData = [
    {
      name: 'Andhra Pradesh',
      position: [15.9129, 79.7400] as LatLngExpression,
      totalCases: 2200000,
      activeCases: 50000,
      recovered: 2100000,
      deaths: 50000,
    },
    {
      name: 'Arunachal Pradesh',
      position: [28.2180, 94.7278] as LatLngExpression,
      totalCases: 30000,
      activeCases: 500,
      recovered: 29000,
      deaths: 500,
    },
    {
      name: 'Assam',
      position: [26.1445,  91.7362] as LatLngExpression,
      totalCases: 1800000,
      activeCases: 100000,
      recovered: 1680000,
      deaths: 20000,
    },
    {
      name: 'Bihar',
      position: [25.0961, 85.3131] as LatLngExpression,
      totalCases: 1000000,
      activeCases: 20000,
      recovered: 950000,
      deaths: 20000,
    },
    {
      name: 'Chhattisgarh',
      position: [21.2787, 81.8661] as LatLngExpression,
      totalCases: 1100000,
      activeCases: 25000,
      recovered: 1050000,
      deaths: 20000,
    },
    {
      name: 'Goa',
      position: [15.2993, 74.1240] as LatLngExpression,
      totalCases: 80000,
      activeCases: 3000,
      recovered: 77000,
      deaths: 1000,
    },
    {
      name: 'Gujarat',
      position: [22.2587, 71.1924] as LatLngExpression,
      totalCases: 1200000,
      activeCases: 15000,
      recovered: 1150000,
      deaths: 10000,
    },
    {
      name: 'Haryana',
      position: [29.0588, 76.0856] as LatLngExpression,
      totalCases: 700000,
      activeCases: 10000,
      recovered: 680000,
      deaths: 7000,
    },
    {
      name: 'Himachal Pradesh',
      position: [31.1048, 77.1734] as LatLngExpression,
      totalCases: 50000,
      activeCases: 1000,
      recovered: 48000,
      deaths: 1000,
    },
    {
      name: 'Jharkhand',
      position: [23.6102, 85.2799] as LatLngExpression,
      totalCases: 300000,
      activeCases: 5000,
      recovered: 290000,
      deaths: 5000,
    },
    {
      name: 'Karnataka',
      position: [15.3173, 75.7139] as LatLngExpression,
      totalCases: 1500000,
      activeCases: 30000,
      recovered: 1450000,
      deaths: 20000,
    },
    {
      name: 'Kerala',
      position: [10.8505, 76.2711] as LatLngExpression,
      totalCases: 5000000,
      activeCases: 100000,
      recovered: 4850000,
      deaths: 40000,
    },
    {
      name: 'Madhya Pradesh',
      position: [22.9734, 78.6569] as LatLngExpression,
      totalCases: 800000,
      activeCases: 10000,
      recovered: 780000,
      deaths: 8000,
    },
    {
      name: 'Maharashtra',
      position: [19.7515, 75.7139] as LatLngExpression,
      totalCases: 10000000,
      activeCases: 200000,
      recovered: 9500000,
      deaths: 300000,
    },
    {
      name: 'Manipur',
      position: [24.6637, 93.9063] as LatLngExpression,
      totalCases: 50000,
      activeCases: 500,
      recovered: 48000,
      deaths: 1500,
    },
    {
      name: 'Meghalaya',
      position: [25.4670, 91.3662] as LatLngExpression,
      totalCases: 40000,
      activeCases: 800,
      recovered: 39000,
      deaths: 200,
    },
    {
      name: 'Mizoram',
      position: [23.1645, 92.9376] as LatLngExpression,
      totalCases: 15000,
      activeCases: 200,
      recovered: 14800,
      deaths: 100,
    },
    {
      name: 'Nagaland',
      position: [26.1584, 94.5624] as LatLngExpression,
      totalCases: 12000,
      activeCases: 150,
      recovered: 11800,
      deaths: 50,
    },
    {
      name: 'Odisha',
      position: [20.9517, 85.0985] as LatLngExpression,
      totalCases: 600000,
      activeCases: 10000,
      recovered: 590000,
      deaths: 6000,
    },
    {
      name: 'Punjab',
      position: [30.9009, 75.8573] as LatLngExpression,
      totalCases: 500000,
      activeCases: 8000,
      recovered: 490000,
      deaths: 2000,
    },
    {
      name: 'Rajasthan',
      position: [27.0238, 74.2170] as LatLngExpression,
      totalCases: 1200000,
      activeCases: 20000,
      recovered: 1170000,
      deaths: 5000,
    },
    {
      name: 'Sikkim',
      position: [27.5330, 88.5122] as LatLngExpression,
      totalCases: 10000,
      activeCases: 100,
      recovered: 9800,
      deaths: 100,
    },
    {
      name: 'Tamil Nadu',
      position: [11.1271, 78.6569] as LatLngExpression,
      totalCases: 8000000,
      activeCases: 150000,
      recovered: 7800000,
      deaths: 50000,
    },
    {
      name: 'Telangana',
      position: [17.0738, 78.6553] as LatLngExpression,
      totalCases: 2500000,
      activeCases: 60000,
      recovered: 2400000,
      deaths: 40000,
    },
    {
      name: 'Tripura',
      position: [23.9408, 91.9882] as LatLngExpression,
      totalCases: 30000,
      activeCases: 200,
      recovered: 29000,
      deaths: 800,
    },
    {
      name: 'Uttar Pradesh',
      position: [26.8467, 80.9462] as LatLngExpression,
      totalCases: 3500000,
      activeCases: 100000,
      recovered: 3400000,
      deaths: 50000,
    },
    {
      name: 'Uttarakhand',
      position: [30.3165, 78.0322] as LatLngExpression,
      totalCases: 400000,
      activeCases: 10000,
      recovered: 390000,
      deaths: 1000,
    },
    {
      name: 'West Bengal',
      position: [22.9868, 87.8550] as LatLngExpression,
      totalCases: 2000000,
      activeCases: 50000,
      recovered: 1950000,
      deaths: 50000,
    },
  ];
  
  

const CovidMap: React.FC = () => {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stateData.map((state, index) => (
        <Circle
          key={index}
          center={state.position}
          radius={Math.sqrt(state.totalCases) * 100} // Scale the radius based on total cases
          color="red"
          fillColor="red"
          fillOpacity={0.4}
        >
          <Popup>
            <div>
              <h3>{state.name}</h3>
              <p>Total Cases: {state.totalCases.toLocaleString()}</p>
              <p>Active Cases: {state.activeCases.toLocaleString()}</p>
              <p>Recovered: {state.recovered.toLocaleString()}</p>
              <p>Deaths: {state.deaths.toLocaleString()}</p>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default CovidMap;
