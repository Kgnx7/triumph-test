import { createSlice } from '@reduxjs/toolkit'

export const recordsListSlice = createSlice({
    name: 'recordsList',
    initialState: {
        records: [],
    },
    reducers: {
        create: (state, { payload }) => {
            state.records = [...state.records, payload]
        },
        remove: (state, { payload }) => {
            state.records = state.records.filter(
                (record) => record.id !== payload
            )
        },
        edit: (state, { payload }) => {
            state.records = state.records.map((record) =>
                record.id === payload.id ? payload : record
            )
        },
    },
})

export const { create, remove, edit } = recordsListSlice.actions

export const createRecord = (newRecord) => (dispatch) => {
    dispatch(create(newRecord))
}

export const editRecord = (editedRecord) => (dispatch) => {
    dispatch(edit(editedRecord))
}

export const removeRecord = (recordId) => (dispatch) => {
    dispatch(remove(recordId))
}

export default recordsListSlice.reducer
