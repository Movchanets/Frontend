import * as Yup from "yup";
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;
export const ProfileSchema = Yup.object().shape({
	UserName: Yup.string().required("Required").label('UserName'),
	Name: Yup.string().required("Required").label('Name'),
	Surname: Yup.string().required("Required").label('Surname'),
	Phone: Yup.string().required("Required").label('Phone').min(4).max(12).matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, "Please use valid phone number"),
});
export const PasswordSchema = Yup.object().shape({
	OldPassword: Yup.string().required("Required").label("OldPassword").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9"),
	NewPassword: Yup.string().required("Required").label("NewPassword").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9"),
	ConfirmNewPassword: Yup.string().required("Required").label("ConfirmNewPassword").oneOf([Yup.ref('NewPassword'), null], 'Passwords must match').min(4).max(12)
});