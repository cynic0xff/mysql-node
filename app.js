const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hwyaa370',
    database: 'sitepoint'
});

con.connect((err) => {

    if(err) throw err;

    console.log('Connected');

    con.query('SELECT * FROM authors', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:');
        
        //loop through each row
        rows.forEach( (row) => {
            console.log(`${row.name} lives in ${row.city}`);
          });
      });

      //insert
      const author = { name: 'Craig Buckler', city: 'Exmouth' };
        con.query('INSERT INTO authors SET ?', author, (err, res) => {
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
        });

        //update
        con.query(
            'UPDATE authors SET city = ? Where ID = ?',
            ['Leipzig', 3],
            (err, result) => {
              if (err) throw err;
          
              console.log(`Changed ${result.changedRows} row(s)`);
            }
          );

    //delete
    con.query(
        'DELETE FROM authors WHERE id = ?', [5], (err, result) => {
          if (err) throw err;
      
          console.log(`Deleted ${result.affectedRows} row(s)`);
        }
      );

    //stored proc
    con.query('CALL sp_get_authors()',function(err, rows){
        if (err) throw err;
      
        console.log('Data received from Db:');
        console.log(rows);

              //iterate
        rows[0].forEach( (row) => {
            console.log(`${row.name} lives in ${row.city}`);
        });
      });

      sql_test();
});

function sql_test() {
    const sequelize = new Sequelize('sitepoint', 'root', 'hwyaa370', {
        host: 'localhost',
        dialect: 'mysql'
      });
      
      const Author = sequelize.define('author', {
        name: {
          type: Sequelize.STRING,
        },
        city: {
          type: Sequelize.STRING
        },
      }, {
        timestamps: false
      });
      
      Author.findAll().then(authors => {
        console.log("All authors:", JSON.stringify(authors, null, 4));
      });
}
