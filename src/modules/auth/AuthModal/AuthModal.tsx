"use client"

import { useState, Fragment, FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authLogin } from '@/redux/features/authSlice';
import { usePrevious } from '@uidotdev/usehooks';
import styled from '@emotion/styled';

const VerticalCenter = styled('div')({
  margin: "0",
  position: "absolute",
  top: "50%",
  width: '100%',
  textAlign: 'center',
  transform: "translateY(-50%)",
});

export default function AuthModal() {
	const isLoading = useAppSelector((state) => state.authReducer.loading);
	const isLoggedIn = useAppSelector((state) => Boolean(state.authReducer?.data?.token));
	const isLoggedInPrev = usePrevious(isLoggedIn);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	useEffect(() => {
		if(!isLoggedInPrev && isLoggedIn) {
			handleClose()
		}
	}, [isLoggedIn, isLoggedInPrev]) 

  return (
    <Fragment>
			{!isLoggedIn ? (
        <VerticalCenter>
          <Button color="primary" variant="contained" onClick={handleClickOpen}>
            Login
          </Button>
        </VerticalCenter>
			) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
						dispatch(authLogin(formJson))
          },
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
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
						startIcon={<SendIcon />}
						disabled={isLoading}
        	>
						Login
					</LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}