import React,{useState} from 'react'

const CommitteeMembersRegistration = () => {
    const [members, setMembers] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [conferenceName, setConferenceName] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new member to the list
      const newMember = { name, address, password, mobile, conferenceName, email };
      setMembers([...members, newMember]);
      // Clear form fields
      setName('');
      setAddress('');
      setPassword('');
      setMobile('');
      setConferenceName('');
      setEmail('');
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
            {/* Render members */}
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.email}</td>
                <td>{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary">Old Members</button>
      </div>
      <div className="col-md-6">
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile:</label>
            <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="conferenceName" className="form-label">Conference Name:</label>
            <input type="text" className="form-control" id="conferenceName" value={conferenceName} onChange={(e) => setConferenceName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
            {/* Render members */}
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.address}</td>
                <td>{member.password}</td>
                <td>{member.mobile}</td>
                <td>{member.conferenceName}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default CommitteeMembersRegistration