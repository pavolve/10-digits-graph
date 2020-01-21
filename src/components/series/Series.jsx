import React, { useContext } from 'react'
import { SeriesContext } from '../../context/SeriesContext'

const Series = () => {

  const [series, setSeries] = useContext(SeriesContext)

  const handleSeries = (i) => {
    const currentSeries = [...series]
    const updatedSeries = currentSeries.map((item, index) => {
      if (index === i)
        item.show = !item.show
      return item
    })
    setSeries(updatedSeries)
  }

  return (
    <div className="list">
      {series.map((item, index) => (
        <div key={item.name}>
          <label style={{color: item.color}}>
            <input type="checkbox" checked={item.show} onChange={() => handleSeries(index)} data-testid={`chart${index}`} /> {item.name}</label>
        </div>
      ))}
    </div>
  )
}

export default Series
