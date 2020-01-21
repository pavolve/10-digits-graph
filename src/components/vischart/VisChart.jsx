import React, { useContext, useEffect } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineMarkSeries } from 'react-vis'
import { SeriesContext } from '../../context/SeriesContext'

const START_TIME = Date.now()

const VisChart = () => {
  const [series, setSeries] = useContext(SeriesContext)

  const URL = 'http://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8'

  const getPoint = (url) => {
    return new Promise(resolve => {
      fetch(url)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => console.error(error))
    })
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      let request = null

      const promises = await series.map(async (item) => {
        if (item.show)
          request = await getPoint(URL)
        else
          request = null
        return request
      })

      await Promise.all(promises)
      .then(points => {
        let newPoints = [...series]

        newPoints.forEach((item, index) => {
          if (points[index]) {
            if (item.data.length === 10)
              item.data.shift()
            item.data.push({x: Math.round(Date.now() - START_TIME) / 1000, y: points[index].data[0]})
          } else
            item.data = []
        })

        setSeries(newPoints)
      })
    }, 1000)

    return () => clearTimeout(timer)

  }, [series, setSeries])

  const seriesList = series.map(item => {
    if (item.show)
      return <LineMarkSeries curve={'curveMonotoneX'} key={item.name} data={item.data} color={item.color} />
    return null
  })

  return (
    <XYPlot height={480} width={1024}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Time from start in sec" tickFormat={v => `${v}s`} tickLabelAngle={-45} />
      <YAxis title="Random" tickTotal={10} tickValues={[25, 50, 75, 100, 125, 150, 175, 200, 225, 250]} />
      {seriesList}
    </XYPlot>
  )
}

export default VisChart
