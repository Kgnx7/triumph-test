export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')

        return serializedState === null
            ? undefiend
            : JSON.parse(serializedState)
    } catch (err) {
        return undefiend
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) {
        console.error('Не получилось сохранить данные')
    }
}
