
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
  const output = workflow.customStatuses.filter(status => !status.hidden).map(status => ({ id: status.id, title: status.name, projects: [] }));

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
  //const { data: { data: users } } = await axios.get(`https://www.wrike.com/api/v4/contacts`, {...requestOptions, params: { fields : '[metadata]' }});
  const { data: { data: users } } = await axios.get(`https://www.wrike.com/api/v4/contacts`, requestOptions);
  //console.log(users);
  //console.log(output);
  return { output: output, users: users };
  
}

