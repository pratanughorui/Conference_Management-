import React,{useEffect, useState} from 'react'
import { createAuthorWork, listConference,listConferenceBtwDate } from '../Services/ConferenceServices';

const AuthorRegistration = () => {

   const[conference,setConference]=useState([])
   useEffect(()=>{
    fetchData();
   },[]);
    const fetchData = () => {
      listConferenceBtwDate().then((Response)=>{
        setConference(Response.data);
        console.log(Response.data);
      }).catch((err)=>{
         console.log(err);
      })
      // try {
      //   const response = await listConference();
      //   setConference(response.data);
      // } catch (error) {
      //   console.log("dd");
      //   console.log(error);
      // }
    };
    // Specify an empty dependency array to run the effect only once
  //fetchData();
  // const [isValid, setIsValid] = useState(true);

  // const handleVerification = () => {
  //   // Regular expression for basic email format validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   // Check if the email matches the regex
  //   const isValidEmail = emailRegex.test(email);

  //   // Update the state based on the validation result
  //   setIsValid(isValidEmail);
  // };
    const [conferenceName, setConferenceName] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [track, setTrack] = useState('');
    const [keywords, setKeywords] = useState('');
    const [abstract, setAbstract] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [completionMessage, setCompletionMessage] = useState('');
    const [conferenceId, setConferenceId] = useState('');
    const [errors, setErrors] = useState({
      conferenceName: '',
      name: '',
      address: '',
      city: '',
      state: '',
      contactNumber: '',
      email: '',
      track: '',
      keywords: '',
      abstract: '',
      pdfFile: '',
    });
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // if(!isValid) return;
      const newErrors = {};
    if (!conferenceName) newErrors.conferenceName = 'Conference name is required.';
    if (!name) newErrors.name = 'Name is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (!city) newErrors.city = 'City is required.';
    if (!state) newErrors.state = 'State is required.';
    if (!contactNumber) newErrors.contactNumber = 'Contact number is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!track) newErrors.track = 'Track is required.';
    if (!keywords) newErrors.keywords = 'Keywords are required.';
    if (!abstract) newErrors.abstract = 'Abstract is required.';
    if (!pdfFile) newErrors.pdfFile = 'PDF file is required.';
    setErrors(newErrors);
    // If there are any errors, stop form submission
    if (Object.keys(newErrors).length > 0) {
      console.log("ff");
      return;
    }
     const authorwork={conferenceName,name,address,city,state,contactNumber,email,track,keywords,abstract,pdfFile};
    
     createAuthorWork(authorwork,conferenceId).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage('Registration completed successfully!');
       // Reset all form fields
       setConferenceName('');
       setName('');
       setAddress('');
       setCity('');
       setState('');
       setContactNumber('');
       setEmail('');
       setTrack('');
       setKeywords('');
       setAbstract('');
       setPdfFile(null);
     }).catch(err=>{
      console.log(err);
     })
      // Handle form submission logic here
      // console.log({
      //   conferenceName,
      //   name,
      //   address,
      //   city,
      //   state,
      //   contactNumber,
      //   email,
      //   track,
      //   keywords,
      //   abstract
      //   // pdfFile,
      // });
    };
    const handleConferenceChange = (e) => {
      const selectedConference = conference.find(conf => conf.conferences_title === e.target.value);
      if (selectedConference) {

        setConferenceId(selectedConference.conference_id);
      }
      setConferenceName(e.target.value);
    };
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Author Registration</h3>
                {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
                <form onSubmit={handleFormSubmit}>
                  <label className="form-label">Conference Name:</label>
                  <select
                    className={`form-select mb-3 ${errors.conferenceName ? 'is-invalid' : ''}`}
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
                <div className="invalid-feedback">{errors.conferenceName}</div>
  
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
             <div className="invalid-feedback">{errors.name}</div>
          <label className="form-label">Address:</label>
          <textarea
            className={`form-control mb-3 ${errors.address ? 'is-invalid' : ''}`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
   <div className="invalid-feedback">{errors.address}</div>
          <label className="form-label">City:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.city ? 'is-invalid' : ''}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
  <div className="invalid-feedback">{errors.city}</div>
          <label className="form-label">State:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.state ? 'is-invalid' : ''}`}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <div className="invalid-feedback">{errors.state}</div>
  
          <label className="form-label">Contact Number:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.contactNumber ? 'is-invalid' : ''}`}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <div className="invalid-feedback">{errors.contactNumber}</div>
  
          <label className="form-label">Email:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <div className="invalid-feedback">{errors.email}</div>
  
          <label className="form-label">Track:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.track ? 'is-invalid' : ''}`}
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
         <div className="invalid-feedback">{errors.track}</div>
          <label className="form-label">Keywords:</label>
          <textarea
            className={`form-control mb-3 ${errors.keywords ? 'is-invalid' : ''}`}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          ></textarea>
         <div className="invalid-feedback">{errors.keywords}</div>
          <label className="form-label">Abstract:</label>
          <textarea
            className={`form-control mb-3 ${errors.abstract ? 'is-invalid' : ''}`}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          ></textarea>
         <div className="invalid-feedback">{errors.abstract}</div>
          <label className="form-label">Upload PDF:</label>
          <input
            type="file"
            className={`form-control mb-3 ${errors.pdfFile ? 'is-invalid' : ''}`}
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
          <div className="invalid-feedback">{errors.pdfFile}</div>
  
  <button  type="submit" className="btn btn-primary w-100 mt-3">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorRegistration