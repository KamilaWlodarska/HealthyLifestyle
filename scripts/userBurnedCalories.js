var db = connect("mongodb://localhost/projectHealthyLifestyle");

console.log("Enter year:");
var year = parseInt(passwordPrompt());
console.log();

var result = db.users.aggregate([
  {
    $lookup: {
      from: "workouts",
      localField: "_id",
      foreignField: "idUser",
      as: "workouts",
    },
  },
  {
    $unwind: "$workouts",
  },
  {
    $lookup: {
      from: "activities",
      localField: "workouts.idActivity",
      foreignField: "_id",
      as: "activities",
    },
  },
  {
    $unwind: "$activities",
  },
  {
    $redact: {
      $cond: {
        if: {
          $eq: [
            { $year: "$workouts.workoutDate" },
            year,
          ],
        },
        then: "$$KEEP",
        else: "$$PRUNE",
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      userName: { $first: "$userName" },
      totalBurnedCalories: { $sum: "$activities.burnedCalories" },
        year: { $first: { $year: "$workouts.workoutDate" }, },
      },
    },
  {
    $project: {
      _id: 0,
      userName: 1,
      totalBurnedCalories: 1,
    },
  },
  {
    $sort: {
      totalBurnedCalories: -1,
    },
  },
]);

console.log();
console.log("Users’ burned calories in "+year+":");
console.log(printjson(result));
