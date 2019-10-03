
import axios from 'axios'
import keys from '../../keys.js'
//import { resolve } from 'url';

const requestOptions = {
  headers: {'Authorization': 'Bearer ' + keys.WRIKE_TOKEN}
}


export default async () => {

  const { data: { data: data }  }  = await axios.get(`https://www.wrike.com/api/v4/folders/${keys.FOLDER_ID}`, requestOptions);
  const workflow = await axios.get(`https://www.wrike.com/api/v4/folders/${keys.WORKFLOW_ID}` ,requestOptions);
  const subs = data[0].childIds;

  //const output = {Planned: [], Writing: [], Editing: [], Design: [], Approval: [], Publication: [], Completed: [], Review: []};
  const output = [];
  const projects = [];

  subs.forEach( async (sub) => {
    const { data: { data: details }  } = await axios.get(`https://www.wrike.com/api/v4/folders/${sub}`, requestOptions);
    //console.log('Sub folder details', details);
    const phaseObject = {
      id: sub,
      title: details.title,
      projects: []
    }
    output.push(phaseObject);
    projects.concat(details[0].childIds);
  });

  const { data: { data: projectDetails }} = await axios.get(`https://www.wrike.com/api/v4/folders/${projects.join(',')}`);

  projectDetails.forEach(p => {
    console.log(p);
  });

  /*projects.forEach( async (projectId) => {
    const { data: { data: details }  } = await axios.get(`https://www.wrike.com/api/v4/folders/${projectId}`, requestOptions);
    //console.log('Project details', details);
    const data = details[0];
    const { project : { customStatusId : status }  } = details[0];
    data.type = data.title.split(' -')[0];

    switch (status) {
      case "IEABFWPQJMA53SF4": //Planned
        output.Planned.push(data);
        break;
      case "IEABFWPQJMA53SGG": //Writing
        output.Writing.push(data);
        break;
      case "IEABFWPQJMA53SGQ": //Editing
        output.Editing.push(data);
        break;
      case "IEABFWPQJMA53SHE": //Design
        output.Design.push(data);
        break;
      case "IEABFWPQJMA53SG2": //Approval
        output.Approval.push(data);
        break;
      case "IEABFWPQJMA53SHO": //Publication
        output.Publication.push(data);
        break;
      case "IEABFWPQJMA53SF5": //Publication
        output.Completed.push(data);
        break;    
      case "IEABFWPQJMA53SHZ": //Review
        output.Review.push(data);
        break;
    }


  });


  return output;
  */
}