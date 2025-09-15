const db = require('../db');

const employeeModel = {
  async create(data) {
    const sql = `INSERT INTO employees (full_name, hired_date, age, salary, company_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const row = await db.one(sql, [data.full_name, data.hired_date,
       data.age, data.salary, data.company_id]);
    return row;
  },

  async getById(id) {
    return db.oneOrNone('SELECT * FROM employees WHERE id = $1', [id]);
  },

  async update(id, data) {
    const sql = `UPDATE employees SET full_name = $1, hired_date = $2, age = $3,
     salary = $4, company_id = $5 WHERE id = $6 RETURNING *;`;
    const row = await db.oneOrNone(sql, [data.full_name, data.hired_date,
      data.age, data.salary, data.company_id, id]);
    return row;
  },

  async delete(id) {
    return db.result('DELETE FROM employees WHERE id = $1', [id]); 
  },

  async listByCompany(companyId) {
    return db.any('SELECT * FROM employees WHERE company_id = $1 ORDER BY id', [companyId]);
  }
};

module.exports = employeeModel;
