import * as dotenv from 'dotenv'
dotenv.config()
import { fetchOpenAI } from './libs/gpt3'
import * as fs from 'fs'

const POSTS_DIR = process.env.POSTS_DIR || 'posts'

const main = async () => {
  const args = process.argv
  console.log(process.argv)
  if (args[2] === 'add') {
    console.log('add')
    const filePath = args[3]
    const keyword = args[4]
    const addPrompt = args[5]

    const message = `Buat artikel dengan judul dan table sekitar 500 karakter. Harap tampilkan dengan MarkDown.`
    const answer = await fetchOpenAI(`${message}${addPrompt} \n${keyword}`)

    fs.appendFileSync(`${POSTS_DIR}/${filePath}.md`, answer)
  }

  if (args[2] === 'add-any') {
    console.log('add-any')
    const filePath = args[3]
    const keyword = args[4]

    const answer = await fetchOpenAI(`${keyword}`)

    fs.appendFileSync(`${POSTS_DIR}/${filePath}.md`, answer)
  }
}

main()
