import axios from "axios";
import { COURSES_API, MODULES_API } from "../../index";


export const findModulesForCourse = async (courseID : any) => {
    const resp = await axios.get(`${COURSES_API}/${courseID}/modules`);
    return resp.data;
};

export const createModule = async (courseId: any, module: any) => {
    const resp = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
    return resp.data;
};

export const deleteModule = async (moduleId: any) => {
    const resp = await axios.delete(`${MODULES_API}/${moduleId}`);
    return resp.data;
};

export const updateModule = async (module: any) => {
    const resp = await axios.put(`${MODULES_API}/${module._id}`, module);
    return resp.data;
};



