const CloudKit = require("cloudkit");
const containerConfig = require("config");

CloudKit.configure({
    services: {
        fetch: fetch,
        logger: console
    },
    containers: [ containerConfig ]
});

const container = CloudKit.getDefaultContainer();
const database = container.publicCloudDatabase;

//2
container.setUpAuth();

