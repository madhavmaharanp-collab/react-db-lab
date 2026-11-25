export default function TaskItem({ task, displayNumber, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' is-done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <span>{displayNumber}. {task.title}</span>
      </label>
      <button
        type="button"
        className="ghost"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  )
}
