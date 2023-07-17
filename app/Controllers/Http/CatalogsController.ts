import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from '../../Models/Catalog'
import Menu from '../../Models/Menu'

export default class CatalogsController {

  public async store({request, response}: HttpContextContract){
    const body = request.body()

    const catalog = await Catalog.create(body)
    response.status(201)

    return {
      msg: "Catalog created",
      data: catalog
    }
  }

  public async index(){
    const catalogs = await Catalog.all();
    return catalogs.reverse()
  }

  public async show({params}: HttpContextContract){
    const catalog = await Catalog.query().where('id', params.id)
    const menus = await Menu.query().where('catalog_id', params.id)
    return {
      catalog,
      menus
    }
  }

  public async destroy({params}: HttpContextContract){
    const catalog = await Catalog.findOrFail(params.id)
    await catalog.delete()
    return {
      msg: "Catalog deleted",
      data: catalog
    }
  }

  public async update({params, request}: HttpContextContract){
    const body = request.body()
    const catalog = await Catalog.findOrFail(params.id)
    catalog.name = body.name
    await catalog.save()
    return {
      msg: "Catalog updated",
      data: catalog
    }
  }
}
