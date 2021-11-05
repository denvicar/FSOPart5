import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  test('for the form to send correct data', () => {
    const mockHandler = jest.fn()

    const component = render(
      <CreateForm
        createPost={mockHandler}
      />
    )

    const blogForm = component.container.querySelector('.createForm')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'titolo' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'autore' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'url' }
    })

    fireEvent.submit(blogForm)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('titolo')
    expect(mockHandler.mock.calls[0][0].author).toBe('autore')
    expect(mockHandler.mock.calls[0][0].url).toBe('url')
  })
})