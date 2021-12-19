const firebase = require("@firebase/testing");
const MY_PROJECT_ID = "qchen-chat";

test("can read items in the read-only collection", async () => {
    const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
    const testDoc = db.collection("awaitingchatrooms").doc("hello there");
    await firebase.assertFails(testDoc.get());
})