import styles from './page.module.scss';
import Task from '../(components)/task/task';

async function getTasks(date: string) {
  const data = await fetch(
    process.env.URL + `/api/tasks?filter=(plannedDate~'${date}')`,
    { cache: 'no-store' }
  );

  // Recommendation: handle errors
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data.json();
}

export default async function CalendarDayPage({
  params: { date }
}: {
  params: { date: string };
}) {
  const data = await getTasks(date);

  return (
    <div className={styles.container}>
      <div className={styles.container_head}>
        <h3>Tasks for {date}</h3>
      </div>
      {data.tasks?.items.length ? (
        <ul className={styles.tasks_list}>
          {data.tasks?.items?.map((el: any, index: number) => (
            <Task key={el.id} task={el} index={index}/>
          ))}
        </ul>
      ) : (
        <div className={styles.no_tasks}>
          <h4>No Tasks for this day</h4>
        </div>
      )}
    </div>
  );
}
