import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan, FaEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
    const dispatch = useDispatch();

    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId).then((modules) => {
            dispatch(setModules(modules));
        });
    }, [courseId, dispatch]);

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);

    const handleAddModule = () => {
        client.createModule(courseId, module).then((newModule) => {
            dispatch(addModule(newModule))

        });
    };

    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then(() => {
            dispatch(deleteModule(moduleId));
        });
    };

    const [selectedModule, setSelectedModule] = useState(moduleList[0]);

    const handleUpdateModule = async () => {
        client.updateModule(module);
        dispatch(updateModule(module));
    };

    // const [modulesList, setModulesList] = useState(db.modules.filter((module) => module.course === courseId));
    // const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    // const [module, setModule] = useState({
    //     _id: "0",
    //     name: "New Module",
    //     description: "New Module Description",
    //     course: courseId ?? "0",
    //     lessons: []
    // });
    // const addModule = (module: any) => {
    //     const newModule = {
    //         ...module,
    //         _id: new Date().getTime().toString()
    //     };
    //     const newModuleList = [...modulesList, newModule];
    //     setModulesList(newModuleList);
    // };

    // const deleteModule = (moduleId: string) => {
    //     setModulesList(modulesList.filter((module) => module._id !== moduleId));
    // }

    // const updateModules = () => {
    //     const newModuleList = modulesList.map((m) => {
    //       if (m._id === module._id && courseId === module.course) {
    //         return {...module, lessons: m?.lessons};
    //       } else {
    //         return m;
    //       }
    //     });
    //     setModulesList(newModuleList);
    //   };
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-fill">
                    <button type="button" className="btn btn-light">Collapse All</button>
                    <button type="button" className="btn btn-light">View Progress</button>
                    <button type="button" className="btn btn-light"> <i className="fa fa-check-circle text-success"></i> Publish
                        All</button>
                    <button type="button" className="btn btn-danger">+ Module</button>
                    <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v"></i></button>

                </div>
                <hr />
                <div>
                    <div className="d-flex flex-column">
                        <div className="container">
                            <input className="form-control" value={module.name}
                                onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                            />
                        </div>
                        <div className="container">
                            <textarea className="form-control" value={module.description}
                                onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
                                }
                            />
                        </div>
                        <div className="container">
                            <button type="button"
                                onClick={handleAddModule}
                                className="btn btn-primary">Add</button>
                            <button type="button"
                                onClick={handleUpdateModule}
                                className="btn btn-secondary">Update</button>
                        </div>


                    </div>
                    <hr></hr>
                    <ul className="list-group wd-modules">
                        {moduleList
                            .filter((module) => module.course === courseId)
                            .map((module) => (
                                <li
                                    className="list-group-item"
                                    key={module._id}
                                    onClick={() => setSelectedModule(module)}>
                                    <div>
                                        <FaEllipsisV className="me-2" />
                                        {module.name}
                                        <span className="float-end" >
                                            <button type="button" onClick={() => dispatch(setModule(module))}>  <FaEdit color="green" /> </button>
                                            <button type="button" style={{ padding: '0 7px' }} onClick={() => handleDeleteModule(module._id)}>  <FaBan color="red" /> </button>
                                            <FaCheckCircle className="text-success" />
                                            <FaPlusCircle className="ms-2" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </div>
                                    {selectedModule?._id === module._id && (
                                        <ul className="list-group">
                                            {module.lessons?.map((lesson: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                <li className="list-group-item" key={lesson._id}>
                                                    <FaEllipsisV className="me-2" />
                                                    {lesson.name}
                                                    <span className="float-end">
                                                        <FaCheckCircle className="text-success" />
                                                        <FaEllipsisV className="ms-2" />
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default ModuleList;