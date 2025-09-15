const db = require('../db');

const companyModel = {
  async create(data) {
    const sql = `INSERT INTO companies (name, revenue, founded_date, employee_count)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
    const row = await db.one(sql, [data.name, data.revenue, data.founded_date, data.employee_count]);
    return row;
  },

  async getById(id) {
    return db.oneOrNone('SELECT * FROM companies WHERE id = $1', [id]);
  },

  async update(id, data) {
    const sql = `UPDATE companies SET name = $1, revenue = $2, founded_date = $3,
     employee_count = $4 WHERE id = $5 RETURNING *;`;
    const row = await db.oneOrNone(sql, [data.name, data.revenue, data.founded_date,
       data.employee_count, id]);
    return row;
  },

  async delete(id) {
    return db.result('DELETE FROM companies WHERE id = $1', [id]); 
  },

  async listWithCount(limit = 25, offset = 0) {
    return db.task('get companies', async t => {
      const rows = await t.any(`SELECT * FROM companies LIMIT = $1,
         OFFSET = $2`, [limit, offset]);
      const total = await t.one(`SELECT COUNT(*) AS count FROM companies`);
      return {
        rows, total: total.count
      };
    })
  }
};

module.exports = companyModel;
