import React from 'react';
import Nomination from './Nomination/Nomination';
import './Nominations.css';

const Nominations = (props) => {
  const nominations = props.nominations;
  const removeNomination = props.removeNomination;
  // console.log(('Nominations...', nominations);

  return (
    <div className="card">
      <div className="card-header">
        Nominations
      </div>
      <div className="card-body nominationsBody">
        {
          nominations.map((nomination) => {
            return (
              <div key={nomination.imdbID}>
                <Nomination nomination={nomination} removeNomination={removeNomination} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Nominations;