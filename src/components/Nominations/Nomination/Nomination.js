import React from 'react';

import './Nomination.css';

const Nomination = (props) => {
  const nomination = props.nomination;
  const removeNomination = props.removeNomination;
  // console.log(('In nomination', nomination);

  return (
    <div className="row align-items-center nominationDetails">
      <div className="col">
        <h5 className="card-title">{nomination.Title} - {nomination.Year}</h5>
      </div>
      <div className="col">
        <button type="button" className="btn btn-dark" onClick={() => removeNomination(nomination.imdbID)}>Remove</button>
      </div>
    </div>
  );
};

export default Nomination;