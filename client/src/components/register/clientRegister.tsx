//REACT IMPORTS
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//UTILS
import { register } from '../../service/projectService';
import auth from '../../utils/auth';
//MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

function ClientRegister(props: Props) {
	const navigate = useNavigate();
	const { setIsAuthenticated } = props;

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('userType', 'client');
		formData.append('specialties', '');

		const res = await register(formData);

		if (res.error) {
			alert(`${res.message}`);
		} else {
			setIsAuthenticated(true);
			auth.login(() => {
				navigate('../client/profile');
			});
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
					justifyContent: 'center',
					alignItems: 'center',
					gap: '7vh',
				}}
			>
				<Typography
					data-testid="client-reg-form"
					variant="h4"
					style={{ textAlign: 'center', color: 'white' }}
				>
					Buildi Sign Up
				</Typography>
				<form
					action="/register"
					className="register"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					style={{
						width: '70vw',
						display: 'flex',
						flexDirection: 'column',
						gap: '6vw',
					}}
				>
					<TextField
						data-testid="client-reg-email"
						label="Email"
						name="email"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						data-testid="client-reg-password"
						label="Password"
						name="password"
						type="password"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						data-testid="client-reg-firstname"
						label="First Name"
						name="firstName"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						data-testid="client-reg-lastname"
						label="Last Name"
						name="lastName"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						data-testid="client-reg-location"
						fullWidth
						label="Location"
						name="location"
						value="San Diego"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>

					<Button
						variant="outlined"
						component="label"
						style={{
							backgroundColor: 'white',
							borderRadius: 7,
							height: '6vh',
							width: '70vw',
							color: 'black',
						}}
					>
						Profile Picture
						<input type="file" name="profilePic" hidden />
					</Button>
					<Button
						type="submit"
						data-testid="submit-client-reg"
						variant="contained"
						color="secondary"
						style={{
							padding: '2vw 19vw 2vw 19vw',
							color: 'white',
							borderRadius: 200,
							margin: '4vh 0 0 0',
						}}
					>
						Sign Up
					</Button>
				</form>
			</Box>
			<Fab
				variant="extended"
				size="small"
				style={{
					backgroundColor: 'white',
					position: 'absolute',
					bottom: '5vh',
					left: '10vw',
				}}
				onClick={() => navigate(-1)}
			>
				<ChevronLeftIcon />
			</Fab>
		</>
	);
}

export default ClientRegister;
