import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.route("/customers").get(getCustomers).post(createCustomer);
router.route("/customers/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);

export default router;
