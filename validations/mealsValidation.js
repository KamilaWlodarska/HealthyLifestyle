db.runCommand({
    collMod: "meals",
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
              'idUser',
              'idRecipe',
              'mealDate'
            ],
            properties: {
              _id: {},
              idUser: {
                bsonType: 'objectId'
              },
              idRecipe: {
                bsonType: 'objectId'
              },
              mealDate: {
                bsonType: 'date'
              },
              mealNote: {
                bsonType: 'string',
                maxLength: 200
              }
            }
        }
    }
});