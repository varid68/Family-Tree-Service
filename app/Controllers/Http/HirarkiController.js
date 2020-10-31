'use strict'

const DetailHirarki = use('App/Models/DetailHirarki')
const Hirarki = use('App/Models/Hirarki')
const Database = use('Database')

class HirarkiController {
  async index({ request, response }) {
    const url = request.url()
    const limit = Number(request.input('limit', 10))
    const offset = Number(request.input('offset', 0))
    const sortby = request.input('sortby', 'id')
    const order = request.input('order', 'asc')

    try {
      const hirarkis = await Database
        .table('hirarkis')
        .orderBy(sortby, order)
        .offset(offset)
        .limit(limit)

      const count = await Database
        .table('hirarkis')
        .limit(limit)
        .count()

      return response.status(201).send({
        count: count[0]['count(*)'],
        description: '',
        href: `${url}?limit=${limit}&offset=${offset}&sortby=${sortby}&order=${order}`,
        limit,
        offset,
        payload: hirarkis,
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
    const hirarki = await Hirarki.find(params.id)
    if (hirarki) {
      return response.status(201).send({
        payload: hirarki,
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
    const body = request.post()
    const hirarki = new Hirarki()

    hirarki.id = body.hirarki_id
    hirarki.name = body.hirarki_name
    hirarki.head = body.head
    await hirarki.save()


    body.data.forEach(item => {
      const detailHirarki = new DetailHirarki()
      detailHirarki.name = item.name
      detailHirarki.couple = item.couple
      detailHirarki.parent = item.parent
      detailHirarki.address = item.address
      detailHirarki.id_hirarki = body.hirarki_id
      detailHirarki.save()
    })

    return response.status(201).send({
      payload: hirarki,
      status_code: 201,
      status_message: "Success"
    })
  }

  async update({ params, request, response }) {
    const hirarkiInfo = request.only(['nisn', 'name', 'study'])
    const hirarki = await Hirarki.find(params.id)
    if (!hirarki) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    hirarki.nisn = hirarkiInfo.nisn
    hirarki.name = hirarkiInfo.name
    hirarki.study = hirarkiInfo.study
    await hirarki.save()
    return response.status(200).json(hirarki)
  }

  async delete({ params, response }) {
    const hirarki = await Hirarki.find(params.id)
    if (!hirarki) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    await hirarki.delete()
    return response.status(200).json(null)
  }
}

module.exports = HirarkiController
