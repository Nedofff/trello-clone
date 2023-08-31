

interface ITask {
    id:string
    title: string
    isDone: boolean
}

interface IList {
    title:string
    id: string
    tasks: ITask[]
}

interface IBoard {
    title: string
    id: string
    lists: IList[]
}