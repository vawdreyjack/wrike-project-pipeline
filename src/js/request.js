
import axios from 'axios'
import keys from '../../keys.js'
//import { resolve } from 'url';

const requestOptions = {
  headers: {'Authorization': 'Bearer ' + keys.WRIKE_TOKEN}
}

export default async (folderId) => {

  const parentFolderData = await getParentFolderData(folderId);
  const workflow = await getWorkflowData(keys.WORKFLOW_ID);
  const projects = await getSubProjects(parentFolderData);
  //Sort the projects into the appropriate phases
 projects.forEach(async (project) => {
      const { id: projectId, project: { customStatusId : statusId } } = project;
      const { data: { data: tasks } } = await axios.get(`https://www.wrike.com/api/v4/folders/${projectId}/tasks`, {...requestOptions, params: { status: 'Active', fields: '[customFields,responsibleIds]' } });
      //Place in appropriate phase
      const phaseIndex = workflow.findIndex(x => x.id == statusId);
      //const priorityIndex = project.customFields.findIndex(field => field.id == keys.PRIORITY_FIELD);
      const mappedProject = {
        ...project,
        type: project.title.split(' -')[0],
        tasks: tasks,
        //priority: priorityIndex != -1 ? p.customFields[priorityIndex].value : '9'
      };
      phaseIndex != -1 ? workflow[phaseIndex].projects.push(mappedProject) : null;
  });
  

  const { data: { data: users } } = await axios.get(`https://www.wrike.com/api/v4/contacts`, requestOptions);

  return { output: workflow, users: users };
  
}

async function getParentFolderData(folderId) {
  const { data: { data: projectData } }  = await axios.get(`https://www.wrike.com/api/v4/folders/${folderId}`, requestOptions);
  return projectData;
}

//Requests all worklows from Wrike, filters to target workflow based on ID and then maps it to return only the data we need
async function getWorkflowData(workflowId) {
  const { data: { data: workflows } } = await axios.get(`https://www.wrike.com/api/v4/workflows/`, requestOptions);
  const workflow = workflows.filter(flow => flow.id == workflowId)[0];
  const minimizedWorkflow = workflow.customStatuses.filter(status => !status.hidden).map(status => ({ id: status.id, title: status.name, projects: [], color: status.color }));
  return minimizedWorkflow;
}

async function getSubProjects(parentFolderData) {
  const subFolderIds = parentFolderData[0].childIds;
  //request data for all subfolders
  const { data: { data: subFolders } } = await axios.get(`https://www.wrike.com/api/v4/folders/${subFolderIds.join(',')}`, requestOptions);
  //collapse the childIds for all subfolders into a single, one-dimensional array
  const projectIds = subFolders.reduce((acc, project) => [...acc, ...project.childIds], []);
  //Get project data
  const allProjects = [...parentFolderData[0].childIds, ...projectIds];
  const { data: { data: projects } } = await axios.get(`https://www.wrike.com/api/v4/folders/${allProjects.join(',')}`, requestOptions);

  return projects;
}