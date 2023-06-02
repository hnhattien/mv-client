import { get } from 'lodash'
import React from 'react'
import FilmPostLayoutSmall from './FilmPostLayoutSmall'

export default function WidgetMovieLayout({title, data}) {
  return (
    <div style={{backgroundColor: 'rgba(10,10,10,0.7)'}} className='widget-movie pt-5 mt-5'>
      <h4 className='text-cyan-500 font-semibold text-lg pl-5'>{title}</h4>
      <div className='widget-movie-content mt-5'>
        <ul className='list-inside sm:pl-5'>
          {Array.isArray(data) && data.map((movie, index) => {
            return <FilmPostLayoutSmall index={get(movie, 'id', index)} data={movie}/>
          })}
        </ul>
      </div>
    </div>
  )
}
