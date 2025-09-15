const employeeModel = require('../models/employeeModel');

const employeeController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const created = await employeeModel.create(data);
      res.status(201).json(created);
    }
    catch(err) {
      console.error(err);
      res.status(500).json({error: err.message});
    }
  },

  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const employee = await employeeModel.getById(id);
      if (!employee) return res.status(404).json({error: 'Not found'});
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await employeeModel.update(id, req.body);
      if (!updated) return res.status(404).json({error: 'Not found'});
      res.json(updated);
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await employeeModel.delete(id);
      res.json({deleted: true});
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  },

  listByCompany: async (req, res) => {
    try {
      const companyId = Number(req.query.companyId);
      if (!companyId) return res.status(400).json({error: 'company id is required'});
      const rows = await employeeModel.listByCompany(companyId);
      res.json(rows);
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  }
};

module.exports = employeeController;