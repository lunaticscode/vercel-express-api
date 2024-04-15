require("dotenv").config();
const express = require("express");
const connection = require("../db_init");
const router = express.Router();
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

const getPolicyDummy = () => {
  const policyData = Array.from({ length: 87 }).map((val, index) => {
    const createdAt = getCreatedAt();
    const updatedAt = getUpdatedAt(createdAt);
    return {
      id: index,
      policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
      deviceCnt: Math.floor(Math.random() * 250 + 50),
      os: osNames[Math.floor(Math.random() * osNames.length)],
      updatedAt,
      createdAt,
    };
  });
  return policyData;
};

const insertPolicyDummy = async (data) => {
  return await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO policy (id, policyName, deviceCnt, os, updatedAt, createdAt) values (?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.policyName,
        data.deviceCnt,
        data.os,
        data.updatedAt,
        data.createdAt,
      ],
      (err, results, fields) => {
        if (err) {
          console.log({ err });
          return resolve(null);
        }
        console.log(results);
        return resolve(true);
      }
    );
  });
};

router.get("/policy", async (req, res) => {
  const dataList = getPolicyDummy();
  for (let data of dataList) {
    const result = await insertPolicyDummy(data);
    console.log(result);
  }
  return res.json({ result: true });
});
module.exports = router;
