
import axios from 'axios'
import keys from '../../keys.js'
//import { resolve } from 'url';

const requestOptions = {
  headers: {'Authorization': 'Bearer ' + keys.WRIKE_TOKEN}
}


export default async () => {

  const { data: { data: data } }  = await axios.get(`https://www.wrike.com/api/v4/folders/${keys.FOLDER_ID}`, requestOptions);
  const { data: { data: flows } } = await axios.get(`https://www.wrike.com/api/v4/workflows/`, requestOptions);
  const workflow = flows.filter(flow => flow.id == keys.WORKFLOW_ID)[0];
  const output = workflow.customStatuses.map(status => ({ id: status.id, title: status.name, projects: [] }));

  const subIds = data[0].childIds;

  const { data: { data: subFolders } } = await axios.get(`https://www.wrike.com/api/v4/folders/${subIds.join(',')}`, requestOptions);
  const projectIds = subFolders.reduce((acc, folder) => [...acc, ...folder.childIds], []);
  
  //Sort the projects into the appropriate phases
  const { data: { data: projectDetails }} = await axios.get(`https://www.wrike.com/api/v4/folders/${projectIds.join(',')}`, requestOptions);
  projectDetails.forEach(p => {
    const { project: { customStatusId : statusId } } = p;
    const index = output.findIndex(x => x.id == statusId);
    index != -1 ? output[index].projects.push({ ...p, type: p.title.split(' -')[0] } ): null;
  });
  console.log(output);
  return output;
  
}

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
  */

