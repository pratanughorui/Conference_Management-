import React,{useState,useEffect} from 'react'
import { createAuthorWork, listConference,gellAllRoles,createCommitteeMembers } from '../Services/ConferenceServices';

const CommitteeMembersRegistration = () => {

  const[conference,setConference]=useState([])
  const[roles,setRoles]=useState([])
  const [conferenceId, setConferenceId] = useState('');
  const [roleId, setRoleId] = useState('');
  useEffect(()=>{
   fetchconference();
   fetchRoles();
  },[]);
   const fetchconference = () => {
     listConference().then((Response)=>{
       setConference(Response.data);
       console.log(Response.data);
     }).catch((err)=>{
        console.log(err);
     })
   };
   const fetchRoles=()=>{
    gellAllRoles().then((Response)=>{
      setRoles(Response.data); 
    }).catch((err)=>{
      console.log(err);
   })
   }
    const [members, setMembers] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [conferenceName, setConferenceName] = useState('');
    const [roleName, setRoleName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
      conferenceName: '',
      roleName:'',
      name: '',
      address: '',
      mobile: '',
      email: '',
      password: '',
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new member to the list
      const newErrors = {};
      if (!conferenceName) newErrors.conferenceName = 'Conference name is required.';
      if (!name) newErrors.name = 'Name is required.';
      if (!address) newErrors.address = 'Address is required.';
      if (!mobile) newErrors.mobile = 'Contact number is required.';
      if (!email) newErrors.email = 'Email is required.';
      if (!password) newErrors.password = 'Password is required.';
      if (!roleName) newErrors.roleName = 'roleName is required.';
      setErrors(newErrors);
      // If there are any errors, stop form submission
      if (Object.keys(newErrors).length > 0) {
        //console.log("ff");
        return;
      }
//submission code
     const members={conferenceName,roleName,name,address,password,mobile,email}
     console.log(members);
     createCommitteeMembers(members,conferenceId,roleId).then((Response)=>{
         console.log(Response.data);
     }).catch((err)=>{
      console.log(err);
     })





      // const newMember = { name, address, password, mobile, conferenceName, email,roleName };
      // setMembers([...members, newMember]);
      // // Clear form fields
      // setName('');
      // setAddress('');
      // setPassword('');
      // setMobile('');
      // setConferenceName('');
      // setEmail('');
      // setRoleName('');
    };
    const handleConferenceChange = (e) => {
      const selectedConference = conference.find(conf => conf.conferences_title === e.target.value);
      if (selectedConference) {
        setConferenceId(selectedConference.conference_id);
      }
      setConferenceName(e.target.value);
    };
    const handleRoleChange = (e) => {
      const selectedRole = roles.find(conf => conf.role_name === e.target.value);
      if (selectedRole) {
        setRoleId(selectedRole.role_id);
      }
      setRoleName(e.target.value);
    };
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-6">
        <h2>Members</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {/* Render members
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.email}</td>
                <td>{member.name}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <button className="btn btn-primary">Old Members</button>
      </div>
      <div className="col-md-6">
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
        
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="invalid-feedback">{errors.address}</div>
          </div>
         
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile:</label>
            <input type="text" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <div className="invalid-feedback">{errors.mobile}</div>
          </div>
          
          <div className="mb-3">
          <label className="form-label">Conference Name:</label>
                <select
                    className={`form-control ${errors.conferenceName ? 'is-invalid' : ''}`}
                    value={conferenceName}
                    onChange={handleConferenceChange}
                    
                  >
                    <option value="">Select Conference</option>
                    
                  {
                    conference.map(con=>
                        <option value={con.conferences_title}>{con.conferences_title}</option>
                       )
                  }
                  </select>
                <div className="invalid-feedback">{errors.roleName}</div>
          </div>
          <div className="mb-3">
          <label className="form-label">Roles:</label>
                <select
                    className={`form-control ${errors.roleName ? 'is-invalid' : ''}`}
                    value={roleName}
                    onChange={handleRoleChange}
                    
                  >
                    <option value="">Select Roles</option>
                    
                  {
                    roles.map(con=>
                        <option value={con.role_name}>{con.role_name}</option>
                       )
                  }
                  </select>
                <div className="invalid-feedback">{errors.roleName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-12">
        <h2>Members List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Password</th>
              <th scope="col">Mobile</th>
              <th scope="col">Conference Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {/* Render members
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.address}</td>
                <td>{member.password}</td>
                <td>{member.mobile}</td>
                <td>{member.conferenceName}</td>
                <td>{member.email}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default CommitteeMembersRegistration