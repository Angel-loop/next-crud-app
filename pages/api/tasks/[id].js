import { dbConnect } from "@/utils/dbConnection"
import Task from "@/models/Task"

dbConnect()

export default async function handler(req, res){

    const {method, body, query: {id}} = req

    switch(method){
        case "GET":

            try {
                const task = await Task.findById(id)
                if(!task) return res.status(404).json({"message": "Task not found"})  
    
                return res.status(200).json(task)
            } catch (error) {
                return res.status(400).json({"message": error.message})
            }
        
        case "PUT":
            try {
                const UpdateTask = await Task.findByIdAndUpdate(id, body, {new: true})
                if(!UpdateTask) return res.status(404).json({"message": "Task not found"})  
    
                return res.status(200).json(UpdateTask)
            } catch (error) {
                return res.status(400).json({"message": error.message})
            }

        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id)
                if(!deletedTask) return res.status(404).json({"message": "Task not found"})  
    
                return res.status(200).json(deletedTask)
            } catch (error) {
                return res.status(400).json({"message": error.message})
            }
        default:
            return res.status(400).json({"message": "Invalid method"})
    }   

}