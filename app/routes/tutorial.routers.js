import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllPublished
} from "../controllers/tutorial.controller.js";

import { falWebhook, generateImageWithFal, getGenerateImageStatus, getGenerateResult, generateImageSync } from "./generate.js";


import express from "express";

const router = express.Router();

// router.post('/', create);
// router.get('/', findAll);
// router.get('/published', findAllPublished);
// router.get('/:id', findOne);
// router.put('/:id', update);
// router.delete('/:id', deleteOne);
// router.delete('/', deleteAll);

// fal.ai
router.post('/fal/webhook', falWebhook);
router.post('/generate', generateImageWithFal);
router.get('/status', getGenerateImageStatus);
router.get('/test', getGenerateResult);
router.post('/test-sync', generateImageSync);

export default router;
