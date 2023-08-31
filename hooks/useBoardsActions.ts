import {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import { boardsSlice } from '@/store/boards.slice'

const useBoardsActions = () => {
    const dispatch = useDispatch()


    return useMemo(() => bindActionCreators(boardsSlice.actions, dispatch), [dispatch])
}

export default useBoardsActions