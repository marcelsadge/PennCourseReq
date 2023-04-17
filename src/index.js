import "@fortawesome/fontawesome-free/css/all.min.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './components/Header/index';

import HomePage from './components/HomePage/index';
import RecPage from './components/RecPage/index';
import SettingsPage from './components/SettingsPage/index';
import Footer from "./components/Footer";

import './index.css';

import courseList from './components/response.json';


function PennRec() {
  return (
    <Router>
      <Footer />
      <Header />
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
        <Route path = "/rec" element = {<RecPage courseList={courseList} />}/>
        <Route path = "/settings" element = {<SettingsPage />}/>
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
