'use client';

import { week } from '@/app/(constants)';
import {
  getCurrentMonth,
  getCurrentMonthDays,
  getISOData,
  getNormalizedData,
  getNormalizedDataForPath,
  getPreviousMonthDays,
  isSameData
} from '@/app/(helpers)';
import { ITask } from '@/app/(types)';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faCaretRight,
  faCaretLeft
} from '@fortawesome/free-solid-svg-icons';
import styles from './calendar.module.scss';

interface ICalendar {
  tasks: {
    items: ITask[];
  };
}
const Calendar: React.FC<ICalendar> = (props) => {
  const [lastMonthDays, setLastMonthDays] = React.useState<number[]>();
  const [days, setDays] = React.useState<number[]>();
  const [activeMonth, setActiveMonth] = React.useState(getCurrentMonth());
  const [activeYear, setActiveYear] = React.useState(new Date().getFullYear());
  const [today, setToday] = React.useState(new Date().getDate());

  const changeMonth = (isNext?: boolean) => {
    setActiveMonth((month) => {
      if (isNext && month > 1) {
        return month - 1;
      } else if (isNext && month === 1) {
        setActiveYear((year) => year - 1);
        return 12;
      } else if (!isNext && month === 12) {
        setActiveYear((year) => year + 1);
        return 1;
      } else if (!isNext) {
        return month + 1;
      }
      return month;
    });
  };

  const goToCurrentDate = () => {
    setActiveMonth(getCurrentMonth());
  };

  const isCurrentMonth = () => {
    return activeMonth === getCurrentMonth();
  };

  React.useEffect(() => {
    setLastMonthDays(getPreviousMonthDays(activeYear, activeMonth));
    setDays(getCurrentMonthDays(activeYear, activeMonth));
  }, [activeMonth, activeYear]);

  React.useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        changeMonth(event.key === 'ArrowLeft');
      }
    };
    document.addEventListener('keydown', handleEvent);
    return () => {
      document.removeEventListener('keydown', () => false);
    };
  }, []);

  const isToday = (day: number) => {
    return isSameData(
      getISOData(day, activeMonth, activeYear),
      new Date().toDateString()
    );
  };

  const showToday = () => {
    setActiveMonth(getCurrentMonth);
    setActiveYear(new Date().getFullYear());
  };

  const getCountOfAllTasks = (day: number): number => {
    return props.tasks.items?.filter(
      (item) =>
        item?.plannedDate &&
        isSameData(item.plannedDate, getISOData(day, activeMonth, activeYear))
    ).length;
  };

  const isAllTaskDone = (day: number): boolean => {
    return (
      getCountOfDoneTasks(day) === getCountOfAllTasks(day) &&
      getCountOfAllTasks(day) > 0
    );
  };
  const getCountOfDoneTasks = (day: number): number => {
    return props.tasks.items?.filter(
      (item) =>
        item?.plannedDate &&
        isSameData(
          item.plannedDate,
          getISOData(day, activeMonth, activeYear)
        ) &&
        item.done
    ).length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendar_grid}>
        <div>
          <h2 className={styles.calendar_date}>
            {getNormalizedData(activeMonth, activeYear)}
          </h2>
        </div>
        <div>
          <div className={styles.tool_bar}>
            <div className={styles.tool_bar_navigation}>
              <button
                className="button-outline-primary small"
                onClick={() => changeMonth(true)}
              >
                <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
              </button>
              <button
                className="button-outline-primary small"
                onClick={goToCurrentDate}
                disabled={isCurrentMonth()}
              >
                Today
              </button>
              <button
                className="button-outline-primary small"
                onClick={() => changeMonth()}
              >
                <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
              </button>
            </div>
          </div>
          <div className={styles.calendar_head}>
            {week.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <ul className={styles.calendar_list}>
            {lastMonthDays &&
              lastMonthDays.map((item: number) => (
                <li className={styles.inactive_day} key={item}>
                  {item}
                </li>
              ))}
            {days &&
              days.map((day: number) => (
                <Link
                  className={isToday(day) ? styles.active_day : styles.day}
                  key={day}
                  href={`/${getNormalizedDataForPath(
                    day,
                    activeMonth + 1,
                    activeYear
                  )}`}
                >
                  <span>{day}</span>
                  <div className={styles.info}>
                    <span>
                      {getCountOfDoneTasks(day)}/{getCountOfAllTasks(day)}
                    </span>
                    {isAllTaskDone(day) && (
                      <FontAwesomeIcon
                        className={styles.check_mark}
                        icon={faSquareCheck}
                      />
                    )}
                  </div>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
