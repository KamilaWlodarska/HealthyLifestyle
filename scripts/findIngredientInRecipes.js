var db = connect("mongodb://localhost/projectHealthyLifestyle");

console.log("Enter ingredient name:");
var inName = passwordPrompt();
console.log();

var result = db.recipes.aggregate([
    {
        $match: {
            ingredients: String(inName),
        },
    },
    {
        $sort: {
            difficulty: 1,
        },
    },
    {
        $project: {
            _id: 0,
            recipeName: 1,
            recipeCalories: 1,
            difficulty: 1,
            time: 1,
        },
    },
]);

console.log();
console.log("Recipes with " + inName + ":");
console.log(printjson(result));
