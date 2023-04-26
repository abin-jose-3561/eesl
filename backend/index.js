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

  column === "lastread"
      ? (data = await pool.query(
          `select distinct lastread_status, diff from tabledata`,))
      : null;

  column == "lastcommdate"
  ? (data = await pool.query(
    `select distinct last_commdate from tabledata`,))
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
console.log(column,id)

column === "discom"?
    (data = await pool.query(
    `SELECT * FROM org_hier t2 WHERE t2.nin_type = 'DISCOM' AND t2.sequence_id IN(
      SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'ZONE' AND t3.sequence_id =  ANY($1::text[]))`,
      [id.split(',')])
    ) : null;

  column === "zone"?
    (data = await pool.query(
    `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "circle"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('DIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.parent_nin IN(
          SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'ZONE' AND t3.sequence_id = ANY($1::text[])))`,
      [id.split(',')])
    ) : null;

    column === "division"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('SUBDIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'DIVISION' AND t2.parent_nin IN(
             SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.parent_nin IN(
                SELECT t4.sequence_id FROM org_hier t4 WHERE t4.nin_type = 'ZONE' AND t4.sequence_id = ANY($1::text[]))))`,
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

  column === "discom"?
  (data = await pool.query(
    `SELECT * FROM org_hier t1 WHERE t1.nin_type = 'DISCOM' AND t1.sequence_id IN(
      SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.sequence_id IN(
        SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.sequence_id = ANY($1::text[])))`,
    [id.split(',')])
  ) : null;

  column === "zone"?
    (data = await pool.query(
      `SELECT * FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.sequence_id IN(
        SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.sequence_id =  ANY($1::text[]))`,
      [id.split(',')])
    ) : null;

  column === "circle"?
    (data = await pool.query(
    `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "division"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type IN ('SUBDIVISION') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM org_hier t2 WHERE t2.nin_type = 'DIVISION' AND t2.parent_nin IN(
        SELECT t3.sequence_id FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.sequence_id = ANY($1::text[])))`,
      [id.split(',')])
    ) : null;


    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});


  app.get("/division/:column/:id", async (req, res) => {
    try {
    const  {column , id } =req.params;

    column === "discom"?
  (data = await pool.query(
    `SELECT * FROM org_hier t1 WHERE t1.nin_type = 'DISCOM' AND t1.sequence_id IN(
      SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.sequence_id IN(
        SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.sequence_id IN(
          SELECT t4.parent_nin FROM org_hier t4 WHERE t4.nin_type = 'DIVISION' AND t4.sequence_id = ANY($1::text[]))))`,
    [id.split(',')])
  ) : null;

  column === "zone"?
    (data = await pool.query(
      `SELECT * FROM org_hier t1 WHERE t1.nin_type = 'ZONE' AND t1.sequence_id IN(
        SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.sequence_id IN(
          SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'DIVISION' AND t3.sequence_id = ANY($1::text[])))`,
      [id.split(',')])
    ) : null;

  column === "circle"?
    (data = await pool.query(
    `SELECT * FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.sequence_id IN(
      SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'DIVISION' AND t3.sequence_id =  ANY($1::text[]))`,
      [id.split(',')])
    ) : null;

    column === "division"?
    (data = await pool.query(
      `SELECT * FROM org_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;
   
    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});


