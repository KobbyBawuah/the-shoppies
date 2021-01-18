import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Movies from './components/Movies/Movies';
import Nominations from './components/Nominations/Nominations';

function App() {
  const cachedNominations = localStorage.getItem('nominations') ? JSON.parse(localStorage.getItem('nominations')) : [];
  const [nominations, setNominations] = useState(cachedNominations);
  const [searchString, setSearchString] = useState('');
  const [data, setData] = useState({videos: []});
  const firstLoad = useRef(true);


  useEffect(async () => {
    const result = await axios(
      `http://www.omdbapi.com/?apikey=f5527810&s=${searchString}`,
    );

    const data = result.data.Search ? result.data.Search: [];

    const noms = new Set(nominations.map((nomination) => nomination.imdbID));
    // console.log(('noms...', noms);
    const newData = data.map((video) => {
      return {...video, 'isNominated': noms.has(video.imdbID)};
    });

    // console.log('Temp', temp);
    // console.log('Result', data);
    setData({videos: newData});
  }, [searchString]);

  useEffect(() => {
    if(firstLoad.current){
      firstLoad.current = false;
      return;
    }
    // console.log(('Calling set item');
    localStorage.setItem('nominations', JSON.stringify(nominations));
    // console.log((localStorage.getItem('nominations'));
  }, [nominations])

  const onSearch = (val) => {
    // console.log((val);
    setSearchString(val);
  }

  const callToast = () => toast("5 movies have been nominated.");

  // Add useCallback hook
  const addNomination = (key) => {
    const alreadyNominated = nominations.some(nomination => nomination.imdbID === key);
    if(nominations.length === 5 || alreadyNominated){
      return;
    }
    const oldLength = nominations.length;

    // Modify nomination lists
    const nomination = data.videos.find((video) => video.imdbID === key);
    nomination.isNominated = true;
    setNominations(oldNominations => [...oldNominations, nomination]);

    // Modify movies list
    const newData = data.videos.filter((video) => video.imdbID !== key);
    newData.push(nomination)
    setData({videos: newData});

    // console.log(('Nominations length', nominations.length);
    if(oldLength + 1 === 5){
      return callToast();
    }
  };

  const removeNomination = (key) => {
      if(nominations.length === 0){
        return;
      }

      // console.log((nominations);
      const nomination = nominations.find((video) => video.imdbID === key);
      const newNominations = nominations.filter((video) => video.imdbID !== key);
      setNominations(newNominations);

      // Modify movies list
      nomination.isNominated = false;
      const newData = data.videos.filter((video) => video.imdbID !== key);
      newData.push(nomination);

      setData({videos: newData});
  };

  const modOnSearch = _.debounce(onSearch, 500);

  return (
    <div className="App container-fluid">

      <div className="app-header">
        <h1>The Shoppies</h1>
      </div>

      <div className="container-fluid app-container">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => modOnSearch(e.target.value) }></input>
        </div>
      </div>

      {/* {data.videos.map((movie) => {
        return <Movies />;
      })} */}

      <div className="container">
        <div className="row">
          <div className="col-md">
            <Movies videos={data.videos} searchString={searchString} addNomination={addNomination} />
          </div>
          <div className="col-md">
            <Nominations nominations={nominations} removeNomination={removeNomination} />
          </div>
        </div>
      </div>

      <ToastContainer autoClose={4000}/>
    </div>
  );
}

export default App;
