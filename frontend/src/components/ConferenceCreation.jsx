import React,{useState} from 'react'
import { createConference } from '../Services/ConferenceServices';

const ConferenceCreation = () => {
    const [conferences_title, setConferences_title] = useState('');
  const [subject, setSubject] = useState('');
  const [venue, setVenue] = useState('');
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    conferences_title: '',
    subject: '',
    venue: '',
    place: '',
    country: '',
    fromDate: '',
    toDate: ''
    
  });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newErrors = {};
    if (!conferences_title) newErrors.conferences_title = 'Conference title is required.';
    if (!subject) newErrors.subject = 'subject is required.';
    if (!venue) newErrors.venue = 'venue is required.';
    if (!place) newErrors.place = 'place is required.';
    if (!country) newErrors.country = 'country is required.';
    if (!fromDate) newErrors.fromDate = 'fromDate is required.';
    if (!toDate) newErrors.toDate = 'toDate is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const conference={conferences_title,subject,venue,place,country,fromDate,toDate};
    createConference(conference).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage('Conference created successfully!');
      setConferences_title('');
      setSubject('');
      setVenue('');
      setPlace('');
      setCountry('');
      setFromDate('');
      setToDate('');
    }).catch((err)=>{
      console.log("love");
      console.log(err);
    })
    console.log({
      conferences_title,
      subject,
      venue,
      place,
      country,
      fromDate,
      toDate
    });
    // // Reset form fields after submission
    // setConferenceTitle('');
    // setSubject('');
    // setVenue('');
    // setPlace('');
    // setCountry('');
    // setFromDate('');
    // setToDate('');
  };
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Conference Details</h3>
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
            <form onSubmit={handleFormSubmit}>
              <label className="form-label">Conference Title:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.conferences_title ? 'is-invalid' : ''}`}
                value={conferences_title}
                onChange={(e) => setConferences_title(e.target.value)}
              />
               <div className="invalid-feedback">{errors.conferences_title}</div>
              <label className="form-label">Subject:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.subject ? 'is-invalid' : ''}`}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
                <div className="invalid-feedback">{errors.subject}</div>
              <label className="form-label">Venue:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.venue ? 'is-invalid' : ''}`}
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
 <div className="invalid-feedback">{errors.venue}</div>
              <label className="form-label">Place:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.place ? 'is-invalid' : ''}`}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
 <div className="invalid-feedback">{errors.place}</div>
              <label className="form-label">Country:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.country ? 'is-invalid' : ''}`}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
 <div className="invalid-feedback">{errors.country}</div>
              <label className="form-label">From Date:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.fromDate ? 'is-invalid' : ''}`}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
 <div className="invalid-feedback">{errors.fromDate}</div>
              <label className="form-label">To Date:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.toDate ? 'is-invalid' : ''}`}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
 <div className="invalid-feedback">{errors.toDate}</div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ConferenceCreation