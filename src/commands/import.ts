import { commands } from '@/hooks/useCommand'

import Help from './help'
import CheckIn from './checkIn'
import Me from './me'
import Motd from './motd'

commands.set('/help', Help)
// 煞笔 QQ 你妈的短横线不是英文字符是吧，中文不行英文限制这么多 还是用 Mirai 好了
commands.set('/check-in', CheckIn)
commands.set('/checkIn', CheckIn)
commands.set('/me', Me)
commands.set('/motd', Motd)
