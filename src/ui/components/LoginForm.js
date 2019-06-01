import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "@material-ui/core/Link";
import {Link as NavLink} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 800,
        marginBottom: 5,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    centered: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

const LoginForm = ({isLogin = true}) => {
    const classes = useStyles();

    return (
        <div>
            <Typography component="h1" variant="h5" className={classes.title}>
                {isLogin ? "Prijava" : "Registracija"}
            </Typography>
            <Typography>
                {isLogin ? "Unesite Vašu email adresu i šifru" : "Unesite željenu adresu i šifru"}
            </Typography>
            <form className={classes.form} noValidate autoComplete="false">
                <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    label="Email adresa"
                    margin="normal"
                    autoComplete="false"
                    required
                    fullWidth
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    variant="outlined"
                    label="Šifra"
                    margin="normal"
                    autoComplete="false"
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    {isLogin ? "Prijavite se" : "Registrujte se"}
                </Button>
                <Box className={classes.centered}>
                    <Link to={isLogin ? "/register" : "/login"} component={NavLink} variant="body2">
                        {isLogin ? "Nemate nalog? Registrujte se." : "Imate nalog? Ulogujte se."}
                    </Link>
                </Box>
            </form>
        </div>
    );
};

export default LoginForm;
