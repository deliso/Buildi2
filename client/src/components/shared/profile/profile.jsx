import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOtherProfile } from '../../../service/projectService';
import * as React from 'react';

//MUI IMPORTS
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

function Profile({ user }) {
	let { otherProfileId } = useParams();
	const [otherProfile, setOtherProfile] = useState('someone else');
	const [otherProfileAvgRating, setOtherProfileAvgRating] = useState(0);
	const [otherProfileNumRatings, setOtherProfileNumRatings] = useState(0);

	// const [rating, setRating] = useState(0);
	// const [numRatings, setNumRatings] = useState(0);

	useEffect(() => {
		const getAnotherUsersProfile = async () => {
			const profile = await getOtherProfile(otherProfileId);
			setOtherProfile(profile);
		};
		if (user == 'viewingOtherProfile') {
			getAnotherUsersProfile();
		}
		return;
	}, []);

	//FOR REVIEWS
	// let avgRating;
	// let numRatings;
	// if (user.reviews) {
	//   const ratingsArray = [];
	//   user.reviews.forEach((review) => {
	//     ratingsArray.push(review.rating);
	//   });
	//   avgRating = ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length;
	//   console.log(avgRating);
	//   numRatings = ratingsArray.length;
	// }
	//END
	return (
		<>
			<AppBar>
				<Toolbar>
					{user !== 'viewingOtherProfile' ? (
						<>
							<Typography
								variant="h6"
								component="div"
								onClick={() => window.location.reload(false)}
							>
								Your Profile
							</Typography>
						</>
					) : (
						<>
							{' '}
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="open drawer"
								sx={{ mr: 2 }}
								component={Link}
								to={-1}
							>
								<ArrowBackIcon />
							</IconButton>
							<Typography variant="h6" component="div">
								Project
							</Typography>
						</>
					)}

					{user !== 'viewingOtherProfile' ? (
						<>
							<Typography
								variant="h6"
								component={Link}
								to="../logout"
								style={{
									color: 'white',
									padding: '0 0 0 45vw',
									textDecoration: 'none',
									fontSize: '1em',
								}}
							>
								Logout
							</Typography>
						</>
					) : (
						<></>
					)}
				</Toolbar>
			</AppBar>
			{user != 'viewingOtherProfile' ? (
				<>
					<Box
						sx={{
							width: '100vw',
							height: '80vh',
							margin: '15vh 0 0 0',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Avatar
							alt={user.firstName}
							src={`http://localhost:3000/${user.profilePic}`}
							sx={{ width: '25vw', height: '25vw' }}
						/>
						<Rating name="read-only" value={4} precision={0.5} readOnly />
						{/* <Typography variant="caption">{`Ratings: ${
              numRatings ? numRatings : 0
            }`}</Typography> */}

						<Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>

						{user.userType == 'contractor' ? (
							<>
								<Typography
									variant="h6"
									style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
								>
									Specialties
								</Typography>
								<Stack
									direction="row"
									spacing={1}
									sx={{ flexWrap: 'wrap', width: '80vw' }}
								>
									{user._id
										? user.specialties.map((specialty) => {
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
										  })
										: 'none'}
								</Stack>
								<Divider
									style={{ width: '85vw', margin: '2vw 0 0 0' }}
								></Divider>
							</>
						) : (
							<></>
						)}
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Contact Info
						</Typography>
						<Typography
							variant="caption"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							{user.email}
						</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Location
						</Typography>
						<Typography
							variant="caption"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							{user.location}
						</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Reviews
						</Typography>

						<Box
							sx={{
								width: '75vw',
							}}
						>
							{user.reviews ? (
								<>
									{user.reviews.map((review) => {
										return (
											<>
												<ListItem alignItems="flex-start">
													<ListItemAvatar>
														<Avatar
															alt={review.creatorFirstName}
															src={`http://localhost:3000/${review.creatorPic}`}
														/>
													</ListItemAvatar>
													<ListItemText
														primary={
															<Rating
																value={review.rating}
																size="small"
																readOnly
															/>
														}
														secondary={
															<React.Fragment>
																<Typography
																	sx={{ display: 'inline' }}
																	component="span"
																	variant="body2"
																	color="text.primary"
																>
																	{review.review}
																</Typography>
															</React.Fragment>
														}
													/>
												</ListItem>
											</>
										);
									})}
								</>
							) : (
								<>
									<Typography
										variant="caption"
										style={{
											alignSelf: 'flex-start',
											margin: '0 0 0 3vw',
										}}
									>
										No reviews yet
									</Typography>
								</>
							)}
						</Box>
					</Box>
				</>
			) : (
				<>
					<Box
						sx={{
							width: '100vw',
							height: '80vh',
							margin: '15vh 0 0 0',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Avatar
							alt={otherProfile.firstName}
							src={`http://localhost:3000/${otherProfile.profilePic}`}
							sx={{ width: '25vw', height: '25vw' }}
						/>
						<Rating name="read-only" value={4} precision={0.5} readOnly />

						<Typography variant="h5">{`${otherProfile.firstName} ${otherProfile.lastName}`}</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>

						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Specialties
						</Typography>
						<Stack
							direction="row"
							spacing={1}
							sx={{ flexWrap: 'wrap', width: '80vw' }}
						>
							{otherProfile._id
								? otherProfile.specialties.map((specialty) => {
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
								  })
								: 'none'}
						</Stack>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Contact Info
						</Typography>
						<Typography
							variant="caption"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							{otherProfile.email}
						</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Location
						</Typography>
						<Typography
							variant="caption"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							{otherProfile.location}
						</Typography>
						<Divider style={{ width: '85vw', margin: '2vw 0 0 0' }}></Divider>
						<Typography
							variant="h6"
							style={{ alignSelf: 'flex-start', margin: '0 0 0 15vw' }}
						>
							Reviews
						</Typography>
						<Box
							sx={{
								width: '75vw',
							}}
						>
							{otherProfile.reviews ? (
								<>
									{otherProfile.reviews.map((review) => {
										return (
											<>
												<ListItem alignItems="flex-start">
													<ListItemAvatar>
														<Avatar
															alt={review.creatorFirstName}
															src={`http://localhost:3000/${review.creatorPic}`}
														/>
													</ListItemAvatar>
													<ListItemText
														primary={
															<Rating
																value={review.rating}
																size="small"
																readOnly
															/>
														}
														secondary={
															<React.Fragment>
																<Typography
																	sx={{ display: 'inline' }}
																	component="span"
																	variant="body2"
																	color="text.primary"
																>
																	{review.review}
																</Typography>
															</React.Fragment>
														}
													/>
												</ListItem>
											</>
										);
									})}
								</>
							) : (
								<>
									<Typography
										variant="caption"
										style={{
											alignSelf: 'flex-start',
											margin: '0 0 0 3vw',
										}}
									>
										No reviews yet
									</Typography>
								</>
							)}
						</Box>
					</Box>
				</>
			)}
		</>
	);
}

export default Profile;
