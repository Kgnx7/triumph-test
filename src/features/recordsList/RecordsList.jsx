import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { lighten, fade, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import Container from '@material-ui/core/Container'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CreateIcon from '@material-ui/icons/Create'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import debounce from 'lodash/debounce'

import EditRecordDialog from './EditRecordDialog'
import CreateRecordDialog from './CreateRecordDialog'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function sortAndFilter(array, filter, comparator) {
    array = array.filter((el) =>
        new RegExp(
            `${filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
            'im'
        ).test(Object.values(el))
    )
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    { id: 'name', label: 'Имя' },
    { id: 'type', label: 'Тип' },
    { id: 'color', label: 'Цвет' },
]

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        display: 'flex',
        // flexWrap: 'wrap',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const EnhancedTableToolbar = ({ onFilterChange, onCreate }) => {
    const classes = useToolbarStyles()
    const [filterInputValue, setFilterInputValue] = useState('')
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('xs'))

    const onFilterChangeDebounced = useRef(debounce(onFilterChange, 500))
        .current

    useEffect(() => {
        return () => {
            onFilterChangeDebounced.clear()
        }
    }, [])

    const handleFilterInputChange = (event) => {
        const value = event.target.value
        setFilterInputValue(value)
        onFilterChangeDebounced(value)
    }

    return (
        <Toolbar
            className={clsx(classes.root)}
            style={{ flexWrap: matches ? 'wrap' : 'nowrap' }}
        >
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Таблица с данными 😉
            </Typography>

            <Tooltip title="Поиск">
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        value={filterInputValue}
                        onChange={handleFilterInputChange}
                        placeholder="Поиск…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'поиск' }}
                    />
                </div>
            </Tooltip>

            <Tooltip title="Добавить">
                <IconButton aria-label="Добавить элемент" onClick={onCreate}>
                    <CreateIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingBottom: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
    table: {
        // minWidth: 500,
    },
}))

export default function EnhancedTable() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [order, setOrder] = useState('asc')
    const [filter, setFilter] = useState('')
    const [orderBy, setOrderBy] = useState('id')
    const [page, setPage] = useState(0)
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [createRecordDialog, setCreateRecordDialog] = useState(false)

    const rowsPerPage = 10

    const rows = useSelector((state) => state.recordsList.records)

    const toggleCreateRecordDialog = () => {
        setCreateRecordDialog(!createRecordDialog)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleRowClick = (record) => {
        setSelectedRecord(record)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleFilterChange = (filter) => {
        setFilter(filter)
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
        <Container className={classes.root}>
            <Paper
                component="section"
                className={classes.paper}
                data-testid="table"
            >
                <EnhancedTableToolbar
                    onFilterChange={handleFilterChange}
                    onCreate={toggleCreateRecordDialog}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {sortAndFilter(
                                rows,
                                filter,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            data-testid="tableRow"
                                            hover
                                            onClick={(event) =>
                                                handleRowClick(row)
                                            }
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.type}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ color: row.color }}
                                            >
                                                {row.color}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                />
            </Paper>
            <CreateRecordDialog
                open={createRecordDialog}
                onClose={toggleCreateRecordDialog}
            />
            {selectedRecord && (
                <EditRecordDialog
                    record={selectedRecord}
                    open={selectedRecord !== null}
                    onClose={() => {
                        setSelectedRecord(null)
                    }}
                />
            )}
        </Container>
    )
}
