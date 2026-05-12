import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Harness Flow Board', () => {
  it('renders the seeded workflow board', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /harness flow board/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Clarify workflow scope')).toBeInTheDocument()
    expect(screen.getByText('Draft execution handoff')).toBeInTheDocument()
  })

  it('filters tasks by status', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Done' }))

    expect(screen.getByText('Clarify workflow scope')).toBeInTheDocument()
    expect(screen.queryByText('Draft execution handoff')).not.toBeInTheDocument()
  })

  it('adds a task from the input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New task'), 'Write QA notes')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByText('Write QA notes')).toBeInTheDocument()
  })

  it('persists added tasks across remounts', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    await user.type(screen.getByLabelText('New task'), 'Persist QA task')
    await user.click(screen.getByRole('button', { name: 'Add task' }))
    expect(screen.getByText('Persist QA task')).toBeInTheDocument()

    unmount()
    render(<App />)

    expect(screen.getByText('Persist QA task')).toBeInTheDocument()
  })
})
