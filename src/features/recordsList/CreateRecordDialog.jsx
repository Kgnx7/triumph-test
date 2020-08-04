import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { v4 as uuidv4 } from 'uuid'
import { createRecord } from './recordsListSlice'
import { useDispatch } from 'react-redux'
import { ChromePicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    chromePicker: {
        margin: '15px auto',
    },
}))

export default function CreateItemDialog({ open, onClose }) {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const dispatch = useDispatch()
    const handleChangeName = (event) => setName(event.target.value)
    const handleChangeType = (event) => setType(event.target.value)
    const classes = useStyles()

    const resetState = () => {
        setName('')
        setType('')
        setColor('')
    }

    const handleClose = () => {
        onClose()
        resetState()
    }

    const handleSubmit = (event) => {
        dispatch(
            createRecord({
                id: uuidv4(),
                name,
                type,
                color,
            })
        )
        handleClose()
    }

    const handleChangeColorComplete = (color, event) => {
        setColor(color.hex)
    }

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Добавление данных 👨‍💻
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={handleChangeName}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Имя"
                    type="text"
                    fullWidth
                    required
                />
                <TextField
                    value={type}
                    onChange={handleChangeType}
                    autoFocus
                    margin="dense"
                    id="type"
                    label="Тип"
                    type="text"
                    fullWidth
                    required
                />
                <ChromePicker
                    className={classes.chromePicker}
                    color={color}
                    onChangeComplete={handleChangeColorComplete}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={!(name && type && color)}
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
