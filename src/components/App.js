import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { CircularProgress } from '@material-ui/core';
import Home from './Home';
import '../styles.css';
import { useHistory } from 'react-router-dom'


export const App = () => {

  // State management
  // As app is simple, built-in hooks would be a sufficient solution
  const [ initLoading, setInitLoading] = useState(false); // Handles loading state when page is open for the first time
  const [ loading, setLoading ] = useState(false); // Handles general loading, when button is pressed
  const [ error, setError ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const history = useHistory(); // As react router is used, after initial loading user will be pushed to users tab

  // Fetching data
  const fetchData = async (type) => {
    try {
      setError(null)
      setLoading(true)
      const result = type === 'user' ? await api.getUsersDiff() : await api.getProjectsDiff();
      if (result.data.length === 0) {
        setError('No more data to display');
      }
      const updatedList = type === 'user' ? users.concat(result.data) : projects.concat(result.data);
      setLoading(false);
      if (type === 'user') {
        setUsers(updatedList);
      } else {
        setProjects(updatedList);
      }
    } catch (error) {
      setLoading(false)
      console.error(error.message);
      setError('Error occured while fetching data. Please try again!');
    }
  };

  // Fetching initial data when loading page
  useEffect(() => {
    try {
      setInitLoading(true);
      const fetchInitialData = async () => {
        const resultUsers = await api.getUsersDiff();
        const resultProjects = await api.getProjectsDiff();
        setInitLoading(false);
        setProjects(resultProjects.data);
        setUsers(resultUsers.data);
        history.push('/users')
      };
      fetchInitialData();
    } catch (error) {
      setInitLoading(false);
      console.error(error.message);
    }
  }, [history])

  // Displays loading circle when page is first opened
  if(initLoading) {
    return (
      <div className='centerParent'>
        <div className='centerElements'>
          <CircularProgress/> 
        </div>
      </div>
    )
  }

  return (
      <Home errorMsg={error} fetch={fetchData} loading={loading} users={users} projects={projects} id='home'/>
  );
};

export default App;
