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

export const findQuizById = async (quizId: any) => {
    const response = await request.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const createQuiz = async (courseId: any, quiz: any) => {
    const resp = await axios.post(`${QUIZZES_API}/${courseId}/quizzes`, quiz);
    return resp.data;
};

export const deleteQuiz = async (quizId: any) => {
    const resp = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return resp.data;
};

export const updateQuiz = async (quiz: any) => {
    const resp = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return resp.data;
};