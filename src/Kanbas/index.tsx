import { Navigate, Route, Routes } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Account";
const API_BASE = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${API_BASE}/api/courses`;
export const MODULES_API = `${API_BASE}/api/modules`;

function Kanbas() {

    const [courses, setCourses] = useState<any[]>([]);

    const findAllCourses = async () => {
        const resp = await axios.get(COURSES_API);
        setCourses(resp.data);
    }

    useEffect(() => {
        findAllCourses();
    }, []);


    const [course, setCourse] = useState({
        _id: "0",
        name: "New Course",
        image: "test.jpg",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        number: "1"
    });

    const updateCourse = async () => {
        await axios.put(`${COURSES_API}/${course._id}`, course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        )
    }
    const addCourse = async () => {
        const resp = await axios.post(COURSES_API, course);
        setCourses([...courses, { ...course, ...resp.data }]);
    }
    const deleteCourse = async (courseId: string) => {
        await axios.delete(`${COURSES_API}/${courseId}`);
        // no error checking here
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    return (
        <Provider store={store}>
            <div className="d-flex">
                <div>
                    <KanbasNavigation />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="Account/*" element={<Account />} />
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Dashboard" element={<Dashboard course={course} courses={courses} setCourse={setCourse} addCourse={addCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} />} />
                        <Route path="Courses/:courseId/*" element={<Courses />} />
                        

                    </Routes>

                </div>
            </div>
        </Provider>
    );
}
export default Kanbas;