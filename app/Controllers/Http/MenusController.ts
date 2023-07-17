import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Menu from '../../Models/Menu'

export default class MenusController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const menu = await Menu.create(body)
    response.status(201)

    return {
      msg: "Menu created",
      data: menu
    }
  }
  public async index() {
    const menu = await Menu.all()
    return menu.reverse()
  }
  public async show({params}: HttpContextContract) {
    const menu = await Menu.findOrFail(params.id)
    return menu
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const menu = await Menu.findOrFail(params.id)
    menu.name = body.name
    menu.description = body.description
    menu.price = body.price
    menu.img = body.img
    menu.catalog_id = body.catalog_id
    await menu.save()
    return {
      msg: "Menu updated",
      data: menu
    }
  }
  public async destroy({ params }: HttpContextContract) {
    const menu = await Menu.findOrFail(params.id)
    await menu.delete()
    return {
      msg: "Menu deleted",
      data: menu
    }
  }
}
