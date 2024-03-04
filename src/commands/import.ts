import { commands } from '@/hooks/useCommand'

import Help from './help'
import CheckIn from './checkIn'
import Me from './me'
import Motd from './motd'
import Jrrp from './jrrp'
import Bill from './bill'

commands.set('/help', Help)
commands.set('/check-in', CheckIn)
commands.set('/checkIn', CheckIn)
commands.set('/me', Me)
commands.set('/motd', Motd)
commands.set('/jrrp', Jrrp)
commands.set('/bill', Bill)
