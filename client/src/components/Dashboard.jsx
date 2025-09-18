import React, { useState } from 'react';
import CompanyGrid from './CompanyGrid';
import EmployeeGrid from './EmployeeGrid';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div>
      <div className={styles.panel}>
        <CompanyGrid onSelectCompany={setSelectedCompany} />
      </div>

      <div className="panel">
        <EmployeeGrid company={selectedCompany} />
      </div>
    </div>
  );
}
