import  express  from "express"
import dotenv from 'dotenv'
import  connectDB  from "./configdb/db.js"
import morgan from "morgan"
import authroute from "./route/authroute.js"
import cors from 'cors'


//config dotenv
dotenv.config()

//connectDB
connectDB();

//rest object
const app = express()
 
//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api',authroute)


const PORT = process.env.PORT

//run api
app.get('/',(req,res)=>{
    res.send({
    message:"hello world"
})
})

app.listen(PORT,()=>{
    console.log(`wake up guys ${PORT}`)
})