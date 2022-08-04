import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProject } from '../../../../service/projectService';
import RFIList from './rfiList/rfiList';
import BidList from './bidsList/bidsList';
import { useNavigate } from 'react-router-dom';

//UTILS
import { leaveReview } from '../../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Rating from '@mui/material/Rating';
import { deepPurple } from '@mui/material/colors';

import { Link } from 'react-router-dom';

function ProjectDetails({ user }) {
	//FOR FORCED REFRESHES(CHEATING)
	function refreshPage() {
		window.location.reload(false);
	}
	useEffect(() => {
		const getProject = async () => {
			const project = await getOneProject(projectId);
			setProject(project);
		};
		getProject();
	}, []);
	//FOR MUI FORM DIALOG
	const [rating, setRating] = React.useState(4);
	const [open, setOpen] = React.useState(false);
	let navigate = useNavigate();

	const handleClickOpen = (e) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const submitHandlerRating = async (event) => {
		event.preventDefault();
		const bidderId = project.bids.filter((bid) => bid.awarded == true)[0]
			.creatorId;
		await leaveReview(
			event.target.rating.value,
			event.target.review.value,
			user.firstName,
			user.lastName,
			user.profilePic,
			bidderId,
			project._id
		);
		navigate('../profile');
		// refreshPage();
	};
	//END
	let { projectId } = useParams();
	const [project, setProject] = useState(false);

	return project ? (
		<>
			<AppBar>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						component={Link}
						to={'./..'}
					>
						<ArrowBackIcon />
					</IconButton>
					<Typography variant="h6" component="div">
						Projects
					</Typography>
					{project.lifeCycle === 'awarded' && user.userType === 'client' ? (
						// ONLY SHOW THE COMPLETE PROJECT BUTTON ON THE APPBAR IF THE PROJECT IS IN THE "AWARDED" PHASE
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							style={{ margin: '0 0 0 40vw' }}
							onClick={handleClickOpen}
						>
							<TaskAltIcon />
						</IconButton>
					) : (
						<></>
					)}
				</Toolbar>
			</AppBar>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Project Complete</DialogTitle>
				<DialogContent>
					<form onSubmit={submitHandlerRating} id="reviewForm">
						<DialogContentText>Rate Your Builder</DialogContentText>
						<input
							name="rating"
							type="number"
							value={rating}
							// ref={register}
							hidden
							readOnly
						/>
						<Rating
							name="rating"
							value={rating}
							precision={1}
							onChange={(_, value) => {
								setRating(value);
							}}
						/>
						<TextField
							autoFocus
							margin="dense"
							name="reviewInput"
							id="review"
							label="review..."
							type="review"
							fullWidth
							variant="standard"
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose} type="submit" form="reviewForm">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
			;
			<Box
				sx={{
					width: '100vw',
					height: '60vh',
					margin: '24vh 0 0 0',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
					gap: '1vh',
				}}
			>
				{project.lifeCycle === 'awarded' ? (
					<>
						<Paper
							elevation={20}
							style={{
								margin: '10vh 0 0 0',
								width: '75vw',
								height: '75vw',
								position: 'fixed',
								top: 0,
								zIndex: 3,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '4vw',
								}}
							>
								<Typography variant="h4">Awarded Bid</Typography>
								<Avatar
									alt={
										project.bids.filter((bid) => bid.awarded == true)[0]
											.creatorName
									}
									src={`http://192.168.1.144:3000/${
										project.bids.filter((bid) => bid.awarded == true)[0]
											.creatorPic
									}`}
									sx={{ width: '25vw', height: '25vw' }}
								/>
								<Box
									sx={{ display: 'flex', justifyContent: 'center', gap: '4vw' }}
								>
									<Typography variant="h4">
										{
											project.bids.filter((bid) => bid.awarded == true)[0]
												.creatorName
										}
									</Typography>
									<Avatar sx={{ bgcolor: deepPurple[500] }}>
										<EmojiEventsIcon />
									</Avatar>
								</Box>
								<Typography variant="h3">
									{`$${
										project.bids.filter((bid) => bid.awarded == true)[0]
											.bidPrice
									}`}
								</Typography>
							</Box>
						</Paper>
					</>
				) : (
					<></>
				)}
				<Avatar
					variant="rounded"
					alt={project.name}
					src={`http://192.168.1.144:3000/${project.projectImage}`}
					sx={{ width: '75vw', height: '75vw' }}
					style={{ margin: ' auto' }}
				/>
				<Typography variant="h5" style={{ maxWidth: '80vw' }}>
					{project.name}
				</Typography>
				<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
				<Stack
					direction="row"
					spacing={1}
					sx={{ flexWrap: 'wrap', width: '80vw' }}
				>
					{project.specialties.map((specialty) => {
						return (
							<>
								<Chip
									label={specialty}
									color="primary"
									style={{ margin: '1.2vw' }}
									size="small"
								/>
							</>
						);
					})}
				</Stack>
				<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
				<Typography
					variant="h6"
					style={{ alignSelf: 'flex-start', margin: '0 0 0 12vw' }}
				>
					Description
				</Typography>
				<Typography
					variant="caption"
					style={{ alignSelf: 'flex-start', margin: '0 0 0 12vw' }}
				>
					{project.description}
				</Typography>
				<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
				{project.lifeCycle == 'open' ? (
					<>
						<BidList project={project} user={user} projectId={projectId} />
						<Divider
							style={{ width: '85vw', margin: '2vw 0 0 0', height: '1vh' }}
						></Divider>

						<RFIList project={project} user={user} projectId={projectId} />
					</>
				) : (
					<></>
				)}
			</Box>
		</>
	) : (
		<>Not Rendered</>
	);
}

export default ProjectDetails;
