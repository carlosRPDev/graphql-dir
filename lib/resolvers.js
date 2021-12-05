'use strict'

const courses = [
  {
    _id: 'anyid',
    title: 'Mi titulo 1',
    teacher: 'Mi profesor 1',
    description: 'Una descripcion 1',
    topic: 'Programacion'
  },
  {
    _id: 'anyid1',
    title: 'Mi titulo 2',
    teacher: 'Mi profesor 2',
    description: 'Una descripcion 2',
    topic: 'Programacion'
  },
  {
    _id: 'anyid2',
    title: 'Mi titulo 3',
    teacher: 'Mi profesor 3',
    description: 'Una descripcion 3',
    topic: 'Programacion'
  }
]

module.exports = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      const course = courses.filter((course) => course._id === args.id)
      return course.pop()
    }
  }
}
