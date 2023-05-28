db.runCommand({
    collMod: "workouts",
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
              'idActivity',
              'idUser',
              'workoutDate'
            ],
            properties: {
              _id: {},
              idActivity: {
                bsonType: 'objectId'
              },
              idUser: {
                bsonType: 'objectId'
              },
              workoutDate: {
                bsonType: 'date'
              },
              workoutNote: {
                bsonType: 'string',
                maxLength: 200
              }
            }
        }
    }
});