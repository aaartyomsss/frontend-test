import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { shallow, mount } from 'enzyme'
import NavBar from './NavBar'
import { BrowserRouter as Router } from 'react-router-dom'

describe('NavBar component', () => {

    test('Component renders corectly', () => {
        const component = shallow(<NavBar/>)
        expect(component).toBeDefined()
    })


    test('Component has 2 buttons', () => {
        const component = render(<Router><NavBar/></Router>)
        expect(component.container.querySelectorAll('button')).toHaveLength(2)
    })

    test('Button is clickable', () => {
        const component = mount(<Router><NavBar/></Router>)
        component.find('button#navBarTest').simulate('click')
        expect(component).toMatchSnapshot()
        component.unmount()
    })
})