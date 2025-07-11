import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllPublished
} from "../controllers/tutorial.controller.js";


import express from "express";

const router = express.Router();
console.log("IN ROUTERS", create)
console.log("IN ROUTERS", findAll)
console.log("IN ROUTERS", findOne)
console.log("IN ROUTERS", update)
console.log("IN ROUTERS", deleteOne)
console.log("IN ROUTERS", deleteAll)
console.log("IN ROUTERS", findAllPublished)

router.post('/', create);
router.get('/', findAll);
router.get('/published', findAllPublished);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;
