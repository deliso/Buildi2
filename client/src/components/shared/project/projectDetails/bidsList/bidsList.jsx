import Bid from './bid/bid';
import { createBid, editBid } from '../../../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

function BidList({ project, user, projectId }) {
	//FOR FROCED REFRESHES(CHEATING)
	function refreshPage() {
		window.location.reload(false);
	}
	//FOR MUI FORM DIALOG
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = (e) => {
		setOpen(true);
		console.log('submit');
	};

	const handleClose = () => {
		setOpen(false);
	};
	//END
	async function submitHandlerNewBid(event) {
		event.preventDefault();
		console.log(event.target.bidInput.value);
		await createBid(
			projectId,
			event.target.bidInput.value,
			user._id,
			user.firstName,
			user.profilePic
		);
		refreshPage();
		//REFRESH
		// await getProjects().then((projects) => {
		//   const filteredProjects = projects.filter(
		//     (pr) => pr.lifeCycle !== "closed"
		//   );
		//   setProjects(filteredProjects);
		// });
	}
	console.log(user);
	async function submitHandlerEditBid(event) {
		event.preventDefault();
		await editBid(projectId, event.target.bidInput.value, user._id);
		refreshPage();
	}
	return (
		<>
			<div className="BidList">
				{project ? (
					<>
						{/* IF YOU ARE A CLIENT DISPLAY EITHER ENTIRE BID LIST OR ONLY THE AWARDED BID */}
						{user.userType == 'client' ? (
							<>
								{/* IF PROJECT IS OPEN DISPLAY ENTIRE BID LIST */}
								<Box
									sx={{
										width: '76vw',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<Typography variant="h6">Bids</Typography>
									<Typography variant="h4" style={{ alignSelf: 'center' }}>
										{project.bids
											.filter((bid) => bid.creatorId == user._id)
											.map((bid) => {
												return <>${bid.bidPrice}</>;
											})}
									</Typography>

									{project.lifeCycle == 'open' ? (
										<Box>
											{project.bids.map((bid) => {
												return (
													<>
														<Bid bid={bid} user={user} projectId={projectId} />
													</>
												);
											})}
										</Box>
									) : (
										<></>
									)}
								</Box>
							</>
						) : (
							<>
								{/* IF YOU ARE A CONTRACTOR ONLY SHOW YOUR BID AND BUTTONS*/}
								<Box
									sx={{
										width: '76vw',
										height: '10vh',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<Box
										sx={{
											width: '76vw',
											display: 'flex',
											justifyContent: 'space-between',
											gap: '15vw',
										}}
									>
										<Typography variant="h6">Your Bid</Typography>

										<Fab
											color="secondary"
											variant="extended"
											size="small"
											style={{
												position: 'fixed',
												bottom: '8vh',
												left: '25vw',
												minWidth: '70px',
											}}
											onClick={handleClickOpen}
										>
											{project.bids.filter((bid) => bid.creatorId == user._id)
												.length
												? 'Edit Bid'
												: 'Bid'}
										</Fab>
									</Box>
									<Typography variant="h4" style={{ alignSelf: 'center' }}>
										{project.bids
											.filter((bid) => bid.creatorId == user._id)
											.map((bid) => {
												return <>${bid.bidPrice}</>;
											})}
									</Typography>
								</Box>

								<Dialog open={open} onClose={handleClose}>
									<DialogTitle>
										{project.bids.filter((bid) => bid.creatorId == user._id)
											.length
											? 'Edit Bid'
											: 'Place Bid'}
									</DialogTitle>
									<DialogContent>
										<form
											onSubmit={
												project.bids.filter((bid) => bid.creatorId == user._id)
													.length
													? submitHandlerEditBid
													: submitHandlerNewBid
											}
											id="bidForm"
										>
											<DialogContentText>
												{project.bids.filter((bid) => bid.creatorId == user._id)
													.length
													? 'Update your bid below'
													: 'Whats your bid price?'}
											</DialogContentText>
											<TextField
												autoFocus
												margin="dense"
												name="bidInput"
												id="bid"
												label="$..."
												type="bid"
												fullWidth
												variant="standard"
											/>
										</form>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>Cancel</Button>
										<Button onClick={handleClose} type="submit" form="bidForm">
											Submit
										</Button>
									</DialogActions>
								</Dialog>
								{/* If you have already placed a bid on this project */}
								{project.bids.filter((bid) => bid.creatorId == user._id)
									.length ? (
									<>
										{/* <form action="submit" onSubmit={submitHandlerEditBid}>
                      <input
                        type="text"
                        placeholder="whats your new bid?"
                        name="bidInput"
                      />
                      <button>EDIT BID</button>
                    </form> */}
									</>
								) : (
									<>
										{/* PLACING A BID */}
										{/* <form action="submit" onSubmit={submitHandlerNewBid}>
                      <input
                        type="text"
                        placeholder="whats your bid?"
                        name="bidInput"
                      />
                      <button>ADD BID</button>
                    </form> */}
										{/* END */}
									</>
								)}
								{/* END */}
							</>
						)}
					</>
				) : (
					'not rendered'
				)}
			</div>
		</>
	);
}

export default BidList;
