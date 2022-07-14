db.clients.update( { "_id" : ObjectId("60f0a879c1c9bb6a50854714") }, { $push: { "pmx.conditions": { "name": "hypertension", "status": "active" }}} ) 


db.pautas.updateOne(
    { "id": ObjectId("1"), "data.universities._id": "2"}, 
    {$push: 
        {"data.universities.$.students": {name: "aStudentName", age: 22}}
    })

    {
        _id: ObjectId("1"),
        data: {
          city: "ccp",
          universities: [
            {
              _id: "2"
              name: "universityOne"
              students: []
            },
            {
              _id: "3"
              name: "universityTwo",
              students: []
            }
          ]
        }
      }