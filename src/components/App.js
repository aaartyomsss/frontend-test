import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { CircularProgress } from '@material-ui/core';
import Home from './Home';
import '../styles.css';
import { useError } from '../utils/customHooks';
import { useHistory } from 'react-router-dom'


export const App = () => {

  // State management
  const [ initLoading, setInitLoading] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ error, errorService ] = useError(null);
  const [ users, setUsers ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const history = useHistory();

  // function for fetching
  const fetchData = async (type) => {
    try {
      setLoading(true)
      const result = type === 'user' ? await api.getUsersDiff() : await api.getProjectsDiff();
      if (result.data.length === 0) {
        errorService.setErr('No more data to display');
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
      errorService.setErr('Error occured while fetching data. Please try again!');
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
