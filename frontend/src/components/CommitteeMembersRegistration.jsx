import React,{useState,useEffect} from 'react'
import { createAuthorWork, listConference,gellAllRoles,createCommitteeMembers,gellAllusersBeforDate,listConferenceBtwDate } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const CommitteeMembersRegistration = () => {

  const data=useLoaderData();
  const conference=data.data;
  const[role,setRoles]=useState([])
  const [conferenceId, setConferenceId] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [roleId, setRoleId] = useState('');
  useEffect(()=>{
   //fetchconference();
   fetchRoles();
  },[]);
  //  const fetchconference = () => {
  //   listConferenceBtwDate().then((Response)=>{
  //      setConference(Response.data);
  //      console.log(Response.data);
  //    }).catch((err)=>{
  //       console.log(err);
  //    })
  //  };
   const fetchRoles=()=>{
    gellAllRoles().then((Response)=>{
      setRoles(Response.data); 
    }).catch((err)=>{
      console.log(err);
   })
   }
    const [members, setMembers] = useState([]);
    const[newmembers,setNewmembers]=useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [place, setPlace] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    //const [conferenceName, setConferenceName] = useState('');
    const [roleName, setRoleName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
     // conferenceName: '',
      roleName:'',
      name: '',
      address: '',
      place: '',
      state: '',
      country: '',
      mobile: '',
      email: '',
      password: '',
    });
// ----------------------------------------data submission-----------------------------------
    const finalsave=(e)=>{
      e.preventDefault();
      createCommitteeMembers(newmembers,conference.conference_id).then((Response)=>{
        console.log(Response.data);
        setCompletionMessage('Members created successfully!');
        setNewmembers([]);
        clearFields();
    }).catch((error)=>{
     if (error.response && error.response.data && error.response.data.message) {
       // Access the error message from the response
       const errorMessage = error.response.data.message;
       console.log(errorMessage);
       // Handle the error message as needed (e.g., display it to the user)
     } else {
       // If the error doesn't contain a specific message, log the entire error object
       console.log(error);
     }
    })
    setTimeout(()=>{
      setCompletionMessage('');
    },3000)
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new member to the list
      const newErrors = {};
      //if (!conferenceName) newErrors.conferenceName = 'Conference name is required.';
      if (!name) newErrors.name = 'Name is required.';
      if (!address) newErrors.address = 'Address is required.';
      if (!place) newErrors.place = 'place is required.';
      if (!state) newErrors.state = 'state is required.';
      if (!country) newErrors.country = 'country is required.';
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
     const member_details={name,address,place,state,country,password,mobile,email,roleName}
     
    //  setNewmembers([...newmembers,member_details]);
    newmembers.push(member_details);
     console.log(newmembers);


    
    };
    const handleRoleChange = (e) => {
      const selectedRole = role.find(conf => conf.role_name === e.target.value);
      if (selectedRole) {
        setRoleId(selectedRole.role_id);
      }
      setRoleName(e.target.value);
    };
    const clearFields = () => {
      setName('');
      setAddress('');
      setPlace('');
      setState('');
      setCountry('');
      setPassword('');
      setMobile('');
      setEmail('');
      setRoleName('');
  };
  const getOldData=()=>{
    gellAllusersBeforDate().then((Response)=>{
      //  console.log(Response.data);
      setMembers(Response.data);
    }).catch((err)=>{
      console.log(err);
    });
  }
  const clearmembersTable=()=>{
    setMembers([]);
  }
  const clearnewmembersTable=()=>{
    setNewmembers([]);
  }
  const populateMemberForm = (member) => {
    setName(member.name);
    setAddress(member.address);
    setPlace(member.place);
    setState(member.state);
    setRoleName(member.roleName)
    setCountry(member.country);
    setPassword(member.password);
    setMobile(member.mobile);
    setEmail(member.email);
};
const delnewmwmber=(index)=>{
  const updatedMembers = [...newmembers];
    // Remove the member at the specified index
    updatedMembers.splice(index, 1);
    // Update the state with the updated array
    setNewmembers(updatedMembers);
}

  return (
    <div className="container mt-5">
            <div className="row">
            <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conferences_title}</span>
</p>
                <div className="col-md-6">
                
                    <div className="card">
                    
                        <div className="card-body">
                            <h2>Add Member</h2>
                            <form onSubmit={handleSubmit}>
                              {/* <div className='mb-3'>
                              <label htmlFor="conference name" className="form-label">Conference Name:</label> 
                            <input type="text" className="form-control"  value={conference.conferences_title} disabled/>  
                              </div> */}
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
            <label htmlFor="place" className="form-label">Place:</label>
            <input type="text" className={`form-control ${errors.place ? 'is-invalid' : ''}`} id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
            <div className="invalid-feedback">{errors.place}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State:</label>
            <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" value={state} onChange={(e) => setState(e.target.value)} />
            <div className="invalid-feedback">{errors.state}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <input type="text" className={`form-control ${errors.country ? 'is-invalid' : ''}`} id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <div className="invalid-feedback">{errors.country}</div>
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
          {/* <label className="form-label">Conference Name:</label>
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
                <div className="invalid-feedback">{errors.roleName}</div> */}
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
                    role.map(con=>
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
          <button type="submit" className="btn btn-primary">Add</button> &nbsp;
          <button type="button" className="btn" style={{backgroundColor: 'teal',color:'white'}} onClick={clearFields}>Next</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Old Members</h2>
                            <table className="table">
                            <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} onClick={() => populateMemberForm(member)}>
                <td>{member.email}</td>
                <td>{member.name}</td>
              </tr>
            ))}
          </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={getOldData}>Old Members</button>&nbsp;
        {/* <button type="button" className="btn btn-danger" onClick={clearmembersTable}>Clear</button>  */}
        {
          members.length > 0 && ( <button type="button" className="btn btn-danger" onClick={clearmembersTable}>Clear</button> )
        }
                        </div>
                    </div>
                    <div className="card mt-3">
                    {completionMessage && (
                  <div className="alert alert-success" role="alert">
                    {completionMessage}
                  </div>
                )}
                        <div className="card-body">
                            <h2>Members</h2>
                            <table className="table">
                            <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              
            </tr>
          </thead>
          <tbody>
            {newmembers.map((member, index) => (
              <tr key={index} onClick={() => populateMemberForm(member)}>
                <td>{member.email}</td>
                <td>{member.name}</td>
                <td style={{ cursor: 'pointer' }} onClick={()=>delnewmwmber(index)}>&#10060;</td>
              </tr>
            ))}
          </tbody>
                            </table>
                            {newmembers.length > 0 && (
  <>
    <button className="btn btn-primary" onClick={finalsave}>Save</button>&nbsp;
    <button type="button" className="btn btn-danger" onClick={clearnewmembersTable}>Clear</button>
  </>
)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CommitteeMembersRegistration