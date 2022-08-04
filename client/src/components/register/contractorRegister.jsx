import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//UTILS
import { register } from '../../service/projectService';
import auth from '../../utils/auth';
//MUI IMPORTS
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const specialties = [
	'Drywall/Framing',
	'Mechanical',
	'Electrical',
	'Plumbing',
	'Interiors',
	'Flooring',
	'Roofing',
	'Painting',
	'Carpentry',
	'Doors/Windows',
	'Concrete',
	'Demolition',
	'Exteriors',
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

function ContractorRegister(props) {
	//FOR MUI
	const theme = useTheme();
	const [specialtyName, setSpecialtyName] = React.useState([]);

	const handleChangeMUI = (event) => {
		const {
			target: { value },
		} = event;
		setSpecialtyName(typeof value === 'string' ? value.split(',') : value);
	};
	//END FOR MUI
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('userType', 'contractor');
		const res = await register(formData);
		if (res.error) {
			alert(`${res.message}`);
		} else {
			props.setIsAuthenticated(true);
			auth.login(() => {
				navigate('../contractor/profile');
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
					gap: '4vh',
				}}
			>
				<Typography
					variant="h4"
					style={{ textAlign: 'center', color: 'white' }}
				>
					Builder Sign Up
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
						label="Email"
						name="email"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						label="First Name"
						name="firstName"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						label="Last Name"
						name="lastName"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<TextField
						fullWidth
						label="Location"
						name="location"
						value="San Diego"
						style={{ backgroundColor: 'white', borderRadius: 7, width: '70vw' }}
					/>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel id="demo-multiple-chip-label">Specialties</InputLabel>
						<Select
							style={{
								backgroundColor: 'white',
								borderRadius: 7,
								width: '67vw',
							}}
							multiple
							value={specialtyName}
							onChange={handleChangeMUI}
							name="specialties"
							input={
								<OutlinedInput id="select-multiple-chip" label="Specialties" />
							}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{specialties.map((specialty) => (
								<MenuItem
									key={specialty}
									value={specialty}
									style={getStyles(specialty, specialtyName, theme)}
								>
									{specialty}
								</MenuItem>
							))}
						</Select>
					</FormControl>

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
						variant="contained"
						color="secondary"
						style={{
							padding: '2vw 19vw 2vw 19vw',
							color: 'white',
							backgroundColor: 'black',
							borderRadius: 200,
							margin: '3vh 0 0 0',
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
					bottom: '2vh',
					left: '10vw',
				}}
				component={Link}
				to={-1}
			>
				<ChevronLeftIcon />
			</Fab>
		</>
	);
}

export default ContractorRegister;
