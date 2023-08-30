import Calendar from './(components)/calendar/calendar';

async function getData() {
  const records = await fetch(process.env.URL + '/api/tasks', {
    cache: 'no-cache'
  });

  // Recommendation: handle errors
  if (!records.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return records.json();
}

export default async function CalendarPage() {
  const data = await getData();

  return <Calendar {...data} />;
}
