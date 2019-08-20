
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
  
  const authReqUri = await safeApp.auth.genConnUri(
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
    182, 34, 162, 13, 100, 97, 30, 235, 39, 159, 243, 179 ], "typeTag": 15000 }
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

}

