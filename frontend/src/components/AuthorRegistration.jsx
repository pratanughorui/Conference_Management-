import {React,useEffect, useState} from 'react'
import { createAuthorWork} from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const AuthorRegistration = () => {
  const data=useLoaderData();
  const conference=data.data;
  const [tracks,setTracks]=useState([]);
  const [topics,setTopics]=useState([]);
  const [name, setName] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [country, setCountry] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const[title,setTitle]=useState('');
    const [track, setTrack] = useState('');
    const [keywords, setKeywords] = useState('');
    const [abstract, setAbstract] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [completionMessage, setCompletionMessage] = useState('');
    const [topicid,setTopicid]=useState('');
    const [errors, setErrors] = useState({
      name: '',
      affiliation: '',
      country:'',
      contactNumber: '',
      email: '',
      title:'',
      track: '',
      topicid:'',
      keywords: '',
      abstract: '',
      pdfFile: '',
    });
 // console.log(conference.tracks)
useEffect(()=>{
  setTracks(conference.tracks);
},[])

const handleTrackChange=(e)=>{
  const ind=e.target.selectedIndex-1;
 // console.log(tracks[ind].topics)
 if(ind!=-1){
  setTopics(tracks[ind].topics);
  setTrack(tracks[ind].track_name);
 }else{
  setTopics([]);
 }
 
}

    
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // if(!isValid) return;
      const newErrors = {};
    //if (!conferenceName) newErrors.conferenceName = 'Conference name is required.';
    if (!name) newErrors.name = 'Name is required.';
    if (!affiliation) newErrors.affiliation = 'affiliation is required.';
    if (!country) newErrors.country = 'country is required.';
    if (!contactNumber) newErrors.contactNumber = 'Contact number is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!title) newErrors.title = 'title is required.';
    if (!track) newErrors.track = 'Track is required.';
    if (!topicid) newErrors.topicid = 'Topic is required.';
    if (!keywords) newErrors.keywords = 'Keywords are required.';
    if (!abstract) newErrors.abstract = 'Abstract is required.';
    if (!pdfFile) newErrors.pdfFile = 'PDF file is required.';
    setErrors(newErrors);
    // If there are any errors, stop form submission
    if (Object.keys(newErrors).length > 0) {
      //console.log("ff");
      return;
    }
     const authorwork={name,affiliation,country,contactNumber,email,title,keywords,abstract,pdfFile};
    console.log(authorwork);
    console.log(topicid);
    //----------------------send data to backend 
     createAuthorWork(authorwork,topicid,conference.conference_id).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage('Registration completed successfully!');
       // Reset all form fields
       setName('');
       setAffiliation('');
       setCountry('');
       setContactNumber('');
       setEmail('');
       setTitle('');
       setTrack('');
       setTopicid('');
       setKeywords('');
       setAbstract('');
       setPdfFile(null);
     }).catch(err=>{
      console.log(err);
     })
     };
    // const handleConferenceChange = (e) => {
    //   const selectedConference = conference.find(conf => conf.conferences_title === e.target.value);
    //   if (selectedConference) {

    //     setConferenceId(selectedConference.conference_id);
    //   }
    //   setConferenceName(e.target.value);
    // };
    return (
      <div>
        
        <div className="container mt-5">
        <div className="row justify-content-center">
       
          <div className="col-md-7">
          <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conferences_title}</span>
</p>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Submit Paper</h3>
                
                {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
                <form onSubmit={handleFormSubmit}>
                  {/* <label className="form-label">Conference Name:</label>
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
                <div className="invalid-feedback">{errors.conferenceName}</div> */}
  
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
             <div className="invalid-feedback">{errors.name}</div>
          <label className="form-label">Affiliation:</label>
          <textarea
            className={`form-control mb-3 ${errors.affiliation ? 'is-invalid' : ''}`}
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          ></textarea>
   <div className="invalid-feedback">{errors.affiliation}</div>
          {/* <label className="form-label">City:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.city ? 'is-invalid' : ''}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
  <div className="invalid-feedback">{errors.city}</div> */}
          {/* <label className="form-label">State:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.state ? 'is-invalid' : ''}`}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <div className="invalid-feedback">{errors.state}</div> */}
          {/* -------------------------- */}
          <label className="form-label">Country:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.country ? 'is-invalid' : ''}`}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className="invalid-feedback">{errors.country}</div>
          {/* ------------------------------------- */}
  
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
        <div className="mb-3">
                <label className="form-label">Track:</label>
                <select
                     className={`form-select mb-3 ${errors.track ? 'is-invalid' : ''}`}
                    // value={conferenceName}
                     onChange={handleTrackChange}
                    
                  >
                    <option value="">Select Track</option>
                    
                    {
    tracks.map((con, index) =>
        <option key={index} value={con.track_id}>{con.track_name}</option>
    )
}
                  </select>
                <div className="invalid-feedback">{errors.track}</div>
              </div>
              {/* -------------------------------- */}
              <div className="mb-3">
                <label className="form-label">Topic:</label>
                <select
                     className={`form-select mb-3 ${errors.topicid ? 'is-invalid' : ''}`}
                    value={topicid}
                    onChange={(e)=>setTopicid(e.target.value)}
                    
                  >
                    <option value="">Select Topic</option>
                    
                  {
                    topics.map(con=>
                        <option key={con.topic_id} value={con.topic_id}>{con.topic_name}</option>
                       )
                  }
                  </select>
                <div className="invalid-feedback">{errors.topicid}</div>
              </div>
        <label className="form-label">Title:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.title ? 'is-invalid' : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        <div className="invalid-feedback">{errors.title}</div>
  
          {/* <label className="form-label">Track:</label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.track ? 'is-invalid' : ''}`}
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
         <div className="invalid-feedback">{errors.track}</div> */}
          <label className="form-label">Keywords:</label>
          <textarea
            className={`form-control mb-3 ${errors.keywords ? 'is-invalid' : ''}`}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          ></textarea>
         <div className="invalid-feedback">{errors.keywords}</div>
         <p style={{ float: 'right', color: 'red' }}>(Limited to five keywords)</p>
          <label className="form-label">Abstract:</label>
          <textarea
            className={`form-control mb-3 ${errors.abstract ? 'is-invalid' : ''}`}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          ></textarea>
         <div className="invalid-feedback">{errors.abstract}</div>
         <p style={{ float: 'right', color: 'red' }}>(Limited to 200 words)</p>
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
    </div>
  )
}

export default AuthorRegistration