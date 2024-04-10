import courses from "./courses.json"
import modules from "./modules.json"
import assignments from "./assignments.json"

export type Course = {
    _id: string;
    name: string;
    image: string;
    startDate: string;
    endDate: string;
    number: string;
}

export const db = { courses, modules, assignments }