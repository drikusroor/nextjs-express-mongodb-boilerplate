import fetch from 'isomorphic-unfetch'

const UserPage = props => {
  const { users } = props
  return (
    <section>
      <h1>Users</h1>
      {users.map((user, index) => (
        <div key={`${index}_${user.id}`}>{user.email}</div>
      ))}
    </section>
  )
}

UserPage.getInitialProps = async ({ req }) => {
  const res = await fetch('http://localhost:3000/api/users')
  const users = await res.json()
  return { users }
}

export default UserPage
