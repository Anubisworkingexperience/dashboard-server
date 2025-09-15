const companyModel = require('../models/companyModel');

const companyController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const created = await companyModel.create(data);
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
      const company = await companyModel.getById(id);
      if (!company) return res.status(404).json({error: 'Not found'});
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await companyModel.update(id, req.body);
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
      await companyModel.delete(id);
      res.json({deleted: true});
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  },

  list: async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 25;
      const offset = Number(req.query.offset) || 0;
      const result = await companyModel.listWithCount(limit, offset);
      res.json(result);
    }
    catch(err) {
      res.status(500).json({error: err.message});
    }
  }
};

module.exports = companyController;