require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.PORT || 3000;
//start listening on port specified
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});