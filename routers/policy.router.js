const express = require("express");
const connection = require("../db_init");
const router = express.Router();

const policyNames = [
  "통합 에이전트 기본 정책 1",
  "통합 에이전트 기본 정책 2",
  "통합 에이전트 기본 정책 3",
  "interaction 정책",
  "interaction 정책 1",
  "interaction 정책 2",
  "interaction 정책 3",
];

const osNames = ["Windows", "Mac", "Linux"];

const getCreatedAt = () => {
  return new Date(
    new Date().getTime() -
      Math.floor(Math.random() * 1000 * 3600 * 24 * 30 + 1000 * 3600)
  );
};

const getUpdatedAt = (createdAt) => {
  return new Date(
    createdAt.getTime() +
      Math.floor(Math.random() * 1000 * 3600 * 24 * 30 + 1000 * 3600)
  );
};

const getPolicyAllData = async () => {
  return await new Promise((resolve, _) => {
    connection.query("Select * from policy", (err, results) => {
      if (err) {
        console.log(err);
        return resolve(null);
      }
      return resolve(results);
    });
  });
};

const insertPolicyData = async (data) => {
  const createdAt = new Date();
  const updatedAt = new Date();
  return await new Promise((resolve, _) => {
    connection.query(
      "insert into policy (policyName, deviceCnt, os, updatedAt, createdAt) values (?, ?, ?, ?, ?)",
      [data.policyName, data.deviceCnt, data.os, createdAt, updatedAt],
      (err, results) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        console.log(results);
        return resolve(true);
      }
    );
  });
};

const updatePolicyData = async (id, data) => {
  return await new Promise((resolve) => {
    connection.query(
      `update policy set policyName = ?, deviceCnt = ?, os = ? where id = ?`,
      [data.policyName, data.deviceCnt, data.os, id],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        console.log(result);
        return resolve(true);
      }
    );
  });
};

const deletePolicyData = async (id) => {
  return await new Promise((resolve, _) => {
    connection.query(`delete from policy where id=${id}`, (err, results) => {
      if (err) {
        console.log({ err });
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

router.get("/", async (req, res) => {
  const policyListData = await getPolicyAllData();
  return res.json(policyListData);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await insertPolicyData(data);
  return res.json({ result, timestamp: new Date().getTime() });
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const result = await updatePolicyData(id, data);
  return res.json({ result, timestamp: new Date().getTime() });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deletePolicyData(id);
  return res.json({ result, timestamp: new Date().getTime() });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const createdAt = getCreatedAt();
  const updatedAt = getUpdatedAt(createdAt);
  return res.json({
    data: {
      id,
      policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
      deviceCnt: Math.floor(Math.random() * 250 + 50),
      os: osNames[Math.floor(Math.random() * osNames.length)],
      descId: 56 + id,
      updatedAt,
      createdAt,
    },
  });
});

const policyDescs = policyNames.map((name) => `${name} - 정책 상세내용`);

router.get("/detail/:id", (req, res) => {
  const id = Number(req.params.id);
  const createdAt = getCreatedAt();
  const updatedAt = getUpdatedAt(createdAt);
  return res.json({
    data: {
      id,
      policyName: policyNames[id - 56],
      description: policyDescs[id - 56],
      createdAt,
      updatedAt,
    },
  });
});

router.get("/");

module.exports = router;
