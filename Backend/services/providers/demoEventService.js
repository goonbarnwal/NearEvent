const fetchDemoEvents = async () => {

    console.log("Demo Events Generated");


    const events = [

        {
            title: "AI & Machine Learning Workshop",
            description: "Hands-on AI and ML workshop for students and developers",
            category: "Technology",
            startDate: "2026-08-15",
            endDate: "2026-08-15",
            time: "10:00 AM",
            venue: "Ajeenkya DY Patil University",
            address: "Lohegaon, Pune",
            city: "Pune",
            location: {
                latitude: 18.5679,
                longitude: 73.9143
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-ai-workshop-001",
            organizer: {
                name: "NearEvent Team",
                email: "contact@nearevent.com"
            }
        },


        {
            title: "Startup Meetup Pune",
            description: "Startup founders and entrepreneurs networking event",
            category: "Startup",
            startDate: "2026-09-10",
            endDate: "2026-09-10",
            time: "05:00 PM",
            venue: "Viman Nagar",
            address: "Viman Nagar, Pune",
            city: "Pune",
            location: {
                latitude: 18.5679,
                longitude: 73.9143
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-startup-meetup-002",
            organizer: {
                name: "Startup Pune Community",
                email: "startup@example.com"
            }
        },


        {
            title: "Google Developer Community Event",
            description: "Developers meetup and coding discussion",
            category: "Developer",
            startDate: "2026-10-05",
            endDate: "2026-10-05",
            time: "11:00 AM",
            venue: "Pune IT Park",
            address: "Hinjewadi, Pune",
            city: "Pune",
            location: {
                latitude: 18.5913,
                longitude: 73.7389
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-gdg-event-003",
            organizer: {
                name: "Google Developer Community",
                email: "gdg@example.com"
            }
        },


        {
            title: "Cyber Security Awareness Seminar",
            description: "Security experts explain cyber threats and protection methods",
            category: "Cyber Security",
            startDate: "2026-08-25",
            endDate: "2026-08-25",
            time: "02:00 PM",
            venue: "COEP Technological University",
            address: "Shivajinagar, Pune",
            city: "Pune",
            location: {
                latitude: 18.5308,
                longitude: 73.8475
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-cyber-004",
            organizer: {
                name: "Cyber Pune Community",
                email: "cyber@example.com"
            }
        },


        {
            title: "Cloud Computing Workshop",
            description: "AWS and Cloud fundamentals training session",
            category: "Cloud",
            startDate: "2026-09-20",
            endDate: "2026-09-20",
            time: "10:30 AM",
            venue: "Baner IT Hub",
            address: "Baner, Pune",
            city: "Pune",
            location: {
                latitude: 18.5590,
                longitude: 73.7868
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-cloud-005",
            organizer: {
                name: "Cloud Community Pune",
                email: "cloud@example.com"
            }
        },


        {
            title: "Data Science Meetup",
            description: "Data analytics and machine learning discussion",
            category: "Data Science",
            startDate: "2026-10-15",
            endDate: "2026-10-15",
            time: "04:00 PM",
            venue: "Magarpatta City",
            address: "Hadapsar, Pune",
            city: "Pune",
            location: {
                latitude: 18.5089,
                longitude: 73.9260
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-data-006",
            organizer: {
                name: "Data Science Pune",
                email: "datascience@example.com"
            }
        },


        {
            title: "Web Development Bootcamp",
            description: "Full stack development training for beginners",
            category: "Web Development",
            startDate: "2026-11-05",
            endDate: "2026-11-05",
            time: "09:30 AM",
            venue: "Kharadi IT Park",
            address: "Kharadi, Pune",
            city: "Pune",
            location: {
                latitude: 18.5515,
                longitude: 73.9470
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-web-007",
            organizer: {
                name: "NearEvent Team",
                email: "contact@nearevent.com"
            }
        },


        {
            title: "Hackathon Pune 2026",
            description: "24 hour coding challenge for developers",
            category: "Hackathon",
            startDate: "2026-12-01",
            endDate: "2026-12-02",
            time: "09:00 AM",
            venue: "Symbiosis Institute Pune",
            address: "Lavale, Pune",
            city: "Pune",
            location: {
                latitude: 18.5200,
                longitude: 73.7200
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-hackathon-008",
            organizer: {
                name: "Hack Pune",
                email: "hack@example.com"
            }
        },


        {
            title: "Blockchain Technology Meetup",
            description: "Introduction to blockchain and Web3 technologies",
            category: "Blockchain",
            startDate: "2026-11-20",
            endDate: "2026-11-20",
            time: "03:00 PM",
            venue: "Aundh IT Center",
            address: "Aundh, Pune",
            city: "Pune",
            location: {
                latitude: 18.5615,
                longitude: 73.8077
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-blockchain-009",
            organizer: {
                name: "Web3 Pune",
                email: "web3@example.com"
            }
        },


        {
            title: "Women In Technology Conference",
            description: "Conference focused on women developers and leaders",
            category: "Conference",
            startDate: "2026-12-15",
            endDate: "2026-12-15",
            time: "11:00 AM",
            venue: "JW Marriott Pune",
            address: "Senapati Bapat Road, Pune",
            city: "Pune",
            location: {
                latitude: 18.5308,
                longitude: 73.8375
            },
            registrationLink: "https://example.com",
            source: "Demo",
            externalId: "demo-wit-010",
            organizer: {
                name: "Tech Community Pune",
                email: "tech@example.com"
            }
        }

    ];


    return events;

};



module.exports = {
    fetchDemoEvents
};