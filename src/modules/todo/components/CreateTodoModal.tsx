"use client"

import { useState, Fragment, FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PlusIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { usePrevious } from '@uidotdev/usehooks';
import { createTodo } from '@/redux/features/todoSlice';

const FloatingArea = styled('div')({
  position: 'absolute',
  bottom: '3em',
  right: '2em',
});

export default function CreateTodoModal() {
	const isLoading = useAppSelector((state) => state.todoReducer.isCreating);
  const isFetch = useAppSelector((state) => state.todoReducer.isFetch);
	const isFetchPrev = usePrevious(isFetch);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
		if(isFetchPrev && !isFetch) {
			setOpen(false);
		}
	}, [isFetch, isFetchPrev])

  return (
    <Fragment>
      <FloatingArea>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </FloatingArea>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
						dispatch(createTodo(formJson))
          },
        }}
      >
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton 
            type="submit"
            loading={isLoading}
            loadingPosition="start"
						variant="contained"
            color='primary'
						startIcon={<PlusIcon />}
						disabled={isLoading}
        	>
						Create
					</LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}