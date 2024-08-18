import * as customerModel from "../models/customerModel.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await customerModel.getCustomerById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { customerName } = req.body;
  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    res.status(201).json({ message: `Create ${customerName} success`, newCustomer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCustomer = await customerModel.updateCustomer(id, req.body);
    res.status(200).json({ message: `Update ${req.body.customerName} success`, updatedCustomer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await customerModel.deleteCustomer(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
