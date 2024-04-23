import React from "react";
import { Link } from "react-router-dom";
import { Course } from "../Database";

function Dashboard({
  courses,
  course,
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addCourse: () => void;
  deleteCourse: (id: number) => void;
  updateCourse: () => void;
}) {
  return (
    <div className="container-auto">
      <div className="row">
        <div className="col-sm-auto sidebar">
          <script>navSidebar("Dashboard")</script>
        </div>
        <div className="col-sm p-3 min-vh-100">
          <h1>Dashboard</h1>
          <div className="fluid-container">
            <h5> Courses</h5>
            <input
              value={course.name}
              className="form-control"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <input
              value={course.number}
              className="form-control"
              onChange={(e) => setCourse({ ...course, number: e.target.value })}
            />
            {/* <input
              value={course.startDate.slice(0, 10)}
              className="form-control"
              onChange={(e) =>
                setCourse({ ...course, startDate: e.target.value })
              }
              type="date"
            />
            <input
              value={course.endDate.slice(0, 10)}
              className="form-control"
              onChange={(e) =>
                setCourse({ ...course, endDate: e.target.value })
              }
              type="date"
            /> */}

            <button className="btn btn-primary" onClick={addCourse}>
              Add Course
            </button>
            <span> </span>
            <button className="btn btn-primary" onClick={updateCourse}>
              Update Course
            </button>
          </div>

          <hr />
          <h2>Published Courses ({courses.length})</h2>

          <hr />
          <div className="container-fluid">
            <div className="row">
              <div className="row row-cols-1 row-cols-md-5 g-4">
                {courses.map((course) => {
                  return (
                    <div
                      key={course.id}
                      className="col"
                      style={{ width: "300px" }}
                    >
                      <Link
                        to={`/Kanbas/Courses/${course.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card">
                          {" "}
                          <img
                            src={`/images/${course.image}`}
                            className="card-img-top"
                            style={{ maxHeight: "150px" }}
                            alt=""
                          />
                          <div className="card-body">
                            <div
                              className="card-title"
                              style={{
                                textDecoration: "none",
                                color: "navy",
                                fontWeight: "bold",
                              }}
                            >
                              {course.name} ({course.number})
                            </div>
                            {/* <p className="card-text">{`From ${course.startDate.slice(0, 10)} to ${course.endDate.slice(0, 10)}`}</p> */}
                            <div className="btn btn-primary"> Go </div>
                            <span> </span>
                            <div
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                setCourse(course);
                              }}
                            >
                              {" "}
                              Edit
                            </div>
                            <span> </span>
                            <div
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteCourse(course.id);
                              }}
                            >
                              {" "}
                              Delete
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;