'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    let db, course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },

  createStudent: async (root, { input }) => {
    let db, student

    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },

  editCourse: async (root, { _id, input }) => {
    let db, course

    try {
      db = await connectDB()
      await db
        .collection('courses')
        .updateOne({ _id: ObjectId(_id) }, { $set: input })
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },

  editStudent: async (root, { _id, input }) => {
    let db, student

    try {
      db = await connectDB()
      await db
        .collection('students')
        .updateOne({ _id: ObjectId(_id) }, { $set: input })
      student = await db.collection('students').findOne({ _id: ObjectId(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },

  deleteCourse: async (root, { _id }) => {
    let db, messa

    try {
      db = await connectDB()
      messa = await db.collection('courses').deleteOne({ _id: ObjectId(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return messa.deletedCount
      ? `EL curso con id ${_id} fue eliminado.`
      : 'No existe el curso con el id indicado'
  },

  deleteStudent: async (root, { _id }) => {
    let db, messa

    try {
      db = await connectDB()
      messa = await db.collection('students').deleteOne({ _id: ObjectId(_id) })
    } catch (error) {
      errorHandler(error)
    }

    return messa.deletedCount
      ? `EL estudiante con id ${_id} fue eliminado.`
      : 'No existe el estudiante con el id indicado'
  },

  addPeople: async (root, { courseID, personID }) => {
    let db, person, course

    try {
      db = await connectDB()

      course = await db
        .collection('courses')
        .findOne({ _id: ObjectId(courseID) })
      person = await db
        .collection('students')
        .findOne({ _id: ObjectId(personID) })

      if (!course || !person) {
        throw new Error('La persona o el estudiante no existe')
      }

      await db
        .collection('courses')
        .updateOne(
          { _id: ObjectId(courseID) },
          { $addToSet: { people: ObjectId(personID) } }
        )
    } catch (error) {
      errorHandler(error)
    }

    return course
  }
}
