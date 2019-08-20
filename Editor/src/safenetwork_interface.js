
export default {
  

authoriseAndConnect: async function() {
  window.appInfo = {
    name: 'Safe Home Page',
    id: 'safe-home-page',
    version: '1.0.0',
    vendor: 'David-Leckie'
  };
  window.safeApp = await window.safe.initialiseApp(appInfo);
  console.log('Authorising SAFE application...');

  const containerPermissions = {
    _public: [
      'Read',
      'Insert',
      'Update',
      'Delete'
    ]
  };

  const authorisationOptions = {own_container: true};
  
  const authReqUri = await safeApp.auth.genAuthUri(
    containerPermissions,
    authorisationOptions
  );
      let authUri = await window.safe.authorise(authReqUri);
      console.log('SAFE application authorised by user');
      await safeApp.auth.loginFromUri(authUri);
      console.log("Application connected to the network");
  
},

linkToMutableData: async function() {
  let storedNameAndTag = 
  /* INSERT NAME AND TAG CREATED BY ADMIN APP, AS EXAMPLE BELOW */
  { "name": [ 66, 252, 235, 149, 53, 133, 172, 11, 44, 215, 136, 26, 102, 76, 116, 35, 190, 3, 89, 54, 
    182, 34, 162, 13, 100, 97, 30, 235, 39, 159, 243, 179 ], "typeTag": 15000 };
  window.linkedMD = await window.safeApp.mutableData.newPublic(storedNameAndTag.name, storedNameAndTag.typeTag);
},

getItems: async function() {
  const entries = await window.linkedMD.getEntries();
  let entriesList = await entries.listEntries();
  let items = [];
  entriesList.forEach((entry) => {
    const value = entry.value;
    if (value.buf.length == 0) return;
    const parsedValue = JSON.parse(value.buf);
    const stringKey = entry.key.toString();
    items.push({ key: stringKey, value: parsedValue, version: value.version });
  });
  return items;
},

getSelectedEntryVersion: async function(radioKey) {
  let selectedEntry = await window.linkedMD.get(radioKey); 
  return selectedEntry.version
},

insertItem: async function(key, value) {
  const mutations = await window.safeApp.mutableData.newMutation();
  await mutations.insert(key, JSON.stringify(value));
  await window.linkedMD.applyEntriesMutation(mutations);
},

updateItem: async function(key, value, version) {
  const mutations = await window.safeApp.mutableData.newMutation();
  await mutations.update(key, JSON.stringify(value), version + 1);
  await window.linkedMD.applyEntriesMutation(mutations);
},

deleteItems: async function(items) {
  const mutations = await window.safeApp.mutableData.newMutation();
  items.forEach(async (item) => {
    await mutations.delete(item.key, item.version + 1);
  });
  await window.linkedMD.applyEntriesMutation(mutations);
},

checkForSavedTheme: async function() {
  window.publicContainer = await window.safeApp.auth.getContainer('_public');
  try {
    let keyName = 'Home-Page-Theme';
    let theme = await window.publicContainer.get(keyName);
    //return theme;
  }
  catch (err) { 
    return false
  }
},

getTheme: async function() {
  if (await this.checkForSavedTheme() == false) {
  const mutations = await window.safeApp.mutableData.newMutation();
  await mutations.insert('Home-Page-Theme', JSON.stringify('neon'));
  await window.publicContainer.applyEntriesMutation(mutations);
  return 'neon';
  }
  else {
  let keyName = 'Home-Page-Theme';
    let savedTheme = await window.publicContainer.get(keyName);
    const value = savedTheme;
    const theme = JSON.parse(value.buf); 
    return theme;
  }
},

getThemeVersion: async function() {
  let theme = await window.publicContainer.get('Home-Page-Theme'); 
  return theme.version
},

updateTheme: async function(value, version) {
  const mutations = await window.safeApp.mutableData.newMutation();
  await mutations.update('Home-Page-Theme', JSON.stringify(value), version + 1);
  await window.publicContainer.applyEntriesMutation(mutations);
},
}