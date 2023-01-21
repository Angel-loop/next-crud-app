import { dbConnect } from "../../../utils/dbConnection";
import Task from "../../../models/Task";

dbConnect()

export default async function handler(req, res){
    
    const tasks = await Task.find()
    console.log(tasks)
    res.status(200).json({message: 'OK'});
}