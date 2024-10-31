import { useState } from "react"
import { BASE_URL, MY_KEY } from "../App"
import MissionModel from "../Models/MissionModel"
import { StatusMisin } from "../Models/MissionModel"
interface Props {
    mission: MissionModel
    allMissions: MissionModel[]
    setCopy: (copy: MissionModel[]) => void
}
export default function Mission({ mission, allMissions, setCopy }: Props) {
    const [err, setErr] = useState<string>('')
    const deleteMission = async () => {
        setErr('')
        try {
            const res = await fetch(`${BASE_URL}apikey=${MY_KEY}/${mission._id}`, {
                method: "DELETE",
            })
            const data = await (res.json());
            setCopy(allMissions.filter(m => m._id != data._id))
        }
        catch (err) {
            setErr(`${err}`)
        }
    }
    const updateStatusMission = async () => {
        setErr('')
        const status: StatusMisin[]  = [StatusMisin.Pending , StatusMisin.Progress, StatusMisin.Completed] 
       
        const index = status.indexOf(mission.status)
        const newStatus = status[index + 1]
        console.log(newStatus);
        
        try {
            const res = await fetch(`${BASE_URL}apikey=${MY_KEY}/progress/${mission._id}`, {
                method: "POST",
                
            })
            const data = await (res.json());
            console.log(data);
            
            setCopy(allMissions.filter(m => m._id != data._id))
        }
        catch (err) {
            setErr(`${err}`)
        }
    }
    return (
        <div>
            <h1>{mission.name}</h1>
            <h3>{mission.status}</h3>
            <h3>{mission.priority}</h3>
            <h3>{mission.description}</h3>
            <button onClick={deleteMission}>Delete</button>
            {mission.status != StatusMisin.Completed && <button onClick={updateStatusMission}>Progress</button>}
            {err && <p>{err}</p>}
        </div>
    )
}
