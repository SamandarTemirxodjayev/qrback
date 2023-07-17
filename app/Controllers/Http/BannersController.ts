import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Banner from '../../Models/Banner'

export default class BannersController {
  public async store({request, response}: HttpContextContract){
    const body = request.body()
    const banner = await Banner.create(body)
    response.status(201)
    return {
      msg: "banner created",
      data: banner
    }
  }
  public async index(){
    const banners = await Banner.all()
    return banners.reverse()
  }
  public async show({ params }: HttpContextContract){
    const banner = await Banner.findOrFail(params.id)
    return banner
  }
  public async update({ params, request }: HttpContextContract){
    const banner = await Banner.findOrFail(params.id)
    const body = request.body()
    banner.img = body.img
    await banner.save()
    return {
      msg: "banner updated",
      data: banner
    }
  }
  public async destroy({ params }: HttpContextContract){
    const banner = await Banner.findOrFail(params.id)
    await banner.delete()
    return {
      msg: "banner deleted",
      data: banner
    }
  }
}
