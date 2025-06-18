import prisma from '@/lib/prisma';

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
}

const TestPage = async () => {
  const users = await getUsers();
  return (
    <div>
      {users && users.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

export default TestPage;
