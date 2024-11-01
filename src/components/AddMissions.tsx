import {  useState } from "react"
import MissionModel, { PriorityMisin, StatusMisin } from "../Models/MissionModel"
import { BASE_URL, MY_KEY } from "../App"

interface Props {
   setCopy: (copy: MissionModel[]) => void
   allMissions: MissionModel[]
}

export default function AddMissions({  setCopy , allMissions}: Props) {

    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
   
    const  addMissionFetch = async (newMission: MissionModel)=> {
    try{
        const res: Response = await fetch(`${BASE_URL}apikey=${MY_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMission)
        })
        const data = await res.json()
        console.log(data)
    }
    catch(err){
        console.log(err); 
    }
   }
        async function AddNewMission() {
            setError("")
            
            if(name === "" || status === "" || priority === "" || description === "") {
      setError("Please fill in the task details")
      
      return
            }
            const mewMission = new MissionModel(name, status as StatusMisin, priority as PriorityMisin, description)
            await addMissionFetch(mewMission)
            setCopy([...allMissions, mewMission])

        }
        return (
            <div className="AddMissions">
                <div className="NameInput">
                 <label> Name:  
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </label>
                </div>
                <div className="StatusInput">
                <label>
                    status:
                    <select name="selectedStatus" onChange={(e) => setStatus(e.target.value )}>
                       
                        <option value="Pending" >Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
               </div>
               
               <div className="PriorityInput">
                <label>
                    Priority:
                <select name="selectedPriority" onChange={(e) => setPriority(e.target.value)} >
               
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
                </label>
                </div>
                
                <div className="DescriptionInput">
                <label>Description:
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                </label>
                </div>
                <div className="AddButton"> 
                <button onClick={AddNewMission}>Add Mission</button>
               </div>
               {error && <p>{error}</p>}
               
            </div>
        )
    }

