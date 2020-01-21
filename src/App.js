import React from 'react'
import './App.css'
import VisChart from './components/vischart/VisChart'
import Series from './components/series/Series'
import { SeriesProvider } from './context/SeriesContext'

function App() {

  return (
    <SeriesProvider>
      <VisChart />
      <Series />
    </SeriesProvider>
  );
}

export default App
