db.createView(
    "dietTypeRanking",
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
        $unwind: "$recipes.dietType",
      },
      {
        $group: {
          _id: "$recipes.dietType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          dietType: "$_id",
          count: 1,
        },
      },
    ]
);