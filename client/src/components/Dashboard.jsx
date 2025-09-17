import React, { useState } from 'react';
import CompanyGrid from './CompanyGrid';
import EmployeeGrid from './EmployeeGrid';

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div>
      <h1>Компании и сотрудники</h1>
      <div className="panel">
        <CompanyGrid onSelectCompany={setSelectedCompany} />
      </div>

      <div className="panel">
        <h3>Сотрудники компании: {selectedCompany ? selectedCompany.name : '— (select a company)'}</h3>
        <EmployeeGrid company={selectedCompany} />
      </div>
    </div>
  );
}
