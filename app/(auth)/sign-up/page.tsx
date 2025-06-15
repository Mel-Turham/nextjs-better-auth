import SignUpForm from '@/features/auth/sign-up';
import React from 'react';

const SignUpPage = () => {
  return (
    <div className='min-h-svh flex  flex-col items-center justify-center p-6  md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
