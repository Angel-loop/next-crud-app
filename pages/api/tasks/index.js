import { dbConnect } from '@/utils/dbConnection'
import Task from '@/models/Task'

dbConnect()

export default async function handler(req, res){

    const {method, body} = req

    switch (method) {
        case "GET":
            try {

                const tasks = await Task.find()
                return res.status(200).json(tasks);                
            } catch (error) {

                return res.status(500).json({"error": error.message});
            }
        
        case "POST":
            try {
                const task = new Task(body)
                const savedTask = await task.save()
                return res.status(201).json({"saved" : true})
            } catch (error) {
                return res.status(400).json({"error": error.message})
            }

        default:
            return res.status(400).json({"Message": "Bad request"});
    }


}