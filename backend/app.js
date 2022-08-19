import express from "express"
import mongoose from 'mongoose';
import contomongo from "./db";
import dotenv from "dotenv";
import blogrouter from "./routes/Blog-routes";
import router from "./routes/User-routes";
import cors from 'cors';

const config=dotenv.config();
const app = express()
// contomongo();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use('/api/user',router);
app.use('/api/blog',blogrouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
const mongoUrl="mongodb+srv://javiya_125:harshad125@cluster1.lu5bn.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,()=>{
  console.log("successfully connected");
}).then(app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})).catch((err)=>console.log(err))
