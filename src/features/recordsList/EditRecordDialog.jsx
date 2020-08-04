import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import { editRecord, removeRecord } from './recordsListSlice'
import { useDispatch } from 'react-redux'
import { ChromePicker } from 'react-color'

const useStyles = makeStyles((theme) => ({
    deleteButton: { color: red[500] },
    chromePicker: {
        margin: '15px auto',
    },
}))

export default function EditRecordDialog({ record, open, onClose }) {
    const [name, setName] = useState(record.name)
    const [type, setType] = useState(record.type)
    const [color, setColor] = useState(record.color)

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleChangeName = (event) => setName(event.target.value)
    const handleChangeType = (event) => setType(event.target.value)

    const handleClose = () => {
        onClose()
    }

    const handleSubmit = (event) => {
        dispatch(
            editRecord({
                id: record.id,
                name,
                type,
                color,
            })
        )
        handleClose()
    }

    const handleDelete = () => {
        dispatch(removeRecord(record.id))
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
                Редактирование записи 👨‍💻
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
                <Button onClick={handleDelete} className={classes.deleteButton}>
                    Удалить
                </Button>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={!(name && type && color)}
                >
                    Обновить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