app.get("/subdivision/:column/:id", async (req, res) => {
  try {
  const  {column , id } =req.params;

  column === "discom"?
(data = await pool.query(
  `SELECT * FROM org_hier t1 WHERE t1.nin_type = 'DISCOM' AND t1.sequence_id IN(
    SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'ZONE' AND t2.sequence_id IN(
      SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'CIRCLE' AND t3.sequence_id IN(
        SELECT t4.parent_nin FROM org_hier t4 WHERE t4.nin_type = 'DIVISION' AND t4.sequence_id IN(
        SELECT t5.parent_nin FROM org_hier t5 WHERE t5.nin_type = 'SUBDIVISION' AND t5.sequence_id = ANY($1::text[])))))`,
  [id.split(',')])
) : null;

column === "zone"?
  (data = await pool.query(
    `SELECT * FROM org_hier t1 WHERE t1.nin_type = 'ZONE' AND t1.sequence_id IN(
      SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.sequence_id IN(
        SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'DIVISION' AND t3.sequence_id IN(
          SELECT t4.parent_nin FROM org_hier t4 WHERE t4.nin_type = 'SUBDIVISION' AND t4.sequence_id = ANY($1::text[]))))`,
    [id.split(',')])
  ) : null;

column === "circle"?
  (data = await pool.query(
  `SELECT * FROM org_hier t2 WHERE t2.nin_type = 'CIRCLE' AND t2.sequence_id IN(
    SELECT t2.parent_nin FROM org_hier t2 WHERE t2.nin_type = 'DIVISION' AND t2.sequence_id IN(
    SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'SUBDIVISION' AND t3.sequence_id =  ANY($1::text[])))`,
    [id.split(',')])
  ) : null;

  column === "division"?
  (data = await pool.query(
    `SELECT * FROM org_hier t2 WHERE t2.nin_type = 'DIVISION' AND t2.sequence_id IN(
      SELECT t3.parent_nin FROM org_hier t3 WHERE t3.nin_type = 'SUBDIVISION' AND t3.sequence_id =  ANY($1::text[]))`,
    [id.split(',')])
  ) : null;
 
  res.json(data.rows);
} catch (error) {
console.error(error.message);
}
});
  
