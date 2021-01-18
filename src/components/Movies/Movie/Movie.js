import React from 'react';

import './Movie.css';

const Movie = (props) => {
  const details = props.details;
  const addNomination = props.addNomination;
  const isDisabled = details.isNominated;

  // console.log((details);
  // console.log((isDisabled);

  return (
    <div className="row align-items-center movieDetails">
      <div className="col">
        <p className="card-title">{details.Title} ({details.Year})</p>
      </div>
      <div className="col">
        <button type="button" className="btn btn-dark btn-sm" disabled={isDisabled} onClick={() => addNomination(details.imdbID)}>Nominate</button>
      </div>
    </div>
  );
};

export default Movie;