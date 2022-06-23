import fetch from 'node-fetch';

const getData = () => {
  // Need to set environment variables in cli for this to show up
  // Syntax: `export <name>=<value>`. Works on unix based systems.
  // Has a different syntax for powershell and cmd
  const { userName, password, instanceName } = process.env;

  const fieldNames = [
    'sys_id',
    'number',
    'assigned_to',
    'short_description',
    'state',
  ].join(',');
  const filter = 'active=true';
  const recordCount = 100;
  const tableName = 'incident';

  const apiURL = `https://${instanceName}.service-now.com/api/now/table/${tableName}?sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_limit=${recordCount}&sysparm_fields=${encodeURIComponent(
    fieldNames
  )}&sysparm_query=${filter}`;

  // Doesn't work on stackblitz due to CORS issues in Webcontainer
  // Try using another device
  fetch(apiURL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${userName}:${password}`),
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
