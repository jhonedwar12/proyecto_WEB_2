import express, { json } from 'express';
import routerApi from './routes/index.js';
const app = express();
const port = 3000;
app.use(json())
routerApi(app)



app.listen(port, () => {
  console.log(`App corriendo en  http://localhost:${port}`);
})
