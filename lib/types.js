'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db, peopleData, ids

      try {
        db = await connectDB()

        ids = people ? people.map((id) => ObjectId(id)) : []

        peopleData =
          ids.length > 0
            ? await db
                .collection('students')
                .find({ _id: { $in: ids } })
                .toArray()
            : []
      } catch (error) {
        errorHandler(error)
      }
      return peopleData
    }
  }
}