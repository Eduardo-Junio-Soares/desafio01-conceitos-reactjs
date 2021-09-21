import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { isIfStatement } from '@babel/types';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle) {
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      }
  
      if(tasks.find((task) => task.title === newTask.title)) {
        alert('o titulo da Task não pode ser igual')
        return;
      }
  
      const arrTasks = tasks.concat(newTask)
      setTasks(arrTasks)
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const editTask = tasks.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }
      return task
    })
    setTasks(editTask)
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks.filter((task) => task.id !== id)
    setTasks(removeTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <div>
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
          </div>
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div data-id={task.id} className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}