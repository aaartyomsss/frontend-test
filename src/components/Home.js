import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TableComponent from './TableComponent';
import NavBar from './NavBar';

const Home = ({ users, projects, loading, fetch, errorMsg }) => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path='/users'>
                    <TableComponent type={'user'} dataArray={users} loading={loading} fetch={fetch} errorMsg={errorMsg}/>
                </Route>

                <Route path='/projects'>
                    <TableComponent type={'project'} dataArray={projects} loading={loading} fetch={fetch} errorMsg={errorMsg}/>
                </Route>
            </Switch>
        </div>
    )

}

export default Home;