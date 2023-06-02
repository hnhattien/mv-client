import React from 'react'
import WidgetMovieLayout from './WidgetMovieLayout'

export default function Widget({
  topIMDBMovies, 
  topAnimationMovies, 
  topHorrorMovies,
  topSciMovies,
  topWeekendMovies,
  topMonthlyMovies,
  t}) {
  
  const data = [
    {
      title: t('top-imdb'),
      data: topIMDBMovies
    },
    {
      title: t('top-weekend-movies'),
      data: topWeekendMovies
    },
    {
      title: t('top-monthly-movies'),
      data: topMonthlyMovies
    },
    {
      title: t('top-animation-movies'),
      data: topAnimationMovies
    },
    {
      title: t("top-sci-fi-movies"),
      data: topSciMovies
    },
    {
      title: t("top-horror-movies"),
      data: topHorrorMovies
    },
    
  ]
  return (
    <div className='widget lg:w-2/5'>
      {data && data.map((widgetData, index) => {
        return <WidgetMovieLayout key={index} data={widgetData.data} title={widgetData.title} />
      })}
    </div>
  )
}
