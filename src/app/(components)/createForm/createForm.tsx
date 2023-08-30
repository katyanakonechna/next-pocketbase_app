'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './createForm.module.scss';

const CreateForm = () => {
  const router = useRouter();
  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target;
    const formData = new FormData(form);
    const successPath = `/${formData.get('plannedDate')}`;
    const date = new Date(formData.get('plannedDate') as string).toISOString();
    formData.set('plannedDate', date);
    const records = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        urgent: formData.get('urgent') === 'on',
        plannedDate: formData.get('plannedDate')
      })
    });

    // Recommendation: handle errors
    if (!records.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    const data = await records.json();
    form.reset();
    router.refresh();
    router.push(successPath);
  };

  return (
    <form className={styles.create_form} method="post" onSubmit={submit}>
      <h3 className={styles.title}>Create new task</h3>
      <div className={styles.create_form_container}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" placeholder="Add title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Add description"
            name="description"
          />
        </div>
        <div className={styles.form_toggle}>
          <p>Urgent:</p>
          <input type="checkbox" id="urgent" name="urgent" />
          <label htmlFor="urgent">Urgent</label>
        </div>
        <div className="form-group">
          <label htmlFor="plannedDate">Date:</label>
          <input type="date" name="plannedDate" />
        </div>

        <button className="button-success medium" type="submit">
          Create a task
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
