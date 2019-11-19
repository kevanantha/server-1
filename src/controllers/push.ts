import { Request, Response, NextFunction } from 'express'
import { User, IUserModel } from '../models'
import axios, { AxiosPromise } from 'axios'

export default class PushController {
  static async push(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUserModel[] = await User.find({}).select('device_token')

      // let arr: AxiosPromise[] = users.map((user: IUserModel) => {
      //   if (!user.device_token) return null
      //   return axios({
      //     url: 'https://exp.host/--/api/v2/push/send',
      //     method: 'POST',
      //     data: {
      //       to: user.device_token,
      //       body: 'You have 1 new promo'
      //     },
      //     headers: {
      //       host: 'exp.host',
      //       accept: 'application/json',
      //       'content-type': 'application/json'
      //     }
      //   })
      // })

      // console.log(arr)
      // await Promise.all(arr)
      let arr = []
      console.log(users)
      users.forEach((user: IUserModel) => {
        if (!user.device_token) return
        arr.push(user.device_token)
      })
      await axios({
        url: 'https://exp.host/--/api/v2/push/send',
        method: 'POST',
        data: {
          to: arr,
          body: 'You have new promos'
        },
        headers: {
          host: 'exp.host',
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
      res.status(200).json({ message: 'Push sent' })
    } catch (e) {
      next(e)
    }
  }
}
