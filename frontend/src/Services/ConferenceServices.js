import axios from "axios";
const REST_API_BASE_URL="http://localhost:9090/conference/getAllConference";
export const listConference=()=>axios.get(REST_API_BASE_URL);  
//create authors
export const createAuthorWork = (authorwork,conferenceId) => {
     const formData = new FormData();
     formData.append("pdfFiles",authorwork.pdfFile);
     var x=`{"name":"${authorwork.name}","address":"${authorwork.address}","city":"${authorwork.city}","state":"${authorwork.state}","country":"${authorwork.country}","cont_no":"${authorwork.contactNumber}","email":"${authorwork.email}","title":"${authorwork.title}","track":"${authorwork.track}","key_words":"${authorwork.keywords}","abstractText":"${authorwork.abstract}"}`;
     formData.append("name",x);
    return axios.post(`http://localhost:9090/authors/uploadwork/${conferenceId}`,formData);
  };
export const createConference=(conference)=>{
   return axios.post('http://localhost:9090/conference/createConference',conference);
};
//get all conference between recent date
export const listConferenceBtwDate=()=>{
  return axios.get('http://localhost:9090/conference/getAllConferencebtwdate');
}
// create track
export const createTracks=(conferenceId,tracks)=>{
  
  return axios.post(`http://localhost:9090/track/createtrack/${conferenceId}`,tracks);
}
//call all roles
export const gellAllRoles=()=>axios.get('http://localhost:9090/role/getallrole');

//create committee members

export const createCommitteeMembers=(members,conference_id)=>{
   return axios.post(`http://localhost:9090/user/createuser/${conference_id}`,members);
}
export const createReviewers=(members,conference_id)=>{
  return axios.post(`http://localhost:9090/Reviewer/createreviewer/${conference_id}`,members);
}

//fetch all users before recent date

export const gellAllusersBeforDate=()=>axios.get('http://localhost:9090/user/getallusersbeforerecentdate');

//fetch all authors using conferenceid
export const gellAllAuthors=(conference_id)=>{
  return axios.get(`http://localhost:9090/authors/getallauthors/${conference_id}`);
}
//fetch all reviewers using conferenceid
export const gellAllReviewers=(conference_id)=>{
  return axios.get(`http://localhost:9090/Reviewer/getallreviwers/${conference_id}`);
}

