import React,{useEffect, useState} from 'react'
import { createAuthorWork, listConference } from '../Services/ConferenceServices';
import axios from "axios";

const AuthorRegistration = () => {

   const[conference,setConference]=useState([])
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listConference();
        setConference(response.data);
      } catch (error) {
        console.log("dd");
        console.log(error);
      }
    };
  
    fetchData();
  
    // Specify an empty dependency array to run the effect only once
  }, []);
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
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // if(!isValid) return;
     const authorwork={conferenceName,name,address,city,state,contactNumber,email,track,keywords,abstract,pdfFile};
    //  const authorwork = new FormData();
    //  authorwork.append('authorwork', JSON.stringify({
    //   conference_name:conferenceName,
    //   name:name,
    //   address:address,
    //   city:city,
    //   state:state,
    //   cont_no: contactNumber,
    //   email:email,
    //   track:track,
    //   key_words: keywords,
    //   abstractText: abstract,
    //   //files:pdfFile
    //   // ... other fields from authorWorkDto
    // }));
  //authorwork.append('pdfFile', pdfFile); // Assuming pdfFile is the selected PDF file
     createAuthorWork(authorwork).then((Response)=>{
      console.log(Response.data);
     })


     /* try { 
        const formData = new FormData();
       formData.append('authorWorkDto', JSON.stringify({
        conference_name:conferenceName,
        name:name,
        address:address,
        city:city,
        state:state,
        cont_no: contactNumber,
        email:email,
        track:track,
        key_words: keywords,
        abstractText: abstract,
        //files:pdfFile
        // ... other fields from authorWorkDto
      }));
      //formData.append('files',pdfFile);
      

      //  axios.post('http://localhost:9090/authors/uploadwork', formData)
      // .then((res) => console.log(res.data))
      // .catch((err) => console.error(err));


        
     // console.log(response.data);
      } catch (error) {
        console.log('Error uploading work:', error);
      }*/
   
      // Handle form submission logic here
      console.log({
        conferenceName,
        name,
        address,
        city,
        state,
        contactNumber,
        email,
        track,
        keywords,
        abstract
        // pdfFile,
      });
    };
  
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Author Registration</h3>
                <form onSubmit={handleFormSubmit}>
                  <label className="form-label">Conference Name:</label>
                  <select
                    className="form-select mb-3"
                    value={conferenceName}
                    onChange={(e) => setConferenceName(e.target.value)}
                  >
                    <option value="">Select Conference</option>
                    
                  {
                    conference.map(con=>
                        <option value={con.conferences_name}>{con.conferences_name}</option>
                       )
                  }
                  </select>
  
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
  
          <label className="form-label">Address:</label>
          <textarea
            className="form-control mb-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
  
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
  
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
  
          <label className="form-label">Contact Number:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
  
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        
  
          <label className="form-label">Track:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
  
          <label className="form-label">Keywords:</label>
          <textarea
            className="form-control mb-3"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          ></textarea>
  
          <label className="form-label">Abstract:</label>
          <textarea
            className="form-control mb-3"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          ></textarea>
  
          <label className="form-label">Upload PDF:</label>
          <input
            type="file"
            className="form-control mb-3"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
  
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