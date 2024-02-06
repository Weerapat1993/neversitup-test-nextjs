import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteTodoById } from "@/redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LoadingButton } from '@mui/lab';
import { usePrevious } from '@uidotdev/usehooks';

type Props = {
	data: Todo
}

type Todo = {
	_id: string
	title: string
	description: string
	createdAt: string
	updatedAt: string
}

export default function DeleteTodoModal(props: Props) {
	const { data } = props
	const isDeleting = useAppSelector((state) => state.todoReducer.isDeleting);
	const isFetch = useAppSelector((state) => state.todoReducer.isFetch);
	const isFetchPrev = usePrevious(isFetch);
	const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const handleDeleteItem = () => {
		dispatch(deleteTodoById({ id: data._id }))
	}

	useEffect(() => {
		if(isFetchPrev && !isFetch) {
			setOpen(false);
		}
	}, [isFetch, isFetchPrev])

  return (
    <React.Fragment>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete Todo
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure delete this todo ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
					<LoadingButton 
            loading={isDeleting}
            loadingPosition="start"
						variant="contained"
						color='error'
						startIcon={<DeleteIcon />}
						onClick={handleDeleteItem}
						disabled={isDeleting}
        	>
						Delete
					</LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}