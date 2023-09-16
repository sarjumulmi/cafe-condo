const Promise = require("bluebird");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

exports.execSqlFile = async function (sequelize, relFilePath, options = {}) {
  const dir = options.__dirname || path.resolve(__dirname, "../migrations");
  options = _.omit(options, "__dirname");

  relFilePath = relFilePath.replace(/\.js$/, ".sql");
  const filePath = path.isAbsolute(relFilePath)
    ? relFilePath
    : path.resolve(dir, relFilePath);

  const sql = await Promise.fromCallback((cb) =>
    fs.readFile(filePath, { encoding: "utf8" }, cb),
  );

  await sequelize.query(sql, options);
};
