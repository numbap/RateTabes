const express = require('express');
const app = express();
const port = 3000;

const incomeTestedCalc = (x) => {
    return "9999"
}

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/process', (req, res) => {
  // Return the result
  res.send(incomeTestedCalc(req.body.input));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
