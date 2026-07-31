const getCategory = (text = "") => {

    text = text.toLowerCase();

    if (
        text.includes("hackathon") ||
        text.includes("coding") ||
        text.includes("programming")
    ) {
        return "Hackathon";
    }

    if (
        text.includes("ai") ||
        text.includes("artificial intelligence") ||
        text.includes("machine learning") ||
        text.includes("data science")
    ) {
        return "AI Workshop";
    }

    if (
        text.includes("developer") ||
        text.includes("devfest") ||
        text.includes("gdg") ||
        text.includes("react") ||
        text.includes("javascript")
    ) {
        return "Developer Meetup";
    }

    if (
        text.includes("cyber") ||
        text.includes("security")
    ) {
        return "Cyber Security";
    }

    if (
        text.includes("startup") ||
        text.includes("entrepreneur")
    ) {
        return "Startup Networking";
    }

    return "Tech Event";
};

module.exports = {
    getCategory
};