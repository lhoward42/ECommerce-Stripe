const Register = ({ token, setEmail, setPassword, email, password  }) => {
  
  return (
  <form>
       <input onChange={(e) => { setEmail(e.target.value)}} />
   </form>
   )
}

export default Register