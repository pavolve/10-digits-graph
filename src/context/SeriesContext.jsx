import React, { useState, createContext } from 'react'

export const SeriesContext = createContext()

export const SeriesProvider = (props) => {
  const [series, setSeries] = useState([
    {
      name: 'My pressure',
      show: true,
      color: `#${(Math.random() * 0xFF << 0).toString(16)}0000`,
      data: [],
    },
    {
      name: 'My happiness',
      show: true,
      color: `#00${(Math.random() * 0xFF << 0).toString(16)}00`,
      data: [],
    },
    {
      name: 'My life',
      show: true,
      color: `#0000${(Math.random() * 0xFF << 0).toString(16)}`,
      data: [],
    },
  ])

  return <SeriesContext.Provider value={[series, setSeries]}>{ props.children }</SeriesContext.Provider>

}