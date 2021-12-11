'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []

    try {
      db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return courses
  },

  getCourse: async (root, id) => {
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },

  getPeople: async () => {
    let db
    let people = []

    try {
      db = await connectDB()
      people = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return people
  },

  getPerson: async (root, id) => {
    let db
    let person

    try {
      db = await connectDB()
      person = await db.collection('students').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return person
  }
}
