import fse from 'fs-extra'
import _ from 'lodash'

const handlePath = (path: string) => {
    // 去除首尾空格和斜杠
    const newPath = _.trim(path, '/')
    return newPath
}

export const useData = (command: string) => {
    command = handlePath(command)

    // 判断文件夹是否存在 不存在则创建
    fse.pathExistsSync(`./data/${command}`) ? '' : fse.mkdirSync(`./data/${command}`)

    // getFile
    const getFile = (path: string): string | null => {
        const newPath = handlePath(path)
        // 判断文件是否存在
        if (!fse.pathExistsSync(`./data/${command}/${newPath}`)) return null
        return fse.readFileSync(`./data/${command}/${newPath}`, 'utf-8')
    }

    // writeFile
    const writeFile = (path: string, data: string) => {
        if (!data) return false
        const newPath = handlePath(path)
        fse.writeFileSync(`./data/${command}/${newPath}`, data)
    }

    // exists
    const fileExists = (path: string) => {
        const newPath = handlePath(path)
        return fse.pathExistsSync(`./data/${command}/${newPath}`)
    }

    return {
        getFile,
        writeFile,
        fileExists
    }
}
