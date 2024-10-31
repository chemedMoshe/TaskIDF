export enum StatusMisin{
    Pending = "Pending",
    Progress = "In Progress",
    Completed = "Completed"
}
export enum PriorityMisin{
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
export default class MissionModel {
    public _id?:string
    constructor(
       public name: string,
       public status: StatusMisin,
       public priority: PriorityMisin,
       public description: string
    ) {
       
    }
}