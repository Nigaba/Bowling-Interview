// Importing express module
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(join(__dirname,'public')));

// Handling GET / request
app.use("/express", (req, res, next) => {
    res.send("This is the express server")
})
  
// Handling GET /hello request
app.get("/hello", (req, res, next) => {
    res.send("This is the hello response");
})
  
// Server setup
app.listen(3000, () => {
    console.log("Server is Running")
})