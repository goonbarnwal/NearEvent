const fetchMeetupEvents = async () => {
    try {

        console.log("Meetup: API not configured");

        return [];

    } catch (error) {

        console.log("Meetup Provider Error:", error.message);

        return [];
    }
};

module.exports = {
    fetchMeetupEvents
};