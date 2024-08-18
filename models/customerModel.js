import db from "../config/index.js"; // Pastikan ini menunjuk ke file config database Anda

export const getAllCustomers = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM Customer ORDER BY createdAt DESC");
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCustomerById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM Customer WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("Customer not found");
    }
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCustomer = async (customerData) => {
  try {
    const { customerName, level, favouriteMenu, totalTransaction } = customerData;
    const [result] = await db.query(
      "INSERT INTO Customer (customerName, level, favouriteMenu, totalTransaction) VALUES (?, ?, ?, ?)",
      [customerName, level, favouriteMenu, totalTransaction]
    );
    return { id: result.insertId, ...customerData };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const { customerName, level, favouriteMenu, totalTransaction } = customerData;
    const [result] = await db.query(
      "UPDATE Customer SET customerName = ?, level = ?, favouriteMenu = ?, totalTransaction = ? WHERE id = ?",
      [customerName, level, favouriteMenu, totalTransaction, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Customer not found or no change made");
    }
    return { id, ...customerData };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM Customer WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Customer not found");
    }
    return { message: "Customer deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};
