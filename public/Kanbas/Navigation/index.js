function navSidebar(location) {
    const links = [
        {
            class: "",
            name: "Account",
            url: "/Kanbas/Account",
            iconClass: "fas fa-user-circle",
            iconExtras: [`style="color:White"`]
        },
        {
            class: "wd-active",
            name: "Dashboard",
            url: "/Kanbas/Dashboard/screen.html",
            iconClass: "fas fa-tachometer-alt",
        },
        {
            class: "",
            name: "Courses",
            url: "/Kanbas/Courses/Home/screen.html",
            iconClass: "fas fa-book-dead",
        },
        {
            class: "",
            name: "Calendar",
            url: "#",
            iconClass: "fa fa-calendar",
        },
        {
            class: "",
            name: "Inbox",
            url: "#",
            iconClass: "fa fa-inbox",
        },
        {
            class: "",
            name: "History",
            url: "#",
            iconClass: "fa fa-history",
        },
        {
            class: "",
            name: "Studio",
            url: "#",
            iconClass: "fa fa-tv",
        },
        {
            class: "",
            name: "Commons",
            url: "#",
            iconClass: "fa fa-sign-out-alt",
        }
    ];

    document.write(`
     <ul class="wd-kanbas-navigation">
     <li>
     <a href="/Kanbas/Dashboard/screen.html"> <img src="/images/NU.png" height="40" width="40"> </a>
   </li>
     ${links.map((link) => {
        if (location === link.name && link.name === "Account") {
            link.iconExtras = []
        }
        return `<li class=${location === link.name ? "wd-active" : ""}><a href="${link.url}"><i class="${link.iconClass}" ${link.iconExtras?.map((style) => style)}></i> ${link.name} </a></li>`
    }).join("")
        }
    </ul>
    `);
}

function courseNav(page) {
    const links = [
        {
            name: "Home",
            url: "/Kanbas/Courses/Home/screen.html"
        },
        {
            name: "Modules",
            url: "#"
        },
        {
            name: "Piazza",
            url: "#"
        },
        {
            name: "Zoom Meetings",
            url: "#"
        },
        {
            name: "Assignments",
            url: "/Kanbas/Courses/Assignments/screen.html"
        },
        {
            name: "Quizzes",
            url: "#"
        },
        {
            name: "Grades",
            url: "/Kanbas/Courses/Grades/screen.html"
        },
        {
            name: "People",
            url: "#"
        },
        {
            name: "Panopto Video",
            url: "#"
        },
        {
            name: "Discussions",
            url: "#"
        },
        {
            name: "Announcements",
            url: "#"
        },
        {
            name: "Pages",
            url: "#"
        },
        {
            name: "Files",
            url: "#"
        },
        {
            name: "Rubrics",
            url: "#"
        },
        {
            name: "Outcomes",
            url: "#"
        },
        {
            name: "Collaborations",
            url: "#"
        },
        {
            name: "Syllabus",
            url: "#"
        },
        {
            name: "Settings",
            url: "#"
        },
    ];
    document.write(`
    <ul class="wd-navigation">
    ${links.map((link) =>
        `<li class="${link.name === page ? "wd-active" : "d"}"> <a href="${link.url}"> ${link.name} </a> </li>`
    ).join("")
        }
    </ul>
    `);
}