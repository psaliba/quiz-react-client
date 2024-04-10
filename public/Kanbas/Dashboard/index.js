function getCourses() {
    const courses = [
        {
            img: "/images/test.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 React JS",
            text: "Full stack developer",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/red.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 Red",
            text: "I'm Red",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/blue.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 Blue",
            text: "I'm blue",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/gray.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 gray JS",
            text: "im gray",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/purple.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 purple",
            text: "Full stack developer",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/yellow.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 yellow JS",
            text: "Full stack developer",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/green.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "Green",
            text: "Full stack developer",
            goLink: "/Kanbas/Courses/Home/screen.html"
        },
        {
            img: "/images/pink.jpg",
            courseLink: "/Kanbas/Courses/Home/screen.html",
            name: "CS1234 pink JS",
            text: "Full stack developer",
            goLink: "/Kanbas/Courses/Home/screen.html"
        }
    ];

    document.write(`
    ${courses.map((course, i) => {
        return `
        <div class="col" style="width: 300px">
        <div class="card"> <img src="${course.img}" class="card-img-top"
    style="max-height: 150px"/>
        <div class="card-body">
            <a class="card-title" href="${course.courseLink}"
            style="text-decoration: none; color: navy; font-weight: bold">
            ${course.name}</a>
            <p class="card-text">${course.text}</p>
            <a href="${course.goLink}" class="btn btn-primary"> Go </a>
        </div>
</div>
</div>`
    }).join("")}
    `)
}
