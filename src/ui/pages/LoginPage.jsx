import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

import logo from "../logo.png";
import Authentication from "../../core/containers/authentication";
import {Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        width: 200,
    },
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
    spinner: {
        color: "#ffffff",
    }
}));

const LoginPage = () => {
    const classes = useStyles();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const authentication = Authentication.useContainer();

    if (authentication.user !== null) {
        return <Redirect to="/"/>;
    }

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <img src={logo} alt="Logo" className={classes.logo}/>
            </div>
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


                    disabled={authentication.loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                    disabled={authentication.loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!!authentication.errorMessage &&
                <Typography color='error'>
                    {authentication.errorMessage}
                </Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                        if (isLogin) {
                            authentication.signIn(email, password);
                            return;
                        }

                        authentication.signUp(email, password);
                    }}>
                    {authentication.loading && <CircularProgress size={20} className={classes.spinner}/>}
                    {!authentication.loading && (isLogin ? "Prijavite se" : "Registrujte se")}
                </Button>
                <Box className={classes.centered}>
                    <Link to={isLogin ? "/register" : "/login"} variant="body2" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Nemate nalog? Registrujte se." : "Imate nalog? Ulogujte se."}
                    </Link>
                </Box>
            </form>
        </Container>
    );
};

export default LoginPage;
