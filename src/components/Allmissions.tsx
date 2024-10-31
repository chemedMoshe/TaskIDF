import MissionModel from "../Models/MissionModel"
import Mission from "./Mission"

interface Props {
    allMissions:MissionModel[]
    setCopy:(copy:MissionModel[])=>void
}
export default function Allmissions({allMissions,setCopy}:Props) {
  return (
    <div>
      {allMissions.map((mission) => (
        <Mission key={mission._id} mission={mission} allMissions={allMissions} setCopy={setCopy}/>
      ))}
    </div>
  )
}
