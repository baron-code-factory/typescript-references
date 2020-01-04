// "rootDir": "./src" にしているため import 不可
// import {x} from "../x"
// export const shared2 = x

import {cc} from "src/some/cc"

export const sharedC = 'sharedC'
export const sharedCC = `~${cc}~`
