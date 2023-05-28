db.createView(
    "userWorkoutsMeals",
    "users",
    [
        {
            $lookup: {
                from: "workouts",
                localField: "_id",
                foreignField: "idUser",
                as: "workouts",
            },
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
            $lookup: {
                from: "meals",
                localField: "_id",
                foreignField: "idUser",
                as: "meals",
            },
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
            $group: {
                _id: "$_id",
                userName: { $first: "$userName" },
                workoutsData: {
                    $addToSet: {
                        $concatArrays: [
                            {
                                $map: {
                                    input: "$activities",
                                    as: "activity",
                                    in: {
                                        activityName: "$$activity.activityName",
                                        workoutDate: {
                                            $arrayElemAt: [
                                                "$workouts.workoutDate",
                                                {
                                                    $indexOfArray: [
                                                        "$activities._id",
                                                        "$$activity._id",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                mealsData: {
                    $addToSet: {
                        $concatArrays: [
                            {
                                $map: {
                                    input: "$recipes",
                                    as: "recipe",
                                    in: {
                                        recipeName: "$$recipe.recipeName",
                                        mealDate: {
                                            $arrayElemAt: [
                                                "$meals.mealDate",
                                                {
                                                    $indexOfArray: [
                                                        "$recipes._id",
                                                        "$$recipe._id",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                userName: 1,
                workouts: "$workoutsData",
                meals: "$mealsData",
            },
        },
    ]
);