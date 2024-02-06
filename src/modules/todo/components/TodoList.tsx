"use client"

import React, { Fragment } from "react"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TodayIcon from '@mui/icons-material/Today';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTodoList } from "../hooks/useTodoList";
import TodoListLoadingSkeleton from "./TodoListLoadingSkeleton";
import DeleteTodoModal from "./DeleteTodoModal";
import Fab from "@mui/material/Fab";
import CreateTodoModal from "./CreateTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";
import Typography from "@mui/material/Typography";

const TodoList = () => {
    const { list, isLoading, refetch } = useTodoList()
    return (
        <Box sx={{ flexGrow: 1 }}>
						<Typography align="center" fontWeight="bold" variant="h4" component="h5">
							TODO LIST
						</Typography>
						<center>
							<Fab size="small" color="default" aria-label="refresh" onClick={refetch}>
								<RefreshIcon />
							</Fab>
						</center>
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
													<Fragment>
														<UpdateTodoModal data={item} />
														&nbsp;
														<DeleteTodoModal data={item} />
													</Fragment>										
												}
												>
												<ListItemAvatar>
													<Avatar>
														<TodayIcon />
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