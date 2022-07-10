import React from 'react';

import './Style/custom.css';
import './Style/MoviesList.css';

import {useSelector} from 'react-redux';

import VisibilityFilterInput from './VisibilityFilterInput.jsx';
import MovieCard from './MovieCard';


function MoviesList(props) {

  const movies = useSelector((state) => state.movies);
  let filteredMovies = movies;

  const vFilter = useSelector((state) => state.visibilityFilter);

  /**
   * checks whether the input matches any movie title
   */
  if (vFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(vFilter.toLowerCase()));
  }

  if (!movies) {
    return <div className='main-view'></div>
  }

  return <>
    
    <VisibilityFilterInput className="v-filter" visibilityFilter={vFilter}/>
    
    
      {filteredMovies.map(m => (
        <MovieCard movie={m} key={m._id} className="movie-card"/>
    ))}
   
  </>
}

// export default connect(mapStateToProps)(MoviesList);
export default MoviesList;
