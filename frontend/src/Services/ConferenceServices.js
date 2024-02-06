import axios from "axios";
const REST_API_BASE_URL="http://localhost:9090/conference/getAllConference";
export const listConference=()=>axios.get(REST_API_BASE_URL);  
export const createAuthorWork = (authorwork) => {
     const formData = new FormData();
     formData.append("pdfFiles",authorwork.pdfFile);
     var x=`{"conference_name":"${authorwork.conferenceName}","name":"${authorwork.name}","address":"${authorwork.address}","city":"${authorwork.city}","state":"${authorwork.state}","cont_no":"${authorwork.contactNumber}","email":"${authorwork.email}","track":"${authorwork.track}","key_words":"${authorwork.keywords}","abstractText":"${authorwork.abstract}"}`;
     formData.append("name",x);
  
    // // Append form data fields
    // Object.entries(authorwork).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
  
    // Append the file
    //formData.append('pdfFile', authorwork.pdfFile); // Assuming pdfFile is the selected PDF file

  
    return axios.post('http://localhost:9090/authors/uploadwork',formData);
  };
