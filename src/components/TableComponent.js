import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { convertDate, sortByDate } from '../utils/helperFunctions';
import '../styles.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const createData = (obj) => {
    const { id, timestamp } = obj;
    const { oldValue, newValue } = obj.diff[0];
    return { id, timestamp, oldValue, newValue };
}

const useStyles = makeStyles((theme) => ({
    buttonAndLoading: {
        margin: '10px 0',
        [theme.breakpoints.down('sm')]: {
            height: '75%'
        }
    },
    error: {
        color: 'red',
        marginTop: 10,
        [theme.breakpoints.down('sm')]: {
            fontSize: 11
        }
    },
    tableHeader: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            margin: '10 0',
            padding: 0
        }
    },
    tableHeaderId: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'right',
            fontSize: 12,
            margin: '10 0',
            padding: '0 15 0 0'
        }
    },
    tableRow: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            margin: '5 0',
            padding: 0
        }
    },
    tableRowId: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'right',
            fontSize: 12,
            margin: '10 0',
            padding: '0 15 0 0'
        }
    },
    icon: {
        position: 'absolute',
    }
}))

const TableComponent = ({ dataArray, type, loading, fetch, errorMsg }) => {
    // Handling sorting by date 
    const [ filter, setFilter ] = useState('new');
    const classes = useStyles();

    // Formatting data
    const rows = sortByDate(dataArray.map(obj => createData(obj)), filter);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            id='switchFilter'
                            className={classes.tableHeader} 
                            onClick={() => setFilter(filter === 'new' ? 'old' : 'new')}>
                                <div>
                                    Date {filter === 'new' ? <ArrowUpwardIcon className={classes.icon}/> : <ArrowDownwardIcon className={classes.icon}/>}
                                </div>
                        </TableCell>
                        <TableCell className={classes.tableHeaderId}>{type === 'user' ? 'User ID' : 'Project ID'}</TableCell>
                        <TableCell className={classes.tableHeader}>Old Value</TableCell>
                        <TableCell className={classes.tableHeader}>New Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody id='tableBody'>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.tableRow}>{convertDate(row.timestamp)}</TableCell>
                            <TableCell className={classes.tableRowId}>{row.id}</TableCell>
                            <TableCell className={classes.tableRow}>{row.oldValue}</TableCell>
                            <TableCell className={classes.tableRow}>{row.newValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='centerElementsDiv'>
                {errorMsg ? <Typography className={classes.error}>{errorMsg}</Typography> : null}
                <div>
                    {loading 
                        ? <CircularProgress className={classes.buttonAndLoading}/> 
                        : <Button 
                            id='fetch'
                            color='primary' 
                            variant='contained' 
                            onClick={() => fetch(type)} 
                            className={classes.buttonAndLoading}>{errorMsg ? 'Retry' : 'Load More'}</Button>}
                </div>
            </div>
        </TableContainer>
    )

}

export default TableComponent;