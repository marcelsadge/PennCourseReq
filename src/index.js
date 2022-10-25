import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './index.css';
import HomePage from './components/HomePage';

function PennRec() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
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
