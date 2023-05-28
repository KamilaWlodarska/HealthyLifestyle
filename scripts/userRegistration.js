var db = connect("mongodb://localhost/projectHealthyLifestyle");

console.log("-----------------");
console.log("User registration");
console.log("-----------------");
console.log("Enter name:");
var uName = passwordPrompt();
console.log();
console.log("Enter email:");
var email = passwordPrompt();
console.log();
console.log("Enter password:");
var pwd = passwordPrompt();
console.log();
console.log("Enter goal:");
var goal = passwordPrompt();

console.log("");
console.log("");
console.log("-----------------");
console.log("Entered data:");
console.log("-----------------");
console.log("userName: " + uName);
console.log("email: " + email);
console.log("password: " + pwd);
if (goal) {
    console.log("goal: " + goal);
}
console.log("");
console.log("");

var userDoc = {
    userName: String(uName),
    email: String(email),
    password: String(pwd),
};
if (goal) {
    userDoc.goal = String(goal);
}
db.users.insertOne(userDoc);

console.log("-----------------");
console.log("Document added!");
console.log("-----------------");

// console.log("");
// console.log("");
// console.log("-----------------");
// console.log("users collection:");
// console.log("-----------------");
// var allUsers = db.users.find();
// while (allUsers.hasNext()) {
//     printjson(allUsers.next());
// }