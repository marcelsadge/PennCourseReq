import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './index.css';
import HomePage from './components/HomePage';
import RecPage from './components/RecPage';

import courseList from './components/response.json';


function PennRec() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
        <Route path = "/rec" element = {<RecPage courseList={courseList} />}/>
      </Routes>
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PennRec />
  </React.StrictMode>
);
