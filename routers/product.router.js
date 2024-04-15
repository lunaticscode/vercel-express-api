const express = require("express");
const router = express.Router();
const connection = require("../db_init");

const getProductService = async () => {
  return await new Promise((resolve, reject) => {
    connection.query(`select * from product`, (err, result) => {
      if (err) {
        console.log({ err });
        return resolve(false);
      }
      return resolve(result);
    });
  });
};
const getProductByIdService = async (id) => {
  return await new Promise((resolve, reject) => {
    connection.query(
      `select * from product where id = ${id}`,
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const insertProductService = async (data) => {
  return await new Promise((resolve, reject) => {
    connection.query(
      "insert into product (prodName, prodRemain, prodPrice, updatedAt, createdAt) values (?, ?, ?, ?, ?)",
      [data.prodName, data.prodRemain, data.prodPrice, new Date(), new Date()],
      (err) => {
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
};

const updateProductService = async (id, data) => {
  return await new Promise((resolve) => {
    connection.query(
      `update product set prodName = ?, prodRemain = ?, prodPrice = ? where id = ?`,
      [data.prodName, data.prodRemain, data.prodPrice, id],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
};
const deleteProductService = async (id) => {
  return await new Promise((resolve) => {
    connection.query(`delete from product where id = ${id}`, (err) => {
      if (err) {
        console.log({ err });
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

router.get("/", async (req, res) => {
  const result = await getProductService();
  if (!result)
    return res.status(500).json({ isError: true, message: "(!)Server Error" });
  return res.json({ isError: false, data: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !id.trim() || isNaN(id))
    return res
      .status(400)
      .json({ isError: true, message: `(!)Invalid product id (= ${id}).` });
  const result = await getProductByIdService(id);
  if (!result)
    return res.status(500).json({ isError: true, message: "(!)Server Error." });
  return res.json({ isError: false, data: result[0] || null });
});

router.post("/", async (req, res) => {
  const data = req.body || null;
  if (!data) {
    return res
      .status(400)
      .json({ isError: true, message: "(!)Invalid product data." });
  }
  const prodName = data.prodName || null;
  const prodRemain = data.prodRemain || null;
  const prodPrice = data.prodPrice || null;
  if (!prodName || !prodRemain || !prodPrice) {
    return res.status(400).json({
      isError: true,
      message: `(!)Invalid product data (= ${JSON.stringify(data)}).`,
    });
  }
  const result = await insertProductService(data);
  console.log({ result });
  if (!result) {
    return res.status(500).json({ isError: true, message: "(!)Server Error." });
  }
  return res.json({ isError: false, message: "Success to add product data." });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { prodName, prodRemain, prodPrice } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      isError: true,
      message: `(!)Invalid request id (= ${id}).`,
    });
  }
  if (!req.body || [prodName, prodRemain, prodPrice].some((data) => !data)) {
    return res.status(400).json({
      isError: true,
      message: `(!)Invalid request data (= ${JSON.stringify(req.body)}).`,
    });
  }

  const result = await updateProductService(id, req.body);
  if (!result) {
    return res.status(500).json({ isError: true, message: "(!)Server Error." });
  }
  return res.json({
    isError: false,
    message: `Success to update data (id = ${id}).`,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //   const token = req.headers.token || null;
  //   if (!token) {
  //     return res.json({ isError: false, message: "(!)Invalid token." });
  //   }
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ isError: true, message: `(!)Invalid product id (= ${id})` });
  }
  const result = await deleteProductService(id);
  if (!result) {
    return res.status(500).json({ isError: true, message: "(!)Server Error." });
  }
  return res.json({
    isError: false,
    message: `Success to delete product(id=${id}).`,
  });
});

module.exports = router;
