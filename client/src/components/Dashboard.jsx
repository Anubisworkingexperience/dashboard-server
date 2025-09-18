import React, { useState } from 'react';
import CompanyGrid from './CompanyGrid';
import EmployeeGrid from './EmployeeGrid';

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div>
      <div className="panel">
        <CompanyGrid onSelectCompany={setSelectedCompany} />
      </div>

      <div className="panel">
        <h3>Сотрудники компании: {selectedCompany ? selectedCompany.name : '— (выберите компанию)'}</h3>
        <EmployeeGrid company={selectedCompany} />
      </div>
    </div>
  );
}
