import { commands } from '@/hooks/useCommand'

import Help from './help'
import CheckIn from './checkIn'
import Me from './me'

commands.set('/help', Help)
commands.set('/check-in', CheckIn)
commands.set('/me', Me)
