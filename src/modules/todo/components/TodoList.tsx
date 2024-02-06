"use client"

import React from "react"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTodoList } from "../hooks/useTodoList";
import TodoListLoadingSkeleton from "./TodoListLoadingSkeleton";
import DeleteTodoModal from "./DeleteTodoModal";
import LoadingButton from "@mui/lab/LoadingButton";
import CreateTodoModal from "./CreateTodoModal";

const TodoList = () => {
    const { list, isLoading, refetch } = useTodoList()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <h1>Todo List</h1>
						<LoadingButton 
							loading={isLoading}
							loadingPosition="start"
							variant="contained"
							startIcon={<RefreshIcon />}
							onClick={refetch}
							disabled={isLoading}
						>
							Refresh
						</LoadingButton>
						&nbsp;
						<CreateTodoModal />
            <Grid item xs={12} md={6}>
                {isLoading ? (
                    <TodoListLoadingSkeleton />
                ) : (
                <List dense={false}>
                    {list.map(item => (
											<ListItem
												key={item._id}
												secondaryAction={
													<DeleteTodoModal data={item} />
												}
												>
												<ListItemAvatar>
														<Avatar>
														<FolderIcon />
														</Avatar>
												</ListItemAvatar>
												<ListItemText
														primary={item.title}
														secondary={item.description || null}
												/>
											</ListItem>
                    ))}
                </List>
                )}
            </Grid>
        </Box>
    )
}

export default TodoList