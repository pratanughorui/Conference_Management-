import axios from "axios";
const REST_API_BASE_URL="http://localhost:9090/conference/getAllConference";
export const listConference=()=>axios.get(REST_API_BASE_URL);  
export const createAuthorWork = (authorwork) => {
     const formData = new FormData();
     formData.append("pdfFiles",authorwork.pdfFile);
     var x=`{"conference_name":"${authorwork.conferenceName}","name":"${authorwork.name}","address":"${authorwork.address}","city":"${authorwork.city}","state":"${authorwork.state}","cont_no":"${authorwork.contactNumber}","email":"${authorwork.email}","track":"${authorwork.track}","key_words":"${authorwork.keywords}","abstractText":"${authorwork.abstract}"}`;
     formData.append("name",x);
    return axios.post('http://localhost:9090/authors/uploadwork',formData);
  };
export const createConference=(conference)=>{
   return axios.post('http://localhost:9090/conference/createConference',conference);
};

export const listConferenceBtwDate=()=>{
  return axios.get('http://localhost:9090/conference/getAllConferencebtwdate');
}
