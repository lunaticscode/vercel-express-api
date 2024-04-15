const { faker } = require("@faker-js/faker");

const _makeUserData = () => {
  const createdAt = faker.date.past();
  const updatedAt = new Date(
    createdAt.getTime() + 3600 * 5 * 1000 + (Math.random() * 10000000 + 1000000)
  );
  return {
    uid: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    createdAt,
    updatedAt,
  };
};

const _makeProdData = () => {
  const prodId = faker.datatype.uuid();
  const prodName = faker.name.firstName();
  const prodImageUrl = faker.image.fashion();
  const createdAt = faker.date.past();
  const updatedAt = new Date(
    createdAt.getTime() + 1000 * 3600 * 24 * Math.floor(Math.random() * 10 + 20)
  );
  return {
    prodId,
    prodName,
    prodImageUrl,
    createdAt,
    updatedAt,
  };
};

const _makeLicenseData = (idx) => {
  const regTimestamp = faker.date.past();
  const expiredTimestamp = new Date(
    regTimestamp.getTime() +
      3600 * 24 * Math.floor(Math.random() * 100 + 30) * 1000
  );
  const updateTimestamp = new Date(
    regTimestamp.getTime() +
      1000 * 3600 * 24 * Math.floor(Math.random() * 10 + 20)
  );
  return {
    licenseId: 1000 + idx,
    licenseKey: faker.datatype.uuid().replace(/-/g, "").slice(0, 16),
    licenseInfoId: Math.floor(Math.random() * 3) + 1,
    licenseName: "PREMIUM",
    permission: '{"maxRequestCount":3000}',
    expiredTimestamp,
    regTimestamp,
    regAccount: faker.internet.email(),
    updateTimestamp,
    updateAccount: faker.internet.email(),
    isActive: 1,
  };
};

const _makeApiData = () => {
  const regTimestamp = faker.date.past();
  const expireTimestamp = new Date(
    regTimestamp.getTime() +
      3600 * 24 * Math.floor(Math.random() * 100 + 30) * 1000
  );
  return {
    apiKey: faker.datatype.uuid(),
    account: faker.internet.email(),
    apiPermission:
      '{"canForceScan":true,"duplicationCheckTime":86400000,"searchIndex":false,"autoCollect":true,"isListing":true}',
    expireTimestamp,
    regTimestamp,
  };
};

const _licenseDataList = Array.from({ length: 183 }, (_, idx) =>
  _makeLicenseData(idx)
).sort(
  (a, b) =>
    new Date(b.regTimestamp).getTime() - new Date(a.regTimestamp).getTime()
);

const _apiDataList = Array.from({ length: 147 }, () => _makeApiData()).sort(
  (a, b) =>
    new Date(b.regTimestamp).getTime() - new Date(a.regTimestamp).getTime()
);

const _prodDataList = Array.from({ length: 163 }, () => _makeProdData()).sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

module.exports = {
  _makeUserData,
  _makeApiData,
  _apiDataList,
  _licenseDataList,
  _prodDataList,
};
