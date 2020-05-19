import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="mintsplash.net"/>)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('mintsplash.net')
  })

  test('after creation span should be displayed', () => {
    const component = create(<ProfileStatus status="mintsplash.net"/>)

    const root = component.root
    const span = root.findByType('span')
    expect(span).not.toBeNull()
  })

  test('after creation input shouldn\'t be displayed', () => {
    const component = create(<ProfileStatus status="mintsplash.net"/>)

    const root = component.root

    expect(() => {
      const input = root.findByType('input')
    }).toThrow()
  })

  test('after creation span should contains correct status', () => {
    const component = create(<ProfileStatus status="mintsplash.net"/>)

    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toBe('mintsplash.net')
  })

  test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status="mintsplash.net"/>)

    const root = component.root
    const span = root.findByType('span')
    span.props.onDoubleClick()
    const input = root.findByType('input')
    expect(input.props.value).toBe('mintsplash.net')
  })

  test('callback shoud be colled', () => {
    const mockCollback = jest.fn()
    const component = create(
      <ProfileStatus
        status="mintsplash.net"
        updateStatus={mockCollback}
      />
    )
    const instance = component.getInstance()
    instance.deactivateEditMode()
    expect(mockCollback.mock.calls.length).toBe(1)
  })
})
