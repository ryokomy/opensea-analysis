import * as fsExtra from 'fs-extra'

export const outputJson = async (filename: string, obj: object) => {
    try {
      await fsExtra.outputJson(filename, obj, {
        encoding: 'utf-8',
        spaces: '  ',
      })  
    }
    catch (err) {
      throw err
    }
}

export const readJson = async(filename: string) => {
    try {
        return await fsExtra.readJSON(filename)
    }
    catch (err) {
        throw err
    }
}