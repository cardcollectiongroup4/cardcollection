const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

// Your routing


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});