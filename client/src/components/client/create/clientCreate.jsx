import { createProject } from '../../../service/projectService';
import { useNavigate } from 'react-router-dom';
//UTILS
import { getProjects } from '../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//FOR MUI

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

const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
const headerStyle = { margin: 10 };
//END FOR MUI
function ClientCreate({ user, setProjects }) {
	React.useEffect(() => {
		handleClickOpen();
	}, []);
	//FOR MUI FORM DIALOG
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = (e) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	//END
	//TESTING FORM DIALOG
	let navigate = useNavigate();

	//FOR MUI
	const theme = useTheme();
	const [specialtyName, setSpecialtyName] = React.useState([]);

	const handleChangeMUI = (event) => {
		const {
			target: { value },
		} = event;
		setSpecialtyName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};
	//END FOR MUI
	const submitHandler = async (event) => {
		event.preventDefault();
		console.log('here');

		const formData = new FormData(event.target);
		formData.append('_id', user._id);
		await createProject(formData, user._id);
		//REFRESH STATE OF PROJECTS NAV
		await getProjects().then((projects) => {
			const filteredProjects = projects.filter(
				(pr) => pr.lifeCycle !== 'closed'
			);
			setProjects(filteredProjects);
		});
		//NAVIGATE TO LIST
		navigate('../projects');
	};
	return (
		<>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					padding: '5vh 0 0 0',
					alignItems: 'center',
					backgroundColor: 'primary.main',
				}}
			>
				<Typography variant="h3" style={{ color: 'white', fontWeight: 410 }}>
					Buildi
				</Typography>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Project</DialogTitle>
				<DialogContent>
					<form
						onSubmit={submitHandler}
						id="createForm"
						encType="multipart/form-data"
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1vh',
							alignItems: 'center',
						}}
					>
						<Typography variant="body1">
							Add an image of the work to be done
						</Typography>
						<Button variant="contained" component="label">
							Project Image
							<input type="file" name="projectImage" id="projectImage" hidden />
						</Button>
						<Typography variant="body1">
							Add a name and detailed description to your project
						</Typography>
						<TextField
							fullWidth
							label="Title"
							data-testid="project-title"
							name="name"
						/>
						<TextField
							fullWidth
							multiline
							maxRows={6}
							label="Enter a detailed description of your project"
							name="description"
						/>
						<TextField fullWidth name="location" value="San Diego" />
						<Typography variant="body1">
							List any specific skills needed for your project
						</Typography>
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-chip-label">
								Specialties Needed
							</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={specialtyName}
								onChange={handleChangeMUI}
								name="specialties"
								input={
									<OutlinedInput
										id="select-multiple-chip"
										label="Specialties"
									/>
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
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							navigate(-1);
						}}
					>
						Cancel
					</Button>
					<Button onClick={handleClose} type="submit" form="createForm">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default ClientCreate;
