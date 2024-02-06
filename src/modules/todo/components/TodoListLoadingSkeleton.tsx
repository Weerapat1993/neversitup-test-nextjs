import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TodayIcon from '@mui/icons-material/Today';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { Skeleton } from '@mui/material';

const TodoListLoadingSkeleton = () => {
  const arr = Array.from(Array(5).keys())
  return (
    <List dense={false}>
      {arr.map(key => (
        <ListItem
          key={key}
          style={{ background: 'white' }}
          secondaryAction={
            <Fragment>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              &nbsp;
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Fragment>
            
          }
          >
          <ListItemAvatar>
            <Avatar>
              <TodayIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width={80} sx={{ fontSize: '1rem', lineHeight: '1.5' }}  />}
            secondary={<Skeleton variant="text" width={120} sx={{ fontSize: '0.875em', lineHeight: '1.5' }}  />}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default TodoListLoadingSkeleton