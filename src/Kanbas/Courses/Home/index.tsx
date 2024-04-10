import Modules from "../Modules";

function Home() {

    return (

        <div className="d-flex container">
            <div className="col ">
            <Modules/>

            </div>

            <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ width: "250px" }}>
                <h5>Course Status</h5>
                <button type="button" className="btn btn-light"><i className="fas fa-ban"></i> Unpublish</button>
                <button type="button" className="btn btn-success" disabled><i className="far fa-check-circle"></i>
                    Published</button>
                <br /><br />
                <div className="btn-group-vertical gap-2 " role="group">
                    <button type="button" className="btn btn-light"> <i className="fas fa-file-import"></i> Import Existing
                        Content</button>
                    <button type="button" className="btn btn-light"> <i className="fas fa-upload"></i> Import from
                        Commons</button>
                    <button type="button" className="btn btn-light"> <i className="fas fa-bullseye"></i> Choose Home Page</button>
                    <button type="button" className="btn btn-light"> <i className="far fa-chart-bar"></i> View Course
                        Stream</button>
                    <button type="button" className="btn btn-light"> <i className="fas fa-bullhorn"></i> New
                        Announcements</button>
                    <button type="button" className="btn btn-light"> <i className="fas fa-chart-bar"></i> New Analytics</button>
                    <button type="button" className="btn btn-light"> <i className="fas fa-bell"></i> View Course
                        Notifications</button>
                </div>

                <br /><br />
                <h5>
                    To Do
                </h5>
                <hr />
                <ul className="wd-status-text">
                    <li>
                        <a href="/Kanbas/Courses/Assignments/screen.html">Assignment 1</a>
                        <ul>
                            <li> 100 points, Due July 1</li>
                        </ul>
                    </li>
                </ul>
                <br />
                <div className="row">
                    <div className="col">
                        <h5> Coming up </h5>
                    </div>
                    <div className="col wd-status-text"> <a href="."> <i className="far fa-calendar-alt"></i> View Calendar</a>
                    </div>

                </div>

                <hr />
                <ul className="wd-status-text fa-ul">
                    <li> <i className="far fa-calendar-alt"></i> <a href=".">Lect 1</a>
                        <ul>
                            <li>
                                CS1234, July 1
                            </li>
                        </ul>
                    </li>

                    <li> <i className="far fa-calendar-alt"></i> <a href=".">Lect 2</a>
                        <ul>
                            <li>
                                CS1234, July 12
                            </li>
                        </ul>
                    </li>
                    <li> <i className="far fa-calendar-alt"></i> <a href=".">Lect 3</a>
                        <ul>
                            <li>
                                CS1234, July 26
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

    )
}



export default Home;