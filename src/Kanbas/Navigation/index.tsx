import { Link, useLocation } from "react-router-dom";
import "./index.css"
import { FaTachometerAlt, FaRegUserCircle, FaRegCalendarAlt, FaBookDead, FaInbox, FaHistory, FaTv, FaSignOutAlt } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        {
            class: "",
            name: "Account",
            url: "/Kanbas/Account/",
            iconClass: <FaRegUserCircle className="fs-2"/>,
            iconExtras: [`style="color:White"`]
        },
        {
            class: "wd-active",
            name: "Dashboard",
            url: "/Kanbas/Dashboard/screen.html",
            iconClass: <FaTachometerAlt className="fs-2"/>,
        },
        {
            class: "",
            name: "Courses",
            url: "/Kanbas/Courses/Home/screen.html",
            iconClass: <FaBookDead className="fs-2"/>,
        },
        {
            class: "",
            name: "Calendar",
            url: "#",
            iconClass: <FaRegCalendarAlt className="fs-2"/>,
        },
        {
            class: "",
            name: "Inbox",
            url: "#",
            iconClass: <FaInbox className="fs-2"/>,
        },
        {
            class: "",
            name: "History",
            url: "#",
            iconClass: <FaHistory className="fs-2"/>,
        },
        {
            class: "",
            name: "Studio",
            url: "#",
            iconClass: <FaTv className="fs-2"/>,
        },
        {
            class: "",
            name: "Commons",
            url: "#",
            iconClass: <FaSignOutAlt className="fs-2"/>,
        }
    ];

    const { pathname } = useLocation();

    return (
        
            <ul className="wd-kanbas-navigation d-none d-md-block">
                <li>
                    <a href="/Kanbas/Dashboard/screen.html"> <img src="/images/NU.png" height="40" width="40" alt="NU logo" /> </a>
                </li>
                {links.map((link, index) => {
                    if (pathname === link.name && link.name === "Account") {
                        link.iconExtras = []
                    }
                    return (
                        <li className={`.wd-kanbas-navigation ${pathname.includes(link.name) ? "wd-active" : ""}`} key={index}>
                            
                            <Link to={`/Kanbas/${link.name}`}> 
                            <div>{link.iconClass} {link.name}</div> </Link>

                        </li>
                    )
                })
                }
            </ul>
    );
}
export default KanbasNavigation;