'use client';
import { ITask, ITaskParams } from '@/app/(types)';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler } from 'react';
import styles from './task.module.scss';

async function putTask(id: string, params: ITaskParams) {
  const data = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    cache: 'force-cache'
  });

  // Recommendation: handle errors
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Update task failed');
  }

  return data.json();
}

async function deleteTask(id: string) {
  const data = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
    cache: 'force-cache'
  });

  // Recommendation: handle errors
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Update task failed');
  }

  return data.json();
}

const Task = ({ task, index }: { task: ITask; index: number }) => {
  const [done, toggleDone] = React.useState(Boolean(task.done));
  const [isEdit, toggleEdit] = React.useState(Boolean(task.done));
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const router = useRouter();

  const toggleDoneTask = async () => {
    toggleDone(!done);
    await putTask(task.id, { done: done });
    router.refresh();
  };

  const updateTask = async () => {
    await putTask(task.id, { title, description });
    toggleEdit(!isEdit);
    router.refresh();
  };

  const removeTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteTask(task.id);
    router.refresh();
  };

  return (
    <li>
      {isEdit ? (
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              placeholder="Add description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="button-success medium" onClick={updateTask}>
            Update
          </button>
        </div>
      ) : (
        <label className={styles.task} htmlFor="isDone">
          <input
            id="isDone"
            type="checkbox"
            name="isDone"
            checked={done}
            onChange={toggleDoneTask}
          />
          <div>
            <h4 className={done ? styles.done_task : ''}>{task.title}</h4>
            <p className={done ? styles.done_task : ''}>{task.description}</p>
          </div>
          <div className={styles.task_action}>
            <button className={styles.delete_button} onClick={removeTask}>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
            <button
              className={styles.edit_button}
              onClick={() => toggleEdit(!isEdit)}
            >
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </button>
          </div>
        </label>
      )}
    </li>
  );
};

export default Task;
