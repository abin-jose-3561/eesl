const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
//To initally set all the dropdown options
app.get("/:column", async (req, res) => {
  try {
  const { column } = req.params;
  column === "discom"
      ? (data = await pool.query(
          `select * from org_hier where nin_type ='DISCOM'`,))
      : null;

  column === "zone"
      ? (data = await pool.query(
          `select * from org_hier where nin_type ='ZONE'`,))
      : null;

  column === "circle"
      ? (data = await pool.query(
          `select * from org_hier where nin_type ='CIRCLE'`,))
      : null;
    
  column === "division"
      ? (data = await pool.query(
          `select * from org_hier where nin_type ='DIVISION'`,))
      : null;
  column === "subdivision"
      ? (data = await pool.query(
          `select * from org_hier where nin_type ='SUBDIVISION'`,))
      : null;
  res.json(data.rows);
    } catch (error) {
    console.error(error.message);
  }
});

//To set all dropdown boxes when discom is changed
  app.get("/discom/:column/:id", async (req, res) => {
    try {
    const  { column, id } =req.params;
    console.log(id)
    
    column === "discom"?
      (data = await pool.query(
      `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
        [id.split(',')])
      ) : null;

      column === "zone"?
      (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('CIRCLE') AND t1.parent_nin IN (
         SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.parent_nin IN (
           SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'DISCOM' AND t3.sequence_id = ANY($1::text[])))`,
        [id.split(',')])
      ) : null;

      column === "circle"?
      (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('DIVISION') AND t1.parent_nin IN (
         SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.parent_nin IN(
            SELECT t4.sequence_id FROM org_hier t4 WHERE t4.nin_type = 'ZONE'AND t4.parent_nin IN(
               SELECT t5.sequence_id FROM org_hier t5 WHERE t5.nin_type = 'DISCOM' AND t5.sequence_id = ANY($1::text[]))))`,
        [id.split(',')])
      ) : null;

      column === "division"?
      (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('SUBDIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'DIVISION' AND t2.parent_nin IN (
            SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.parent_nin IN(
               SELECT t4.sequence_id FROM org_hier t4 WHERE t4.nin_type = 'ZONE' AND t4.parent_nin IN(
                  SELECT t4.sequence_id FROM org_hier t4 WHERE t4.nin_type = 'DISCOM' AND t4.sequence_id = ANY($1::text[])))))`,
        [id.split(',')])
      ) : null;

      res.json(data.rows);
    } catch (error) {
    console.error(error.message);
  }
});



//To set all dropdown boxes when zone is changed
app.get("/zone/:column/:id", async (req, res) => {
  try {
  const  { column, id } =req.params;
  console.log(id)
  
  column === "zone"?
    (data = await pool.query(
    `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "circle"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('CIRCLE') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.sequence_id = ANY($1::text[]))`,
      [id.split(',')])
    ) : null;

    column === "division"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('DIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.parent_nin IN(
SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'ZONE' AND t3.sequence_id = ANY($1::text[])))`,
      [id.split(',')])
    ) : null;

    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});



//To set all dropdown boxes when circle is changed
app.get("/circle/:column/:id", async (req, res) => {
  try {
  const  { column, id } =req.params;
  console.log(id)
  
  column === "circle"?
    (data = await pool.query(
    `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "division"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('DIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.sequence_id = ANY($1::text[]))`,
      [id.split(',')])
    ) : null;


    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});


  app.get("/division/division/:id", async (req, res) => {
    
    const  { id } =req.params;
    console.log(id)
    try {
      const {rows} = await pool.query(`SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,[id.split(',')]);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  // app.get("/sub/:id", async (req, res) => {
    
  //   const  { id } =req.params;
  //   console.log(id)
  //   try {
  //     const {rows} = await pool.query( `select * from org_hier where parent_nin = $1`,[id]);
  //     res.json(rows);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Error fetching data from database');
  //   }
  // });


  app.get("/table/:optionname/:value", async (req, res) => {
    
    const  { optionname,value } =req.params;
    console.log("option",optionname,value)
    try {
      const {rows} = await pool.query( `select * from tabledata where ${optionname} = '${value}'`);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.listen(5000, () => {
    console.log("server has started on port 5000");
  });