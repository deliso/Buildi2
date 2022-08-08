import { Link, Outlet } from 'react-router-dom';
import { awardBidder } from '../../../../../../service/projectService';
// const awardBidder = require '../../../../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Review, UserT } from '../../../../../../../../types/userTypes';
import {
	BidT,
	RFI,
	ProjectT,
} from '../../../../../../../../types/projectTypes';
import { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react';
//ICONS
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
type Props = {
	bid: BidT;
	user: UserT;
	projectId: ProjectT;
};
// const Bid: FunctionComponent = ({ bid, user, projectId }) => {
const Bid = (props: Props) => {
	//FOR MUI TEST
	const [secondary, setSecondary] = React.useState(false);
	//END
	//FOR MUI FORM DIALOG
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	//END
	const submitHandler = async () => {
		await awardBidder(props.projectId, props.bid.creatorId);
		alert('bidder awarded!');
	};
	return (
		<>
			{props.user.userType == 'client' ? (
				<>
					<Box>
						<ListItem
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="award"
									onClick={handleClickOpen}
								>
									<EmojiEventsIcon style={{ color: 'purple' }} />
								</IconButton>
							}
						>
							<ListItemAvatar>
								<Avatar
									alt={props.bid.creatorName}
									src={`http://localhost:3000/${props.bid.creatorPic}`}
								></Avatar>
							</ListItemAvatar>
							<ListItem
								button
								component={Link}
								to={`../contractor/profile/${props.bid.creatorId}`}
							>
								<ListItemText primary={props.bid.creatorName} />
							</ListItem>
							<ListItemText
								primary={`$${props.bid.bidPrice}`}
								secondary={secondary ? 'Not loaded' : null}
								style={{ padding: '0 5vw 0 0' }}
							/>
						</ListItem>
					</Box>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Award Bid</DialogTitle>
						<DialogContent>
							<form onSubmit={submitHandler} id="awardBid">
								<DialogContentText>
									Do you want to award this project to {props.bid.creatorName}?
								</DialogContentText>
							</form>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={handleClose} type="submit" form="awardBid">
								Award
							</Button>
						</DialogActions>
					</Dialog>
				</>
			) : (
				''
			)}

			<Outlet />
		</>
	);
};

export default Bid;
