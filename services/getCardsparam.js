const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, type) {
  const offset = helper.getOffset(page, config.listPerPage);
  let url  = `SELECT name FROM cards WHERE type = "${type}"`
  console.log(url);
  
  const rows = await db.query(url);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
};
