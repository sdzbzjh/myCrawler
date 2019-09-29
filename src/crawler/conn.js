const mysql = require('node-mysql-promise')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my'
})

// conn.table('build').delete()
// conn.execute('truncate table build')

conn.table('build').select().then(data => {
  console.log(data)
})


module.exports = conn