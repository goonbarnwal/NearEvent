const techKeywords = [

    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "ML",
    "Developer",
    "Developers",
    "Coding",
    "Programming",
    "Hackathon",
    "Technology",
    "Software",
    "Cloud",
    "AWS",
    "Azure",
    "Google Developer",
    "Google Developers",
    "DevFest",
    "GDG",
    "React",
    "Angular",
    "Vue",
    "JavaScript",
    "Node",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Cyber Security",
    "Cybersecurity",
    "Data Science",
    "Blockchain",
    "Web Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "DevOps",
    "Docker",
    "Kubernetes",
    "Open Source",
    "Conference",
    "Workshop",
    "Meetup"
];



const isTechEvent = (event) => {


    const text = (

        (event.name || "") +

        " " +

        (event.info || "") +

        " " +

        (event.classifications?.[0]?.segment?.name || "") +

        " " +

        (event.classifications?.[0]?.genre?.name || "")

    ).toLowerCase();



    return techKeywords.some(keyword =>

        text.includes(
            keyword.toLowerCase()
        )

    );


};



module.exports = {
    isTechEvent
};