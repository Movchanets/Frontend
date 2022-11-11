import React, { useEffect } from "react";

import { Avatar, Box, Button, Container, createTheme, CssBaseline, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useActions } from '../../hooks/useActions';
import { PasswordSchema, ProfileSchema } from './validation';
import { useLocation } from 'react-router-dom';


const Profile: React.FC<any> = () => {
	const location = useLocation();
	const { user } = useTypedSelector((state) => state.UserReducer);

	const initialValues = {
		UserName: "",
		Name: "",
		Surname: "",
		Phone: "",
		Email: "",
	};

	if (location.state != null) {
		let { User } = location.state;
		initialValues.Name = User.name ?? "";
		initialValues.Surname = User.surname ?? "";
		initialValues.Phone = User.phone ?? "";
		initialValues.Email = User.email;
		initialValues.UserName = User.userName ?? "";

	}
	else {

		initialValues.Name = user.Name ?? "";
		initialValues.Surname = user.Surname ?? "";
		initialValues.Phone = user.Phone ?? "";
		initialValues.UserName = user.UserName ?? "";
		initialValues.Email = user.Email ?? "";
	}









	const { ChangeInfo, ChangePassword } = useActions();

	const theme = createTheme();

	const initialPassword = { OldPassword: "", NewPassword: "", ConfirmNewPassword: "" };

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const userVM = {
			UserName: data.get("UserName"),
			Name: data.get("Name"),
			Surname: data.get("Surname"),
			Phone: data.get("Phone"),
			Email: initialValues.Email
		};
		ChangeInfo(userVM, initialValues.Email === user.Email);
	};
	const handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const changePassword = {
			Email: initialValues.Email,
			OldPassword: data.get("OldPassword"),
			NewPassword: data.get("NewPassword")
		}
		ChangePassword(changePassword)
	}
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
						<AccountBoxIcon />
					</Avatar>

					<Typography component="h1" variant="h5">
						Profile
					</Typography>

					<Formik
						initialValues={initialValues}
						onSubmit={() => { }}
						validationSchema={ProfileSchema}
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
									id="UserName"
									label="UserName"
									name="UserName"
									autoComplete="login"

								/>
								{errors.UserName && touched.UserName ? (
									<div style={{ color: "red" }}>{errors.UserName}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="Name"
									label="Name"
									name="Name"
									autoComplete="name"

								/>
								{errors.Name && touched.Name ? (
									<div style={{ color: "red" }}>{errors.Name}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="Surname"
									label="Surname"
									name="Surname"
									autoComplete="surname"

								/>

								{errors.Surname && touched.Surname ? (
									<div style={{ color: "red" }}>{errors.Surname}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="Phone"
									label="Phone"
									name="Phone"
									autoComplete="login"

								/>
								{errors.Phone && touched.Phone ? (
									<div style={{ color: "red" }}>{errors.Phone}</div>
								) : null}


								<Button
									disabled={!(isValid && dirty)}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									{isSubmitting ? "Loading" : "Change"}
								</Button>

							</Box>
						)}
					</Formik>
					<Formik
						initialValues={initialPassword}
						onSubmit={() => { }}
						validationSchema={PasswordSchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<Box
								onSubmit={handleSubmitPassword}
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
									name="OldPassword"
									label="Old Password"

									id="OldPassword"
									autoComplete="current-password"
								/>
								{errors.OldPassword && touched.OldPassword ? (
									<div style={{ color: "red" }}>{errors.OldPassword}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="NewPassword"
									label="New password"
									type="password"
									id="NewPassword"
									autoComplete="current-password"
								/>
								{errors.NewPassword && touched.NewPassword ? (
									<div style={{ color: "red" }}>{errors.NewPassword}</div>
								) : null}
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									type="password"
									name="ConfirmNewPassword"
									label="Confirm password"

									id="ConfirmNewPassword"
									autoComplete="current-password"
								/>
								{errors.ConfirmNewPassword && touched.ConfirmNewPassword ? (
									<div style={{ color: "red" }}>{errors.ConfirmNewPassword}</div>
								) : null}
								<Button
									disabled={!(isValid && dirty)}
									type="submit"
									fullWidth

									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									{isSubmitting ? "Loading" : "Change password"}
								</Button>

							</Box>
						)}
					</Formik>
				</Box>

			</Container>
		</ThemeProvider>
	);
}
export default Profile;