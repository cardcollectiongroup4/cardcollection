const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandling = require('./helpers/errorHandling');
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

// Your routing
app.use(routes);


// Error handling
app.use(errorHandling);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});