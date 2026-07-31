const Parser = require("rss-parser");
const parser = new Parser();

const fetchGDGEvents = async () => {
    try {

        const feed = await parser.parseURL(
            "https://gdg.community.dev/feed/"
        );

        const events = feed.items.map(item => ({
            externalId: item.guid,
            title: item.title,
            description: item.contentSnippet || "",
            source: "GDG",
            category: "Tech",
            registrationLink: item.link,
            image: "",
            status: "approved"
        }));

        console.log(`GDG Events: ${events.length}`);

        return events;

    } catch (err) {

        console.log("GDG Error:", err.message);

        return [];
    }
};

module.exports = {
    fetchGDGEvents
};