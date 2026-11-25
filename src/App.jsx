import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import * as taskService from './services/taskService'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    taskService
      .getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(title) {
    try {
      const created = await taskService.addTask(title)
      setTasks((prev) => [created, ...prev])
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(task) {
    try {
      const updated = await taskService.toggleTask(task.id, !task.completed)
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await taskService.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const remaining = tasks.filter((t) => !t.completed).length

  return (
    <main className="app">
      <header>
        <h1>Task lab</h1>
        <p className="count">
          {loading ? 'Loading…' : `${remaining} of ${tasks.length} left to do`}
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </main>
  )
}
