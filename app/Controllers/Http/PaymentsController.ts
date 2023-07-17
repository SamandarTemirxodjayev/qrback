import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from "axios";
import Payment from "../../Models/Payment";
import PaymentHistory from '../../Models/PaymentHistory';

export default class PaymentsController {
  public async getToken() {
    try {
      const res = await axios.post("https://mesh.multicard.uz/auth", {
        application_id: "dev_ox",
        secret: "J8Q6G7cFleyS",
      })
      const token = await Payment.create({ token: res.data.token })
      return token
    } catch (error) {
      console.log(error)
    }
  }
  public async pay({ request }: HttpContextContract) {
    const body = request.body()
    let token = await Payment.query().where("id", 2)
    try {
      const res = await axios.post("https://mesh.multicard.uz/dev/payment", body, {
        headers: {
          Authorization: `Bearer ${token[0].token}`,
        },
      })
      let data = {
        uuid: res.data.data.uuid,
        card_pan: res.data.data.card_pan,
        phone: res.data.data.phone,
        ps: res.data.data.ps,
        status: res.data.data.status,
      }
      const history = await PaymentHistory.create(data)
      return history
    } catch (error) {
      console.log(error)
    }
  }
  public async otp({request, params}:HttpContextContract){
    const body = request.body()
    let token = await Payment.query().where("id", 2)
    try {
      const res = await axios.put("https://mesh.multicard.uz/dev/payment/" + params.id, body, {
        headers: {
          Authorization: `Bearer ${token[0].token}`,
        },
      })
      // const data = await PaymentHistory.findOrFail(params.id)
      // data.status = res.data.data.status
      // await data.save()
      return res.data
    } catch (error) {
      return error
    }
  }
}
