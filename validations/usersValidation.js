db.runCommand({
    collMod: "users",
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            additionalProperties: false,
            required: [
              'userName',
              'email',
              'password'
            ],
            properties: {
              _id: {},
              userName: {
                bsonType: 'string',
                maxLength: 20
              },
              email: {
                bsonType: 'string',
                maxLength: 40,
                pattern: '[a-z0-9._%+!$&*=^|~#%{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,22})'
              },
              password: {
                bsonType: 'string',
                minLength: 8,
                maxLength: 40
              },
              goal: {
                bsonType: 'string',
                maxLength: 100
              }
            }
        }
    }
});