import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, within } from '@testing-library/react'
import TableComponent from './TableComponent'
import api from '../lib/api/index'
import { mount } from 'enzyme'
import { usersDiff } from '../lib/api/data'

describe('Fetching mock data', () => {
    test('After initial fetching array has length 3', async () => {
        let data = []
        expect.assertions(1)
        const response = await api.getUsersDiff()
        expect(data.concat(response.data)).toHaveLength(3)
    })
})

describe('Table fetches and displays data', () => {
    let data = []
    let component
    beforeEach(() => {
        component = render(
            <TableComponent dataArray={data}/>
        )    
    })

    test('Renders table body', async () => {
        expect.assertions(1)
        const res = await api.getProjectsDiff()
        data.concat(res.data)
        expect(
            component.container.querySelector('#tableBody')
        ).toBeDefined()
        data = []
    })

    test('Table renders data properly', () => {
        data.forEach(obj => {
            const row = component.container.querySelector(`#${obj.id}`)
            const utils = within(row)
            expect(utils.getByText(obj.id)).toBeDefined()
        })
    })

})

describe('Table snapshot test', () => {
    const data = usersDiff
    const dataSortedNewestFirst = data.sort((a, b) => b.timestamp - a.timestamp)
    const dataSortedOldestFirst = data.sort((a, b) => a.timestamp - b.timestamp)
    const mockFunction = jest.fn()


    test('Filter by data is clickable', () => {
        const component = mount(<TableComponent dataArray={data} />)
        component.find('th#switchFilter').simulate('click')
        expect(component).toMatchSnapshot()
        component.unmount()
    })

    test('Fetch function is clickable', () => {
        const component = mount(<TableComponent dataArray={data} fetch={mockFunction}/>)
        component.find('button#fetch').simulate('click')
        expect(mockFunction).toHaveBeenCalled()
    })

    test('Initially table diplays newest first', () => {
        const component = mount(<TableComponent dataArray={data} />)
        expect(component.props().dataArray).toEqual(dataSortedNewestFirst)
    })

    test('Sorting by date works properly', () => {
        const component = mount(<TableComponent dataArray={data} />)
        component.find('th#switchFilter').simulate('click')
        expect(component.props().dataArray).toEqual(dataSortedOldestFirst)
    })

    test('After switching filter and fetching data, data is displayed according to the filter', () => {
        const initData = data.slice(0, 4)
        const addData = data.slice(4)
        const component = mount(<TableComponent dataArray={initData} />)
        component.find('th#switchFilter').simulate('click')
        component.setProps({ dataArray: initData.concat(addData)})
        expect(component.props().dataArray).toEqual(dataSortedOldestFirst)

    })
})