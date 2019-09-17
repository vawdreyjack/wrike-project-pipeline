
import axios from 'axios'
import keys from '../../keys.js'
//import { resolve } from 'url';

const requestOptions = {
  headers: {'Authorization': 'Bearer ' + keys.WRIKE_TOKEN}
}


export default async () => {

  const { data: { data: data }  }  = await axios.get('https://www.wrike.com/api/v4/folders/IEABFWPQI4LJT5AQ', requestOptions);
  const subs = data[0].childIds;

  const output = {Planned: [], Writing: [], Editing: [], Design: [], Approval: [], Publication: [], Completed: [], Review: []};

  subs.forEach( async (sub) => {
    const { data: { data: details }  } = await axios.get(`https://www.wrike.com/api/v4/folders/${sub}`, requestOptions);
    //console.log('Sub folder details', details);
    const projects = details[0].childIds;

    projects.forEach( async (projectId) => {
      const { data: { data: details }  } = await axios.get(`https://www.wrike.com/api/v4/folders/${projectId}`, requestOptions);
      //console.log('Project details', details);
      const { project : { customStatusId : status }  } = details[0];
      switch (status) {
        case "IEABFWPQJMA53SF4": //Planned
          output.Planned.push(details[0]);
          break;
        case "IEABFWPQJMA53SGG": //Writing
          output.Writing.push(details[0]);
          break;
        case "IEABFWPQJMA53SGQ": //Editing
          output.Editing.push(details[0]);
          break;
        case "IEABFWPQJMA53SHE": //Design
          output.Design.push(details[0]);
          break;
        case "IEABFWPQJMA53SG2": //Approval
          output.Approval.push(details[0]);
          break;
        case "IEABFWPQJMA53SHO": //Publication
          output.Publication.push(details[0]);
          break;
        case "IEABFWPQJMA53SF5": //Publication
          output.Completed.push(details[0]);
          break;    
        case "IEABFWPQJMA53SHZ": //Review
          output.Review.push(details[0]);
          break;
      }


    });

  });

  return output;

}