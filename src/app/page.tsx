"use client";

import { useAppSelector } from "@/redux/hooks";
import TodoList from "../modules/todo/components/TodoList";
import { AuthModal } from "@/modules/auth/AuthModal";
import styled from "@emotion/styled";

const Background = styled('div')({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
});


const BgImage = styled('div')({
  position: 'relative',
  backgroundImage: 'url("/images/bg.png")',
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export default function Home() {
  const isLoggedIn = useAppSelector((state) => Boolean(state.authReducer?.data?.token));
  return (
    <Background>
      <BgImage>
        {isLoggedIn ? (
          <TodoList />
        ) : (
          <AuthModal />
        )}
      </BgImage>
    </Background> 
  );
}