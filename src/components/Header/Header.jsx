import React from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(5),
    },
    accentTitle: {
        display: 'block',
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontWeight: '500',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}))

export default function Header() {
    const classes = useStyles()

    return (
        <header className={classes.header}>
            <Typography variant="h2" align="center">
                Трёхмерные решения для сайтов{' '}
                <a
                    href="https://www.blend4web.com"
                    className={classes.accentTitle}
                >
                    blend4web 🧊
                </a>{' '}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                Тестовое задание
            </Typography>
        </header>
    )
}
