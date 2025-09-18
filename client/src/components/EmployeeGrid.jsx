import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchEmployeesByCompany, createEmployee, updateEmployee, deleteEmployee } from '../api';
import { themeQuartz } from 'ag-grid-community';

export default function EmployeeGrid({ company }) {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    { field: 'id', width: 80 },
    { field: 'full_name', headerName: 'Name', flex: 1 },
    { field: 'salary' },
    { field: 'hired_date', headerName: 'Hired' },
    { field: 'age' }
  ];

  useEffect(() => {
    if (company && company.id) {
      loadEmployees(company.id);
    } else {
      setRowData([]);
    }
  }, [company]);

  const loadEmployees = async (companyId) => {
    try {
      const resp = await fetchEmployeesByCompany(companyId);
      setRowData(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleAdd = async () => {
    if (!company) { alert('Выберите компанию!'); return; }
    const full_name = prompt('Полное имя сотрудника:');
    if (!full_name) return;
    const salary = parseFloat(prompt('Зарплата:', '0')) || 0;
    const hired_date = prompt('Дата найма (YYYY-MM-DD):', '');
    const age = parseInt(prompt('Возраст:', '30')) || null;
    try {
      await createEmployee({ company_id: company.id, full_name, salary, hired_date, age });
      loadEmployees(company.id);
    } catch (err) {
      alert('Введены не все данные или они некорректны');
      console.error(err, 'Error creating employee');
    }
  };

  const handleEdit = async () => {
    const selected = gridApi.getSelectedRows()[0];
    if (!selected) { alert('Выберите сотрудника!'); return; }
    const full_name = prompt('Полное имя сотрудника:', selected.full_name) || selected.full_name;
    const salary = parseFloat(prompt('Зарплата:', String(selected.salary))) || 0;
    const hired_date = prompt('Дата найма(YYYY-MM-DD):', selected.hired_date) || selected.hired_date;
    const age = parseInt(prompt('Возраст:', String(selected.age))) || selected.age;
    try {
      await updateEmployee(selected.id, { company_id: selected.company_id, full_name, salary, hired_date, age });
      loadEmployees(company.id);
    } catch (err) {
      alert('Введены не все данные или они некорректны');
      console.error(err, 'Error updating');
    }
  };

  const handleDelete = async () => {
    const selected = gridApi.getSelectedRows()[0];
    if (!selected) { alert('Выберите сотрудника!'); return; }
    if (!window.confirm('Удалить сотрудника?')) return;
    try {
      await deleteEmployee(selected.id);
      loadEmployees(company.id);
    } catch (err) {
      alert('Ошибка удаления сотрудника');
      console.error(err, 'Error deleting');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <h6>Сотрудники</h6>
        <button onClick={handleAdd}>Добавить запись</button>{' '}
        <button onClick={handleEdit}>Изменить</button>{' '}
        <button onClick={handleDelete}>Удалить</button>
      </div>

      <div style={{ height: 300 }}>
        <AgGridReact
        theme={themeQuartz}
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection={{mode: 'singleRow'}}
          onGridReady={onGridReady}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>
    </div>
  );
}
