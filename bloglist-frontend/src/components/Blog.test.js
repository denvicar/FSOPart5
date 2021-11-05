import Blog from './Blog'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('<Blog />', () => {

  let component

  beforeEach(() => {
    component = render(<Blog blog={ { title: 'titolo', author: 'autore', url: 'url', likes: 2 } } />)
  })

  test('that detail is not showed by default', () => {
    const divGeneral = component.container.querySelector('.blogGeneral')
    expect(divGeneral).toBeDefined()
    const divDetail = component.container.querySelector('.blogDetail')
    expect(divDetail).toBeDefined()

    expect(divGeneral).toHaveTextContent('titolo autore')
    expect(divDetail).toHaveStyle('display: none')
  })

  test('that detail is shown if button is clicked', () => {
    const divDetail = component.container.querySelector('.blogDetail')
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(divDetail).toBeDefined()
    expect(divDetail).not.toHaveStyle('display: none')
    expect(divDetail).toHaveTextContent('url')
    expect(divDetail).toHaveTextContent('likes 2')

  })
})