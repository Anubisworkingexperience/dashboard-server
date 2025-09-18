import React from 'react';
import styles from '../styles/dashboard.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li className={styles.tableButton}> Таблицы</li>
        <li>Отчеты</li>
        <li>Настройки</li>
        <li>Профиль</li>
      </ul>
    </aside>
  );
}
