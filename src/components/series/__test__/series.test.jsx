import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react';
import { SeriesProvider } from './../../../context/SeriesContext'
import Series from './../Series'

afterEach(cleanup)

describe('Series tests', () => {

  const wrapper = () => render(
    <SeriesProvider>
      <Series />
    </SeriesProvider>
  )
  
  it('All 3 appear', () => {

    const { getByLabelText } = wrapper()

    expect(getByLabelText('My pressure')).toBeInTheDocument()
    expect(getByLabelText('My happiness')).toBeInTheDocument()
    expect(getByLabelText('My life')).toBeInTheDocument()

  })

  it('All 3 switching correctly', () => {
    const { getAllByTestId } = wrapper()

    const charts = getAllByTestId(/chart/i)
    charts.forEach(chart => {
      fireEvent.click(chart)
      expect(chart.checked).toBe(false)
    })
  })
  
})
