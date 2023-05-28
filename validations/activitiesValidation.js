db.runCommand({
    collMod: "activities",
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
              'activityName',
              'duration',
              'intensity',
              'burnedCalories'
            ],
            properties: {
              _id: {},
              activityName: {
                bsonType: 'string',
                maxLength: 20
              },
              duration: {
                bsonType: 'int',
                minimum: 0
              },
              intensity: {
                bsonType: 'string',
                maxLength: 20
              },
              burnedCalories: {
                bsonType: 'int',
                minimum: 0
              }
            }
        }
    }
});