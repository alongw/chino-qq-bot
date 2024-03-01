import { commands } from '@/hooks/useCommand'

import Help from './help'
import CheckIn from './checkIn'
import Me from './me'
import Motd from './motd'

commands.set('/help', Help)
commands.set('/check-in', CheckIn)
commands.set('/me', Me)
commands.set('/motd', Motd)
