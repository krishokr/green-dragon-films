import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import VisibilityFilterInput from './VisibilityFilterInput';
import Header from './Header';
import MoviesList from './MoviesList';
import Row from 'react-bootstrap/Row';

export default function SearchView() {

  const movies = useSelector((state) => state.movies);
  const vFilter = useSelector((state) => state.visibilityFilter);
  let filteredMovies = movies;

  /**
   * filters movies based on movie title
   */
  if (vFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(vFilter.toLowerCase()));
  }


  return (
    <div>
      <Header/>
      <Row className="movie-list-container">
        <MoviesList movies={movies}/>
      </Row>
    </div>
  )
}
