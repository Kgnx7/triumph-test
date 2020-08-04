import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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
    dispatch(
        create({
            ...newRecord,
            id: uuidv4(),
        })
    )
}

export const editRecord = (editedRecord) => (dispatch) => {
    dispatch(edit(editedRecord))
}

export default recordsListSlice.reducer