//To fetch
  app.get("/table/tabb", async (req, res) => {
    const { discom, zone, circle, division, subdivision, lastread, lastcomm, optiondate } = req.query;
    console.log("op", discom, zone, circle, division, subdivision,lastread, lastcomm, optiondate);
    let query = "SELECT * FROM tabledata WHERE 1=1 ";
    // let params = [];
    console.log(optiondate);
  
    if (discom) {
      const discomArray = discom.split(",");
      if (discomArray.length > 0) {
        query += `AND discom IN (${discomArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
  
        // params.push(...discomArray);
      }
    }
  
    if (zone) {
      const zoneArray = zone.split(",");
      if (zoneArray.length > 0) {
        query += `AND zone IN (${zoneArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...zoneArray);
      }
    }
  
    if (circle) {
      const circleArray = circle.split(",");
      if (circleArray.length > 0) {
        query += `AND circle IN (${circleArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...circleArray);
      }
    }
  
    if (division) {
      const divisionArray = division.split(",");
      if (divisionArray.length > 0) {
        query += `AND division IN (${divisionArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...divisionArray);
      }
    }
  
    if (subdivision) {
      const subdivisionArray = subdivision.split(",");
      if (subdivisionArray.length > 0) {
        query += `AND subdivision IN (${subdivisionArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...subdivisionArray);
      }
    }

    if (lastread) {
      const lastreadArray = lastread.split(",");
      if (lastreadArray.length > 0) {
        query += `AND lastread_status IN (${lastreadArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...subdivisionArray);
      }
    }

    if (lastcomm) {
      const lastcommArray = lastcomm.split(",");
      if (lastcommArray.length > 0) {
        query += `AND last_commdate IN (${lastcommArray
          .map((d) => `'${d.trim()}'`)
          .join(",")}) `;
        // params.push(...subdivisionArray);
      }
    }

    if(optiondate) {
        query += `AND creation_date1='${optiondate}'`
          
        // params.push(...subdivisionArray);
      }
    
    console.log(query);
  
    await pool
      .query(query)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  });




  /************ NETWORK HIERARACHY **************/
  app.get("/net/:column", async (req, res) => {
    try {
    const { column } = req.params;
    column === "gss"
        ? (data = await pool.query(
            `select * from net_hier where nin_type ='GSS'`,))
        : null;
  
    column === "thirtythree"
        ? (data = await pool.query(
            `select * from net_hier where nin_type ='33 KV FEEDER'`,))
        : null;
  
    column === "substation"
        ? (data = await pool.query(
            `select * from net_hier where nin_type ='SUBSTATION'`,))
        : null;
      
    column === "eleven"
        ? (data = await pool.query(
            `select * from net_hier where nin_type ='11 KV FEEDER'`,))
        : null;
    column === "dt"
        ? (data = await pool.query(
            `select * from net_hier where nin_type ='DT'`,))
        : null;
    res.json(data.rows);
      } catch (error) {
      console.error(error.message);
    }
  });

  //To set all dropdown boxes when gss is changed
  app.get("/gss/:column/:id", async (req, res) => {
    
    try {
    const  { column, id } =req.params;
    console.log(id)
    
    column === "gss"?
      (data = await pool.query(
      `SELECT * FROM net_hier WHERE parent_nin = ANY($1::text[])`,
        [id.split(',')])
      ) : null;

      column === "thirtythree"?
      (data = await pool.query(
      `SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('SUBSTATION') AND t1.parent_nin IN (
         SELECT t2.sequence_id FROM net_hier t2 WHERE t2.nin_type = '33 KV FEEDER' AND t2.parent_nin IN (
           SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = 'GSS' AND t3.sequence_id = ANY($1::text[])))`,
        [id.split(',')])
      ) : null;

      column === "substation"?
      (data = await pool.query(
      `SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('11 KV FEEDER') AND t1.parent_nin IN (
         SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = 'SUBSTATION' AND t3.parent_nin IN(
            SELECT t4.sequence_id FROM net_hier t4 WHERE t4.nin_type = '33 KV FEEDER'AND t4.parent_nin IN(
               SELECT t5.sequence_id FROM net_hier t5 WHERE t5.nin_type = 'GSS' AND t5.sequence_id = ANY($1::text[]))))`,
        [id.split(',')])
      ) : null;

      column === "eleven"?
      (data = await pool.query(
      `SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('DT') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM net_hier t2 WHERE t2.nin_type = '11 KV FEEDER' AND t2.parent_nin IN (
            SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = 'SUBSTATION' AND t3.parent_nin IN(
               SELECT t4.sequence_id FROM net_hier t4 WHERE t4.nin_type = '33 KV FEEDER' AND t4.parent_nin IN(
                  SELECT t4.sequence_id FROM net_hier t4 WHERE t4.nin_type = 'GSS' AND t4.sequence_id = ANY($1::text[])))))`,
        [id.split(',')])
      ) : null;

      res.json(data.rows);
    } catch (error) {
    console.error(error.message);
  }
});


//To set all dropdown boxes when 33kv is changed
app.get("/thirtythree/:column/:id", async (req, res) => {
  try {
  const  { column, id } =req.params;
console.log(column,id)

  column === "thirtythree"?
    (data = await pool.query(
    `SELECT * FROM net_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "substation"?
    (data = await pool.query(`
    SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('11 KV FEEDER') AND t1.parent_nin IN (
      SELECT t2.sequence_id FROM net_hier t2 WHERE t2.nin_type = 'SUBSTATION' AND t2.parent_nin IN(
        SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = '33 KV FEEDER' AND t3.sequence_id = ANY($1::text[])))`
      ,
      [id.split(',')])
    ) : null;

    column === "eleven"?
    (data = await pool.query(
      `SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('DT') AND t1.parent_nin IN (
        SELECT t2.sequence_id FROM net_hier t2 WHERE t2.nin_type = '11 KV FEEDER' AND t2.parent_nin IN(
             SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = 'SUBSTATION' AND t3.parent_nin IN(
                SELECT t4.sequence_id FROM net_hier t4 WHERE t4.nin_type = '33 KV FEEDER' AND t4.sequence_id = ANY($1::text[]))))`,
      [id.split(',')])
    ) : null;

    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});

//To set all dropdown boxes when circle is changed
app.get("/substation/:column/:id", async (req, res) => {
  try {
  const  { column, id } =req.params;

  
  column === "substation"?
    (data = await pool.query(
    `SELECT * FROM net_hier WHERE parent_nin = ANY($1::text[])`,
      [id.split(',')])
    ) : null;

    column === "11 KV FEEDER"?
    (data = await pool.query(
      `SELECT * FROM net_hier t1 WHERE t1.nin_type IN ('DT') AND t1.parent_nin IN (
          SELECT t2.sequence_id FROM net_hier t2 WHERE t2.nin_type = '11 KV FEEDER' AND t2.parent_nin IN(
            SELECT t3.sequence_id FROM net_hier t3 WHERE t3.nin_type = 'SUBSTATION' AND t3.sequence_id = ANY($1::text[])))`,
      [id.split(',')])
    ) : null;


    res.json(data.rows);
  } catch (error) {
  console.error(error.message);
}
});

app.get("/eleven/eleven/:id", async (req, res) => {
    
  const  { id } =req.params;
  try {
    const {rows} = await pool.query(`SELECT * FROM net_hier WHERE parent_nin = ANY($1::text[])`,[id.split(',')]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching data from database');
  }
});
  
  app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
  