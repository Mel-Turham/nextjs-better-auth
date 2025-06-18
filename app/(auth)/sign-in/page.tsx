import LoginForm from '@/features/auth/sign-in';
import React from 'react';

const SignInPage = () => {
  return (
    <div className='flex items-center justify-center p-6 md:p-10 min-h-svh'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
