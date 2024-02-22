import React, { useEffect, useState } from 'react';
import { createTracks, listConferenceBtwDate,gellAllAuthors,gellAllReviewers,getalltracks,getallreviewersbytrack } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const PaperAllotments = () => {
  const data = useLoaderData();
  const conference = data.data;
 
  //console.log(conference.tracks);
 const [authors, setAuthors] = useState([]);
 const [formauthors, setFormauthors] = useState([]);
 const [revieres, setRevieres] = useState([]);
 let [trackid, setTrackid] = useState('');
 const [tracks,setTracks]=useState([]);
 const[topics,setTopics]=useState([]);


 useEffect(() => {
  // Assuming 'conference' is defined somewhere
  if (conference) {
      // Update tracks state
      setTracks(conference.tracks);
  }
}, [conference]); // Dependency array ensures the effect runs whenever 'conference' changes

useEffect(() => {
  // Map over 'tracks' and extract topics when 'tracks' state updates
  const extractedTopics = tracks.flatMap(track => track.topics);
  setTopics(extractedTopics);
  
}, [tracks]); // Dependency array ensures the effect runs whenever 'tracks' changes

const handleTopicChange=(e)=>{
  setAuthors(topics[e.target.selectedIndex-1].authors);
  console.log(topics[e.target.selectedIndex-1].authors);
}
const [title,setTitle]=useState('');
const handleauthordata=(index)=>{
  console.log(authors[index]);
  setTitle(authors[index].title);
}

const trackFetching=()=>{
  getalltracks(conference.conference_id).then((Response)=>{
     setTracks(Response.data);
     console.log(Response.data);
  }).catch((err)=>{
    console.log(err);
  })
}

const fetchreviewers=(e)=>{
   
  //console.log(e.target.value);
  if(e.target.value){
    getallreviewersbytrack(e.target.value).then((r)=>{
      setRevieres(r.data);
      console.log(r.data);
     }).catch((err)=>{
      console.log(err.data);
     })
  }else{
    setRevieres([]);
  }
   
}

// useEffect(() => {
//   const updatedFormAuthors = authors.map(author => author.pdf_name);
//   setFormauthors(updatedFormAuthors);
// }, [authors]);

//console.log("formauthors:", formauthors);
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
    console.log(paper);
    console.log(reviewer);
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.paper = 'Paper is required.';
      if (!reviewer) newErrors.reviewer = 'reviewer is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      
      return;
    }
    console.log(informations.findIndex(iteam=>iteam.title===title && iteam.reviewer===reviewer));
    if(informations.length>0 && informations.findIndex(iteam=>iteam.title===title && iteam.reviewer===reviewer)!=-1){
      setCompletionMessage("Repeated elements");
      return;
    }

    
    const datas={title,reviewer};

    informations.push(datas);
    console.log(informations);
    // const index=formauthors.indexOf(paper);
    // console.log(index)

 
    //setCompletionMessage('');
    
    // Form submission logic here

    // Reset form fields after submission
  

  };
  if(completionMessage!=null){
    setTimeout(()=>{
      setCompletionMessage('');
    },3000)
  }
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
const submitpaperallotment=()=>{
  setCompletionMessage('Paper allotment successfully');
  setInformations([]);
}
  return (
    <div className="container mt-5">
     <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conferences_title}</span>
</p>
      <div className="row">
        {/* Left side - Paper Allotment Form */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Allotment Of Papers</h3>
              
              <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Track:</label>
                <select
                     className={"form-select mb-3"}
                    
                     onChange={fetchreviewers}
                    
                  >
                    <option value="">Select Track</option>
                    
                  {
                    tracks.map(con=>
                        <option key={con.track_id} value={con.track_id}>{con.track_name}</option>
                       )
                  }
                  </select>
                {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
              </div>
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
                  <label className="form-label">Paper:</label>
                  {/* change to input */}
                  <input type="text" className="form-control mb-3" value={title}  disabled/>
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
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
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
          <td>{member.title}</td>
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
  <button className="btn btn-primary" onClick={submitpaperallotment}>Save</button>
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
          <div className="mb-3">
                <label className="form-label">Topic:</label>
                <select
                     className={"form-select mb-3"}
                    // value={conferenceName}
                     onChange={handleTopicChange}
                    
                  >
                    <option value="">Select Topic</option>
                    
                    {
    topics.map((topic, index) => (
        <option key={index} value={topic.topic_name}>{topic.topic_name}</option>
    ))
}
                  </select>
                {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
              </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Pdf</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {/* Add rows for the new table */}
                {
                  authors.map((member,index)=>(
                    <tr key={index} onClick={()=>handleauthordata(index)}>

                      <td>{member.name}</td>
                      <td>{member.title}</td>
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
