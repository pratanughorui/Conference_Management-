import React,{useEffect,useState} from 'react'
import { createTracks, listConferenceBtwDate } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const TrackCreation = () => {
  const data=useLoaderData();
  const conference=data.data;
  const [conferenceId, setConferenceId] = useState('');
  // useEffect(()=>{
  //   fetchData();
  //  },[]);
  // const fetchData=()=>{
    
  //   listConferenceBtwDate().then((Response)=>{
  //    console.log(Response.data);
  //    console.log(typeof Response.data);
  //    setConference(Response.data);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }












    const [conferenceName, setConferenceName] = useState('');
  const [subject, setSubject] = useState('');
  const [tracks, setTracks] = useState([]);
  const [trackInput, setTrackInput] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    conferenceName: '',
    subject: ''
  });

  const handleAddTrack = () => {
    if (trackInput.trim() !== '') {
      setTracks([...tracks, trackInput]);
      setTrackInput('');
    }
  };

  const handleRemoveTrack = (index) => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setTracks(updatedTracks);
  };

  const handleFormSubmit = (e) => {
    console.log("fff");
    e.preventDefault();

    const newErrors = {};
    if (tracks.length === 0) newErrors.tracks = 'At least one track is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // Form submission logic here
    //const tracksdata={conferenceId,tracks};
    createTracks(conference.conference_id,tracks).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage(Response.data);
    }).catch((err)=>{
      console.log(err);
    })
    console.log({
      conferenceName,
      subject,
      tracks,
      conferenceId
    });

    // Reset form fields after submission
    setConferenceName('');
    setSubject('');
    setTracks([]);
    setTrackInput('');
  };
  const handleConferenceChange = (e) => {
    const selectedConference = conference.find(conf => conf.conferences_title === e.target.value);
    if (selectedConference) {
      setSubject(selectedConference.subject);
      setConferenceId(selectedConference.conference_id);
    }
    setConferenceName(e.target.value);
  };
  return (
    <div>
        <p className="text-start">Conference Name:{conference.conferences_title}</p>
        <p className="text-start">Subject:{conference.subject}</p>
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Tracks</h3>
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
            <form onSubmit={handleFormSubmit}>
              {/* <div className="mb-3">
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
              </div> */}
              {/* <div className="mb-3">
                <label className="form-label">Subject:</label>
                <input
                  type="text"
                  className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled
                />
                <div className="invalid-feedback">{errors.subject}</div>
              </div> */}
              <div className="mb-3">
                <label className="form-label">Tracks:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type track name"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddTrack}
                  >
                    Add
                  </button>
                </div>
                <ul className="list-group">
                  {tracks.map((track, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {track}
                      <button
                        type='button'
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveTrack(index)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                {errors.tracks && <div className="invalid-feedback d-block">{errors.tracks}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3" >
                Submit
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

export default TrackCreation