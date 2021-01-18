import React from 'react';
import Movie from './Movie/Movie';
import './Movies.css';

const Movies = (props) => {
  const videos = props.videos;
  const searchString = props.searchString;
  const addNomination = props.addNomination;

  const header = searchString ? `Results for "${searchString}"` : 'Movies';
  // console.log(videos);
  return (
    <div className="card">
      <div className="card-header">
        {header}
      </div>
      <div className="card-body moviesBody">

        {/* <div>
          <h5 className="card-title">Movie Name</h5>
          <button type="button" className="btn btn-light">Button</button>
        </div> */}


        {videos.map((movie) => {
          // console.log(movie);
          return (
            <div key={movie.imdbID}>
              <Movie details={movie} addNomination={addNomination} />
            </div>
          );
        })}

        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
};

export default Movies;