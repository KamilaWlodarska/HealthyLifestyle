db.createView(
  "userMealtimePreparation",
  "users",
  [
    {
      $lookup: {
        from: "meals",
        localField: "_id",
        foreignField: "idUser",
        as: "meals",
      },
    },
    {
      $unwind: "$meals",
    },
    {
      $lookup: {
        from: "recipes",
        localField: "meals.idRecipe",
        foreignField: "_id",
        as: "recipes",
      },
    },
    {
      $unwind: "$recipes",
    },
    {
      $match: {
        "meals.mealDate": {
          $gte: ISODate("2023-02-01"),
          $lt: ISODate("2023-03-01"),
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        userName: { $first: "$userName" },
        totalMealtime: { $sum: "$recipes.time" },
        month: {
          $first: {
            $switch: {
              branches: [
                { case: { $eq: [{ $month: "$meals.mealDate" }, 1] }, then: "January" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 2] }, then: "February" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 3] }, then: "March" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 4] }, then: "April" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 5] }, then: "May" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 6] }, then: "June" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 7] }, then: "July" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 8] }, then: "August" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 9] }, then: "September" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 10] }, then: "October" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 11] }, then: "November" },
                { case: { $eq: [{ $month: "$meals.mealDate" }, 12] }, then: "December" },
              ],
              default: "unknown",
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        userName: 1,
        month: 1,
        totalMealtime: 1,
      },
    },
    {
      $sort: {
        totalMealtime: -1,
      },
    },
  ]
);