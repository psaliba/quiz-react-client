import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = db.assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <>
      <div className="container">

        <div className="d-flex flex-fill">
          <input type="text" className="input-field" placeholder="Search Assignments..." />
          <div className="flex-grow-1"/>
          <button type="button" className="btn btn-light"> <i className="fa fa-check-circle text-success"></i> Publish
            All</button>
          <button type="button" className="btn btn-danger">+ Module</button>

        </div>
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div>
              <FaEllipsisV className="me-2" /> ASSIGNMENTS
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                <li className="list-group-item" key={assignment._id}>
                  <div>
                    <FaEllipsisV className="me-2" />
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                    <span className="float-end">
                      <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                  </div>
                </li>))}
            </ul>
          </li>
        </ul>

      </div>
    </>
  );
}
export default Assignments;