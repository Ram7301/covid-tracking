import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
// index.tsx or App.tsx
import 'leaflet/dist/leaflet.css';

import logo  from "./images/logo.png"
import PieChartWithFilter from './views/PieChart';
import LineChartWithFilter from './views/LineChart';
import CovidMap from './views/MapView';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Pages',
  },
  {
    segment: 'pie-chart',
    title: 'Pie Chart',
    icon: <DashboardIcon />,
    
  },
  {
    segment: 'map',
    title: 'Map View',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'line-chart',
    title: 'Line Chart',
    icon: <BarChartIcon />,
  },
  {
    kind: 'divider',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
       <PieChartWithFilter />
       <LineChartWithFilter />
      <CovidMap />
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/pie-chart');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
    
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logo} alt="logo" />,
        title: 'Covid Tracking',
      }}
      key={router.pathname}
    >
      <DashboardLayout hideNavigation>
     
      <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
