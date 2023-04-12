const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//


  app.get("/discom", async (req, res) => {

    try {
      const {rows} = await pool.query( `select * from org_hier where nin_type ='DISCOM'`);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get("/discom/:id", async (req, res) => {
    
    const  { id } =req.params;

    try {
      const {rows} = await pool.query( `select * from org_hier where parent_nin = $1`,[id]);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get("/zone/:id", async (req, res) => {
    
    const  { id } =req.params;
    console.log(id)
    try {
      const {rows} = await pool.query( `select * from org_hier where parent_nin = $1`,[id]);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get("/circle/:id", async (req, res) => {
    
    const  { id } =req.params;
    console.log(id )
    try {
      const {rows} = await pool.query( `select * from org_hier where parent_nin = $1`,[id]);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get("/division/:id", async (req, res) => {
    
    const  { id } =req.params;
    console.log(id)
    try {
      const {rows} = await pool.query( `select * from org_hier where parent_nin = $1`,[id]);
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