import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import TodayIcon from '@mui/icons-material/Today';

const TodoListLoadingSkeleton = () => {
  const arr = Array.from(Array(3).keys())
  return (
    <List dense={false}>
      {arr.map(key => (
        <ListItem
            key={key}
            >
            <ListItemAvatar>
              <Avatar>
                <TodayIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Skeleton
                  animation="wave"
                  height={16}
                  width="40%"
                />
              }
              secondary={<Skeleton animation="wave" height={14} width="60%" />}
            />
        </ListItem>
      ))}
    </List>
  )
}

export default TodoListLoadingSkeleton