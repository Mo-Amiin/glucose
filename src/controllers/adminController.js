import express from 'express'
import { allAdmin ,  saveAdmin, getAdmin , 
    updateAdmin , deleteAdmin} from "../services/adminService.js"
import { findLatestPatients } from '../repository/adminRepo.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const admins = await allAdmin();
      res.send(admins);
    } catch (error) {
      next(error);
    }
  });

  router.get('/latestPatient/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const latest = await findLatestPatients(id);
      console.log(latest);
      res.send(latest);
    } catch (error) {
      next(error);
    }
  });
  
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const admins = await getAdmin(id);
      res.send(admins);
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/', async (req, res, next) => {
    try {
      const admins = await saveAdmin(req.body);
      res.send(admins);
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const admins = await updateAdmin(id, req.body);
      res.send(admins);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const admins = await deleteAdmin(id);
      res.send(admins);
    } catch (error) {
      next(error);
    }
  });

export default  router;
