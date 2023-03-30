const express = require('express');
const app = express();
const port = 3050;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


app.get('/api/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 + num2;
    res.send(result.toString());
  }
});


app.get('/api/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 - num2;
    res.send(result.toString());
  }
});


app.get('/api/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 * num2;
    res.send(result.toString());
  }
});


app.get('/api/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } 
  else if (num2 === 0) {
    res.status(400).send('Cannot divide by zero');
  } 
  else {
    const result = num1 / num2;
    res.send(result.toString());
  }
});
