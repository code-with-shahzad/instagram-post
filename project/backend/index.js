const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(
    cors({
    //   credentials: true,
      origin: [
        "http://localhost:3000",
      ],
    })
  );

const db = mysql.createConnection({
  host: '185.253.219.150',
  port: 1001,
  user: 'root',
  password: '8sC6hG2JUZJc',
  database: 'sort',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.get('/api/instagram', async (req, res) => {
  try {
    const instagramResponse = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=hermes');
    const instagramData = instagramResponse.data;

    // // Extract and send the relevant data to the client
    // const last12Posts = instagramData.graphql.user.edge_owner_to_timeline_media.edges.slice(0, 12);
    // const postURLs = last12Posts.map(
    //   (post) => `https://www.instagram.com/p/${post.node.shortcode}/`
    // );

    res.status(2001).json(instagramData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create a route to fetch data from the database
app.get('/api/fetchData', (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
      db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
