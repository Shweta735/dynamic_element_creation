const { Pool } = require('pg');
const db = {};

let companyPool;

const createClientPool = ()=>{
  if(process.env.NODE_ENV === 'development'){
    companyPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'postgres',
      database: process.env.DB_SCHEMA || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      port: "5432"
    });
  } else {
    companyPool = new Pool({
      user: "qjyggqzkzlozfq",
      host: "ec2-18-204-101-137.compute-1.amazonaws.com",
      database: "d60f31kijusadv",
      password: "540a77ea30f4b23005c6583d9db7d22f9923753e453eed57fce586a37483230e",
      port: "5432"
    });
  }
}

db.init = async () => {
  createClientPool();
  try {
    //initializing the db
    await companyPool.query(`CREATE TABLE IF NOT EXISTS element(id SERIAL UNIQUE,type varchar(15),value varchar(50),attribute json)`);
} catch (err) {
    console.log(err.stack);
}
};

db.insertElement = async(value) =>{
  try{
    if (companyPool) {
      const res = await companyPool.query(`INSERT INTO element( type, value, attribute ) VALUES ($1, $2, $3) returning id`,value);
      return res;
    }
    throw new Error('DB connection not initialized.');
  }catch(err){
    throw new Error(err)
  }
}  

db.getElement = async(value) =>{
  try{
    if (companyPool) {
      const res = await companyPool.query('SELECT * FROm element where id = $1',value);
      return res;
    }
    throw new Error('DB connection not initialized.');
  }catch(err){
    throw new Error(err)
  }
}  


db.updateElement = async(value) =>{
  try{
    createClient();
    const res = await companyPool.query(`UPDATE element set  value = $1, attribute = $2 where id = $3`,value);
    return res;
  }catch(err){
    throw new Error(err)
  }
} 
                                              

module.exports = db;
