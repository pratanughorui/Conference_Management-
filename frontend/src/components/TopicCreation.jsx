import React,{useEffect,useState} from 'react'
import { useLoaderData } from 'react-router-dom';
function TopicCreation() {
    const data=useLoaderData();
    const conference=data.data;
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const handleAddTrack = () => {
        if (topicInput.trim() !== '') {
          setTopics([...topics, topicInput]);
          setTopicInput('');
        }
      };
      const handleRemoveTrack = (index) => {
        const updatedTracks = [...topics];
        updatedTracks.splice(index, 1);
        setTopics(updatedTracks);
      };
  return (
    <div>
        
       
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
      <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conferences_title} | 
 Subject: {conference.subject}</span>
</p>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Topics</h3>
            {/* {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )} */}
            <form >
              <div className="mb-3">
                <label className="form-label">Track Name:</label>
                <select
                     className={"form-select mb-3"}
                    // value={conferenceName}
                    // onChange={handleConferenceChange}
                    
                  >
                    <option value="">Select Track</option>
                    
                  {/* {
                    conference.map(con=>
                        <option value={con.conferences_title}>{con.conferences_title}</option>
                       )
                  } */}
                  </select>
                {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
              </div>
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
                <label className="form-label">Topic:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type topic name"
                   value={topicInput}
                     onChange={(e) => setTopicInput(e.target.value)}
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
                  {topics.map((topic, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {topic}
                      <span
                   
                   style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveTrack(index)}
                      >
                        &#10060;
                      </span>
                    </li>
                  ))}
                </ul>
                {/* {errors.tracks && <div className="invalid-feedback d-block">{errors.tracks}</div>} */}
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

export default TopicCreation