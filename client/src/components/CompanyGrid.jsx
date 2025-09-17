import React, { useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from '../api';
import { ModuleRegistry, AllCommunityModule, themeQuartz, InfiniteRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule]);

export default function CompanyGrid({ onSelectCompany }) {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    { field: 'id', width: 80 },
    { field: 'name', flex: 1 },
    { field: 'revenue' },
    { field: 'founded_date', headerName: 'Founded' },
    { field: 'employee_count', headerName: 'Employees' }
  ];

  const datasource = {
    getRows: async (params) => {
      console.log("Datasource called:", params.startRow, params.endRow); 
      const { startRow, endRow } = params;
      const limit = endRow - startRow;
      const offset = startRow;
      try {
        const resp = await fetchCompanies(limit, offset);
        const { rows, total } = resp.data;
        const lastRow = (offset + rows.length) >= total ? offset + rows.length : -1;
        params.successCallback(rows, lastRow);
      } catch (err) {
        console.error(err);
        params.failCallback();
      }
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.setGridOption('datasource', datasource);
  };

  const onSelectionChanged = () => {
    const selected = gridRef.current.api.getSelectedRows()[0];
    if (onSelectCompany) onSelectCompany(selected || null);
  };

  const handleAdd = async () => {
    const name = prompt('Название компании:');
    if (!name) return;
    const revenue = parseFloat(prompt('Выручка:', '0')) || 0;
    const founded_date = prompt('Дата основания (YYYY-MM-DD):', '');
    const employee_count = parseInt(prompt('Количество сотрудников:', '0')) || 0;
    try {
      await createCompany({ name, revenue, founded_date, employee_count });
      gridApi.setDatasource(datasource);
    } catch (err) {
      console.error(err, 'Error creating company');
    }
  };

  const handleEdit = async () => {
    const selected = gridRef.current.api.getSelectedRows()[0];
    if (!selected) { alert('Выберите компанию!'); return; }
    const name = prompt('Название компании:', selected.name) || selected.name;
    const revenue = parseFloat(prompt('Выручка:', String(selected.revenue))) || 0;
    const founded_date = prompt('Дата основания (YYYY-MM-DD):', selected.founded_date) || selected.founded_date;
    const employee_count = parseInt(prompt('Количество сотрудников:', String(selected.employee_count))) || 0;
    try {
      await updateCompany(selected.id, { name, revenue, founded_date, employee_count });
      gridApi.setDatasource(datasource);
    } catch (err) {
      console.error(err, 'Error updating');
    }
  };

  const handleDelete = async () => {
    const selected = gridRef.current.api.getSelectedRows()[0];
    if (!selected) { alert('Выберите компанию!'); return; }
    if (!window.confirm('Удалить компанию?')) return;
    try {
      await deleteCompany(selected.id);
      gridApi.setDatasource(datasource);
      if (onSelectCompany) onSelectCompany(null);
    } catch (err) {
      console.error(err, 'Error deleting');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleAdd}>Добавить запись</button>{' '}
        <button onClick={handleEdit}>Изменить</button>{' '}
        <button onClick={handleDelete}>Удалить</button>
      </div>

      <div style={{ height: 400 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowModelType="infinite"
          cacheBlockSize={20}
          theme={themeQuartz}
          maxBlocksInCache={5}
          paginationPageSize={20}
          onGridReady={onGridReady}
          rowSelection={{mode: 'singleRow'}}
          onSelectionChanged={onSelectionChanged}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>
    </div>
  );
}
