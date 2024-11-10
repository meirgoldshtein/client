import { ICandidate } from "./candidate"
import { dataStatus } from "./redux"

interface candidateState {
    error: string | null
    status: dataStatus
    candidates: ICandidate[] | null
}

export default candidateState