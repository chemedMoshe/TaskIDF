import { useEffect,  useState } from "react";
import AddMissions from "./components/AddMissions";
import MissionModel from "./Models/MissionModel";
import Allmissions from "./components/Allmissions";
export const BASE_URL = "https://reactexambackend.onrender.com/missions/";
export const MY_KEY = '8331894'
export default function App() {
  const [AllMissions, setAllMissions] = useState<MissionModel[]>([]);
  const [copy, setCopy] = useState<MissionModel[]>(AllMissions);
  useEffect(() => {
    getAllMissions();
  }, [copy])
  async function getAllMissions() {
    
    const res: Response = await fetch(`${BASE_URL}apikey=${MY_KEY}`);
    const data: MissionModel[] = await res.json();
    setAllMissions(data)
     
  }
  return (
    <div className="App">
      <div className="AddMission">
      <AddMissions  setCopy={setCopy} allMissions={AllMissions} />
      </div>
      <div className="AllMissions">
      <Allmissions allMissions={AllMissions} setCopy={setCopy}/>
      </div>
    </div>
  )
}
