import * as fsExtra from 'fs-extra'

export const outputJson = async (obj: object) => {
    try {
      await fsExtra.outputJson(`output.json`, obj, {
        encoding: 'utf-8',
        spaces: '  ',
      })  
    }
    catch (err) {
      throw err
    }
}

export const readJson = async() => {
    try {
        return await fsExtra.readJSON(`output.json`)
    }
    catch (err) {
        throw err
    }
}