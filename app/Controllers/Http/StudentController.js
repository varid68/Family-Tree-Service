'use strict'

const Student = use('App/Models/Student')
const Database = use('Database')

class StudentController {
  async index({ request, response }) {
    const url = request.url()
    const limit = Number(request.input('limit', 10))
    const offset = Number(request.input('offset', 0))
    const sortby = request.input('sortby', 'id')
    const order = request.input('order', 'asc')

    try {
      const students = await Database
        .table('students')
        .orderBy(sortby, order)
        .offset(offset)
        .limit(limit)

      const count = await Database
        .table('students')
        .limit(limit)
        .count()

      return response.status(201).send({
        count: count[0]['count(*)'],
        description: '',
        href: `${url}?limit=${limit}&offset=${offset}&sortby=${sortby}&order=${order}`,
        limit,
        offset,
        payload: students,
        status_code: 200,
        status_message: "Success"
      })
    } catch (error) {
      return response.status(403).send({
        description: error.sqlMessage,
        href: `${url}?limit=${limit}&offset=${offset}&sortby=${sortby}&order=${order}`,
        payload: null,
        status_code: 403
      })
    }
  }

  async show({ params, response }) {
    const student = await Student.find(params.id)
    if (student) {
      return response.status(201).send({
        payload: student,
        status_code: 200,
        status_message: "Success"
      })
    } else {
      return response.status(403).send({
        description: 'record not found',
        payload: null,
        status_code: 403
      })
    }
  }

  async store({ request, response }) {
    const studentInfo = request.only(['nisn', 'name', 'study'])
    const student = new Student()
    student.nisn = studentInfo.nisn
    student.name = studentInfo.name
    student.study = studentInfo.study
    await student.save()
    return response.status(201).json(student)
  }

  async update({ params, request, response }) {
    const studentInfo = request.only(['nisn', 'name', 'study'])
    const student = await Student.find(params.id)
    if (!student) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    student.nisn = studentInfo.nisn
    student.name = studentInfo.name
    student.study = studentInfo.study
    await student.save()
    return response.status(200).json(student)
  }

  async delete({ params, response }) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    await student.delete()
    return response.status(200).json(null)
  }
}

module.exports = StudentController
