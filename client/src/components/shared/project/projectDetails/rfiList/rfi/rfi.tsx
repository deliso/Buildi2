import { editRFI } from '../../../../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { UserT } from '../../../../../../../../types/userTypes';
import { RFIT, ProjectT } from '../../../../../../../../types/projectTypes';
type Props = {
	rfi: RFIT;
	user: UserT;
	projectId: string;
};
function RFI(props: Props) {
	//FOR FORCED REFRESHES(CHEATING)
	function refreshPage() {
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
	const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target.rfiResponseInput as HTMLFormElement;
		await editRFI(props.projectId, props.rfi._id, target.value);
		refreshPage();
	};
	return (
		<>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar
						alt={'B'}
						src={`http://localhost:3000/${props.rfi.creatorPic}`}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={props.rfi.question}
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Response
							</Typography>
							{` - ${props.rfi.response ? props.rfi.response : 'Pending'}`}
						</React.Fragment>
					}
				/>
				{props.user.userType === 'client' ? (
					<IconButton edge="end" aria-label="reply" onClick={handleClickOpen}>
						<ReplyIcon style={{ color: 'green' }} />
					</IconButton>
				) : (
					<></>
				)}
			</ListItem>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>RFI Response</DialogTitle>
				<DialogContent>
					<form onSubmit={submitHandler} id="rfiResponseForm">
						<DialogContentText>Leave answer below</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							name="rfiResponseInput"
							id="rfiResponse"
							label="response..."
							type="rfiResponse"
							fullWidth
							variant="standard"
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose} type="submit" form="rfiResponseForm">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default RFI;
