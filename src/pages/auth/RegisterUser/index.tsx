import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Field } from "formik";
import { RegisterSchema } from "../validation";
import Copyright from "../../../components/copyright";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/loader";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Navigate } from 'react-router-dom';


const initialValues = { email: "", password: "", confirmPassword: "", role: "Users" };



const theme = createTheme();

const RegisterUser: React.FC = () => {
	const { GetRoles } = useActions();
	useEffect(() => {
		GetRoles();
	}, []);
	const { roles, loading, message } = useTypedSelector((store) => store.UserReducer);
	const [role, setRole] = React.useState('Users');

	const handleChange = (event: SelectChangeEvent) => {
		setRole(event.target.value as string);
	};

	const { registerUser } = useActions();

	if (loading) {
		return <Loader />;
	}
	if (message === "User successfully created.") {

		return <Navigate to="/dashboard" />;
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const user = {
			email: data.get("email"),
			password: data.get("password"),
			confirmPassword: data.get("confirmPassword"),
			role: role
		};
		registerUser(user);
	};



	return (


		<ThemeProvider theme={theme}>

			<Container component="main" maxWidth="xs">
				<CssBaseline />



				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>

					<Formik
						initialValues={initialValues}
						onSubmit={() => { }}
						validationSchema={RegisterSchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<Box
								onSubmit={handleSubmit}
								style={{ width: "100%", height: "100%" }}
								component="form"
								noValidate
								sx={{ mt: 1 }}
							>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								{errors.email && touched.email ? (
									<div style={{ color: "red" }}>{errors.email}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
								/>
								{errors.confirmPassword && touched.confirmPassword ? (
									<div style={{ color: "red" }}>{errors.confirmPassword}</div>
								) : null}
								<InputLabel >Role</InputLabel>
								<Select fullWidth

									id="Role"
									value={role}


									onChange={handleChange}
								>

									{
										roles?.map((role: string) => (
											<MenuItem key={role + "ID"} id={role + "Id"} value={role}>{role}</MenuItem>))
									}

								</Select>

								<Button
									disabled={!(isValid && dirty)}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									{isSubmitting ? "Loading" : "Sign up"}
								</Button>

							</Box>
						)}
					</Formik>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default RegisterUser;

