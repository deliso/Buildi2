import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import auth from '../utils/auth';
import { loginUser } from '../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
type Props = {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
const Login = (props: Props) => {
	const { setIsAuthenticated } = props;
	let navigate = useNavigate();

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const res = await loginUser(formData);
		if (res.error) {
			alert(`${res.message}`);
		} else {
			setIsAuthenticated(true);
			if (res.userType == 'client') {
				auth.login(() => navigate('/client/profile'));
			} else if (res.userType == 'contractor') {
				auth.login(() => navigate('/contractor/profile'));
			} else {
				alert('user type does  not exist');
			}
		}
	};

	return (
		<>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					backgroundColor: 'primary.main',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						width: '60vw',
						backgroundColor: 'primary.main',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '5vh',
						alignItems: 'center',
					}}
				>
					<Typography
						data-testid="buildi"
						variant="h3"
						style={{ color: 'white', fontWeight: 410 }}
					>
						Buildi
					</Typography>
					<Typography
						variant="body1"
						style={{ color: 'white', textAlign: 'center' }}
					>
						Find the right contractor for your home renovation
					</Typography>
				</Box>
				<Box
					sx={{
						width: '80vw',
						backgroundColor: 'primary.main',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '1vh',
						alignItems: 'center',
					}}
				>
					<form
						action="/login"
						className="login"
						onSubmit={handleSubmit}
						encType="multipart/form-data"
						style={{
							height: '25vh',
							width: '70vw',
							display: 'flex',
							flexDirection: 'column',
							gap: '6vw',
						}}
					>
						<TextField
							fullWidth
							label="Email"
							name="email"
							style={{ backgroundColor: 'white', borderRadius: 7 }}
						/>
						<TextField
							fullWidth
							label="Password"
							name="password"
							type="password"
							style={{ backgroundColor: 'white', borderRadius: 7 }}
						/>

						<Button
							type="submit"
							variant="contained"
							color="secondary"
							style={{
								margin: '2vh 0 0 0',
								padding: '1vw 22vw 1vw 22vw',
								color: 'white',
								borderRadius: 200,
							}}
						>
							Login
						</Button>
					</form>
					<Typography
						variant="body1"
						style={{ color: 'white', textAlign: 'center' }}
					>
						or
					</Typography>
					<Button
						data-testid="register-button"
						variant="contained"
						style={{
							padding: '1vw 27vw 1vw 27vw',
							backgroundColor: 'black',
							color: 'white',
							borderRadius: 200,
						}}
						component={Link}
						to="/register"
					>
						Register
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Login;
