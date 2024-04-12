import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;

const request = axios.create({
    withCredentials: true
});


export const findAllQuizzes = async (courseId: any) => {
    console.log("courseId", courseId);
    const response = await request.get(`${QUIZZES_API}/${courseId}`);
    return response.data;
}