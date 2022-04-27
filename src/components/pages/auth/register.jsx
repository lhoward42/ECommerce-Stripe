import Layout from "../../shared/layout"

const Register = ({ token, setEmail, setPassword, email, password, adminSignUp  }) => {
  
  return (
<Layout>
  <form onSubmit={(() => adminSignUp())}>
      <h4>Email</h4>
       <input onChange={(e) => { setEmail(e.target.value)}} />
       <h4>Password</h4>
       <input onChange={(e) => { setPassword(e.target.value)}} />
       <br />
       <input type="submit" value="Submit"/>
   </form>
</Layout>
   )
}

export default Register