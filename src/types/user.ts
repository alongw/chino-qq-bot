import type { UserTable } from '@/types/db'

import type { GroupAtMessageCreate } from 'amesu'

export interface Event extends GroupAtMessageCreate {
    user: UserTable
}
