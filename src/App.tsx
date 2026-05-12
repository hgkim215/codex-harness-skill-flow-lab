import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Status = 'todo' | 'doing' | 'done'
type Priority = 'low' | 'medium' | 'high'

type Task = {
  id: number
  title: string
  status: Status
  priority: Priority
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Clarify workflow scope',
    status: 'done',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Inspect baseline evidence',
    status: 'doing',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Draft execution handoff',
    status: 'todo',
    priority: 'high',
  },
]

const storageKey = 'harness-flow-board-tasks'

const statusLabels: Record<Status | 'all', string> = {
  all: 'All',
  todo: 'Todo',
  doing: 'Doing',
  done: 'Done',
}

function isStatus(value: unknown): value is Status {
  return value === 'todo' || value === 'doing' || value === 'done'
}

function isPriority(value: unknown): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high'
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'number' &&
    Number.isFinite(candidate.id) &&
    typeof candidate.title === 'string' &&
    isStatus(candidate.status) &&
    isPriority(candidate.priority)
  )
}

function loadInitialTasks(): Task[] {
  try {
    const savedTasks = window.localStorage.getItem(storageKey)

    if (savedTasks === null) {
      return initialTasks
    }

    const parsed: unknown = JSON.parse(savedTasks)

    if (Array.isArray(parsed) && parsed.every(isTask)) {
      return parsed
    }
  } catch {
    return initialTasks
  }

  return initialTasks
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks)
  const [draft, setDraft] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [tasks])

  const visibleTasks = useMemo(() => {
    if (statusFilter === 'all') {
      return tasks
    }

    return tasks.filter((task) => task.status === statusFilter)
  }, [statusFilter, tasks])

  const totals = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((task) => task.status === 'todo').length,
      doing: tasks.filter((task) => task.status === 'doing').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = draft.trim()

    if (!title) {
      return
    }

    setTasks((currentTasks) => {
      const nextId =
        currentTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1

      return [
        ...currentTasks,
        {
          id: nextId,
          title,
          status: 'todo',
          priority: 'medium',
        },
      ]
    })

    setDraft('')
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Codex skill flow lab</p>
          <h1>Harness Flow Board</h1>
        </div>
        <p className="header-copy">
          A compact task board used to test interview, analysis, planning,
          execution, QA, visual QA, and review handoffs.
        </p>
      </header>

      <section className="summary-grid" aria-label="Task summary">
        {(Object.keys(totals) as Array<keyof typeof totals>).map((key) => (
          <article className="summary-card" key={key}>
            <span>{statusLabels[key]}</span>
            <strong>{totals[key]}</strong>
          </article>
        ))}
      </section>

      <section className="board-panel">
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">New task</label>
          <div>
            <input
              id="task-title"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a workflow task"
            />
            <button type="submit">Add task</button>
          </div>
        </form>

        <div className="filter-row" aria-label="Status filters">
          {(Object.keys(statusLabels) as Array<Status | 'all'>).map((status) => (
            <button
              aria-pressed={statusFilter === status}
              className={statusFilter === status ? 'active' : ''}
              key={status}
              onClick={() => setStatusFilter(status)}
              type="button"
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>

        <div className="task-list" aria-label="Tasks">
          {visibleTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div>
                <h2>{task.title}</h2>
                <p>{statusLabels[task.status]}</p>
              </div>
              <span className={`priority priority-${task.priority}`}>
                {task.priority}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
