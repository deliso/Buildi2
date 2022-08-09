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
import { UserT } from '../../../../../../../types/userTypes';
import { BidT, ProjectT } from '../../../../../../../types/projectTypes';
import { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react';
//ICONS
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
type Props = {
	// bid: BidT;
	user: UserT;
	projectId: ProjectT;
	project: ProjectT;
};
function BidList(props: Props) {
	//FOR FROCED REFRESHES(CHEATING)
	function refreshPage() {
		// window.location.reload(false);
		window.location.reload();
	}
	//FOR MUI FORM DIALOG
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		console.log('submit');
	};

	const handleClose = () => {
		setOpen(false);
	};
	//END
	async function submitHandlerNewBid(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		const target = e.target.bidInput as HTMLFormElement;
		// await
		await createBid(
			props.projectId,
			target.value,
			props.user._id,
			props.user.firstName,
			props.user.profilePic
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
	console.log(props.user);
	async function submitHandlerEditBid(
		event: React.ChangeEvent<HTMLFormElement>
	) {
		event.preventDefault();
		const target = event.target.bidInput as HTMLFormElement;

		// await editBid(props.projectId, event.target.bidInput.value, props.user.id);
		await editBid(props.projectId, target.value, props.user._id);
		refreshPage();
	}

	return (
		<>
			<div className="BidList">
				{props.project ? (
					<>
						{/* IF YOU ARE A CLIENT DISPLAY EITHER ENTIRE BID LIST OR ONLY THE AWARDED BID */}
						{props.user.userType == 'client' ? (
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
										{props.project.bids
											.filter((bid) => bid.creatorId == props.user._id)
											.map((bid) => {
												{
													console.log(props.project);
												}
												console.log('Props.project true');
												console.log(bid);
												return <>${bid.bidPrice}</>;
											})}
									</Typography>

									{props.project.lifeCycle == 'open' ? (
										<Box>
											{props.project.bids.map((bid) => {
												return (
													<>
														<Bid
															bid={bid}
															user={props.user}
															projectId={props.projectId}
														/>
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
											{props.project.bids.filter(
												(bid) => bid.creatorId == props.user._id
											).length
												? 'Edit Bid'
												: 'Bid'}
										</Fab>
									</Box>
									<Typography variant="h4" style={{ alignSelf: 'center' }}>
										{props.project.bids
											.filter((bid) => bid.creatorId == props.user._id)
											.map((bid) => {
												console.log(bid);
												console.log('Props.project false');
												return <>${bid.bidPrice}</>;
											})}
									</Typography>
								</Box>

								<Dialog open={open} onClose={handleClose}>
									<DialogTitle>
										{props.project.bids.filter(
											(bid) => bid.creatorId == props.user._id
										).length
											? 'Edit Bid'
											: 'Place Bid'}
									</DialogTitle>
									<DialogContent>
										<form
											onSubmit={
												props.project.bids.filter(
													(bid) => bid.creatorId == props.user._id
												).length
													? submitHandlerEditBid
													: submitHandlerNewBid
											}
											id="bidForm"
										>
											<DialogContentText>
												{props.project.bids.filter(
													(bid) => bid.creatorId == props.user._id
												).length
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
								{props.project.bids.filter(
									(bid) => bid.creatorId == props.user._id
								).length ? (
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
