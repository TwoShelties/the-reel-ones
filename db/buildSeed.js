/* 
DO NOT CHANGE THIS FILE
*/
const client = require(".");
const { rebuildDB } = require("./seed");

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
