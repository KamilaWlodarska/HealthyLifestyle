db.runCommand({
    collMod: "recipes",
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
              'recipeName',
              'dietType',
              'difficulty',
              'time',
              'recipeCalories',
              'ingredients',
              'instruction'
            ],
            properties: {
              _id: {},
              recipeName: {
                bsonType: 'string',
                maxLength: 50
              },
              dietType: {
                bsonType: 'array',
                uniqueItems: true,
                items: {
                  bsonType: 'string'
                }
              },
              difficulty: {
                bsonType: 'string',
                maxLength: 20
              },
              time: {
                bsonType: 'int',
                minimum: 0
              },
              recipeCalories: {
                bsonType: 'int',
                minimum: 0
              },
              ingredients: {
                bsonType: 'array',
                uniqueItems: true,
                items: {
                  bsonType: 'string'
                }
              },
              instruction: {
                bsonType: 'array',
                uniqueItems: true,
                items: {
                  bsonType: 'string'
                }
              }
            }
        }
    }
});