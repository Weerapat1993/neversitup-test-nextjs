import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

const TodoListLoadingSkeleton = () => {
    const arr = Array.from(Array(3).keys())
    return arr.map(key => (
        <Card key={key} sx={{ m: 2 }}>
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          }
          title={
            <Skeleton
                animation="wave"
                height={10}
                width="20%"
                style={{ marginBottom: 6 }}
            />
        }
          subheader={
            <Skeleton animation="wave" height={10} width="40%" />
          }
        />
      </Card>
    ))
}

export default TodoListLoadingSkeleton