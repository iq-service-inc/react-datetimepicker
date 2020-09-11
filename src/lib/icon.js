import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import {
    faPen,
    faArrowUp,
    faArrowDown,
    //...
} from '@fortawesome/free-solid-svg-icons'

import {
    faEye as farEye,
    faCalendar as farCalendar
    // ...
} from '@fortawesome/free-regular-svg-icons'

export default () => library.add(
    fab,
    farEye,
    faPen,
    farCalendar,
    faArrowUp,
    faArrowDown,
)