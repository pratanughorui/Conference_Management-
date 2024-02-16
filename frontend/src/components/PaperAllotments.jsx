import React, { useEffect, useState } from 'react';
import { createTracks, listConferenceBtwDate,gellAllAuthors,gellAllReviewers } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const PaperAllotments = () => {
  const data = useLoaderData();
  const conference = data.data;
  //console.log(data.data)
 // console.log(data.data2)
 const [authors, setAuthors] = useState([]);
 const [formauthors, setFormauthors] = useState([]);
 const [revieres, setRevieres] = useState([]);
 useEffect(() => {
  fetchAuthors();
  fetchRevewers();
}, [conference]);
const fetchRevewers=()=>{
  if(conference){
    gellAllReviewers(conference.conference_id).then((Response)=>{
      setRevieres(Response.data);
    }).catch((err)=>{

    })
  }else{

  }
}

const fetchAuthors = () => {
  if (conference) {
    gellAllAuthors(conference.conference_id)
      .then((response) => {
        setAuthors(response.data);
        setFormauthors(response.data);
      })
      .catch((err) => {
        console.error('Error fetching authors:', err);
      });
  }
};

// useEffect(() => {
//   const updatedFormAuthors = authors.map(author => author.pdf_name);
//   setFormauthors(updatedFormAuthors);
// }, [authors]);

//console.log("formauthors:", formauthors);
  const [tracks, setTracks] = useState([]);
  const [indexpaper, setIndexpaper] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [paper, setPaper] = useState('');

  const [informations, setInformations] = useState([]);
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    paper: '',
    reviewer: ''
  });


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!paper) newErrors.paper = 'Paper is required.';
      if (!reviewer) newErrors.reviewer = 'reviewer is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    console.log(informations.findIndex(iteam=>iteam.paper===paper && iteam.reviewer===reviewer));
    if(informations.length>0 && informations.findIndex(iteam=>iteam.paper===paper && iteam.reviewer===reviewer)!=-1){
      setCompletionMessage("Repeated elements");
      return;
    }
    
    const datas={paper,reviewer};

    informations.push(datas);
    console.log(informations);
    // const index=formauthors.indexOf(paper);
    // console.log(index)

 
    setCompletionMessage('');
    
    // Form submission logic here

    // Reset form fields after submission
  

  };
const removeinfo=(index)=>{
  const updatedinformations = [...informations];
  // Remove the member at the specified index
  updatedinformations.splice(index, 1);
  // Update the state with the updated array
  setInformations(updatedinformations);
}
const handlepapertable=(index)=>{
  console.log(index);
}
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left side - Paper Allotment Form */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Paper Allotment Form</h3>
              {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Reviewers:</label>
                  <select
                    className="form-select mb-3"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}

                   
                  >
                    <option value="">Select Reviewers</option>
                    {
                  revieres.map((member,index)=>(
                    <option key={index} value={member.name}>{member.name}</option>

                  ))
                }
                    {/* Map over reviewers here */}
                  </select>
                  <div className="invalid-feedback">{errors.conferenceName}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Papers:</label>
                  <select
                    className="form-select mb-3"
                    value={paper}
                    onChange={(e) =>{
                      
                      setPaper(e.target.value);
                      
                    }}
                   
                  >
                    <option value="">Select Papers</option>
                    {
                  formauthors.map((member,index)=>(
                    <option key={index} value={member.pdf_name}>{member.pdf_name}</option>

                  ))
                }
               
                    {/* Map over reviewers here */}
                  </select>
                  {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
                </div>
               

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Add
                </button>
              </form>
            </div>
          </div>
          
        </div>

        {/* Right side - Table */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Reviewer</th>
          <th>Paper</th>
        </tr>
      </thead>
      <tbody>
        {/* Iterate over reviewer-paper pairs */}
        {/* Example */}
        {
          informations.map((member,index)=>(
            <tr key={index}>
          <td>{member.reviewer}</td>
          <td>{member.paper}</td>
          <td style={{ cursor: 'pointer' }} onClick={()=>removeinfo(index)}>&#10060;</td>
        </tr>
          ))
        }

        {/* <tr>
          <td>Reviewer 1</td>
          <td>Paper 1</td>
        </tr>
        <tr>
          <td>Reviewer 2</td>
          <td>Paper 2</td>
        </tr> */}
        {/* End of Example */}
      </tbody>
    </table>
    {informations.length > 0 && (
  <button className="btn btn-primary">Save</button>
)}
  </div>
            </div>
          </div>
        </div>
            {/* New Table - Bottom Left */}
            
    <div className="col-md-6 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Submitted Papers</h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Pdf</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {/* Add rows for the new table */}
                {
                  authors.map((member,index)=>(
                    <tr key={index}>

                      <td>{member.name}</td>
                      <td>{member.pdf_name}</td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
  );
};

export default PaperAllotments;
