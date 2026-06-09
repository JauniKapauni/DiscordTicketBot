const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./tickets.db');
db.run('CREATE TABLE IF NOT EXISTS tickets (userId TEXT PRIMARY KEY, channelId TEXT NOT NULL)');
module.exports = db;