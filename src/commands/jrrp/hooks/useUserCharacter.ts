import dayjs from 'dayjs'

const generateSeed = (userId: string, date: string) => {
    const combinedString = `${userId}${date}`
    let seed = 0
    for (let i = 0; i < combinedString.length; i++) {
        seed = (seed << 5) - seed + combinedString.charCodeAt(i)
    }
    return Math.abs(seed)
}

const mapToRange = (value: number, min: number, max: number) => {
    const range = max - min + 1
    const result = (value % range) + min
    return result <= max ? result : max
}

const generateTodaysLuck = (userId: string) => {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const seed = generateSeed(userId, currentDate)
    const luckValue = mapToRange(seed, 1, 100)
    return luckValue
}

export const useUserCharacter = (userId: string) => {
    const getCharacter = () => {
        const luckValue = generateTodaysLuck(userId)
        return luckValue
    }

    return {
        getCharacter
    }
}

export const getMsg = (luckValue: number) => {
    const luckRange = Math.floor(luckValue / 10)
    switch (luckRange) {
        case 0:
            return '嗯...没错...是百分制'
        case 1:
            return '呜哇！'
        case 2:
            return '哎呀，有点差劲呢...'
        case 3:
            return '看起来不太妙，小心点吧...'
        case 4:
            return '平淡是白开水，品尝之时无味'
        case 5:
            return '嗯..还行吧(或许..？'
        case 6:
            return '运气不错呢'
        case 7:
            return '不错哦'
        case 8:
            return '哇！太棒啦！'
        case 9:
            return '天啊，你今天的人品简直是完美无缺'
        case 10:
            return '你今天的人品值已经突破天际了！'
        default:
            return '嗯....'
    }
}
