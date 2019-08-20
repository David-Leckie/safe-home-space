<script>
  import safenetwork from './safenetwork_interface.js'
  import moment from 'moment'
  export default {
    name: 'App',
    data() {
      return {nameText: '', urlText: 'safe://', descriptionText: '', keywordsText: '',
      category1Text: '', category2Text: '', sites: [], newText: [], 
      filCat: '', filSubCat: '', selCat1: '', selCat1SubA: '', selCat1SubB: '',
      selCat2: '', selCat2SubA: '', selCat2SubB: '', verified: '', requestRemove: '', verSel: '', 
      mailVisible: false, settingsVisible: false, theme: 'neon', verifiedIndicator: false,
      requestRemoveIndicator: false, ufsites: [], radioSite: [], verified: 'No', chosenSite: [], chosenSite: [], 
      neon: 'neon', dark: 'dark', ocean: 'ocean', radioKey: [], nameAndTag: [], requestRemoveButton: 'Request Remove Site'}
    },
    methods: {
      
      loadTheme(theme) {
        for (var i=0; i < document.styleSheets.length; i++) {
          document.styleSheets[i].disabled=true
        };

        document.styleSheets[0].disabled=false;
         document.styleSheets[1].disabled=false;
         document.styleSheets[2].disabled=false;
         document.styleSheets[3].disabled=false;
         document.styleSheets[4].disabled=false;
         document.styleSheets[5].disabled=false;

        if (theme == "neon") {
         document.styleSheets[6].disabled=false;
        }
        else if (theme == "dark") {
          document.styleSheets[7].disabled=false;
        }
        else if (theme == "ocean") {
          document.styleSheets[8].disabled=false;
        }
        else {
          document.styleSheets[0].disabled=false;
        }
      },
      timeout: function(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
          },
      settingsAlert: async function() {
          alert("Custom Themes Coming Soon!")
      },
      textChange: async function(typing) {
        this.newText = await typing;
      },
      chooseSubCategorySelList: async function(cat) {
            if (cat == 'Information') {
              var options = ["All", "SAFE", "Tech", "Science", "Geography", "Society", "Media", "Arts", "General"]
            } else if (cat == 'Tools') {
              var options = ["All", "Storage", "Computing", "Organisation", "Finance", "Language", "Visual", "Sound", "Other Tools"]
            } else if (cat == 'All Media') {
              var options = ["All", "Music", "Video", "Games", "Art", "Words", "Kids", "Other Media"]
            } else if (cat == 'Social') {
              var options = ["All", "People", "Mail", "Chat", "Blog", "Forums", "Community", "Other Social"]
            } else if (cat == 'Trade') {
              var options = ["All", "Markets", "Retail", "Services", "Local", "Software", "Currency", "Other Trade"]
            } else {
              var options = ["-",]
            }
            return options;
      },
      resetSubCategories1: async function() {
        this.selCat1SubA = "None";
        this.selCat1SubB = "None"
      },
      resetSubCategories2: async function() {
        this.selCat2SubA = "None";
        this.selCat2SubB = "None"
      },
      chooseSelectSubCategory1AList: async function(selCat1) {
          let subCat1ASelList = document.getElementById("subCategory1ASelectList");
          subCat1ASelList.innerHTML = '';
            var options = await this.chooseSubCategorySelList(selCat1);
          for(var i = 0; i < options.length; i++) {
           var catName = options[i];
            var categoryA = document.createElement("option");
            if (catName == "") {
              categoryA.value = "None";
            }
            else {
            categoryA.textContent = catName;
            categoryA.value = catName;
            }
          subCat1ASelList.appendChild(categoryA);
          }
          await this.chooseSelectSubCategory1BList(selCat1);
      },
      chooseSelectSubCategory1BList: async function(selCat1) {
          let subCat1BSelList = document.getElementById("subCategory1BSelectList");
          subCat1BSelList.innerHTML = '';
            var options = await this.chooseSubCategorySelList(selCat1);
          for(var i = 0; i < options.length; i++) {
           var catName = options[i];
            var categoryB = document.createElement("option");
            if (catName == "") {
              categoryB.value = "None";
            }
            else {
            categoryB.textContent = catName;
            categoryB.value = catName;
            }
          subCat1BSelList.appendChild(categoryB);
          }
      },
      chooseSelectSubCategory2AList: async function(selCat2) {
          let subCat2ASelList = document.getElementById("subCategory2ASelectList");
          subCat2ASelList.innerHTML = '';
            var options = await this.chooseSubCategorySelList(selCat2);
          for(var i = 0; i < options.length; i++) {
           var catName = options[i];
            var categoryA = document.createElement("option");
            if (catName == "") {
              categoryA.value = "None";
            }
            else {
            categoryA.textContent = catName;
            categoryA.value = catName;
            }
          subCat2ASelList.appendChild(categoryA);
          }
          await this.chooseSelectSubCategory2BList(selCat2);
      },
      chooseSelectSubCategory2BList: async function(selCat2) {
          let subCat2BSelList = document.getElementById("subCategory2BSelectList");
          subCat2BSelList.innerHTML = '';
            var options = await this.chooseSubCategorySelList(selCat2);
          for(var i = 0; i < options.length; i++) {
           var catName = options[i];
            var categoryB = document.createElement("option");
            if (catName == "") {
              categoryB.value = "None";
            }
            else {
            categoryB.textContent = catName;
            categoryB.value = catName;
            }
          subCat2BSelList.appendChild(categoryB);
          }
      },
      requestRemoveSite: async function(requestRemove) {
        if (requestRemove =='Yes') {
          this.requestRemoveButton = 'Request Remove Site'
          this.requestRemove = 'No';
          this.requestRemoveIndicator = false
        }
        else if (requestRemove == 'No') {
          this.requestRemoveButton = 'Restore'
          this.requestRemove = 'Yes';
          this.requestRemoveIndicator = true
        }
        else {
          this.requestRemoveButton = 'Request Remove Site'
          this.requestRemove = 'No';
          this.requestRemoveIndicator = false
        } 
          await this.editSite('requestRemove')
      },
      addSite: async function() {
        try {
        await this.ifEmptyAddNone();
        await safenetwork.insertItem(this.urlText, {name: this.nameText, url: this.urlText, description: this.descriptionText,
        keywords: this.keywordsText,
        category1: this.selCat1, category1SubCategoryA: this.selCat1SubA, category1SubCategoryB: this.selCat1SubB,
        category2: this.selCat2, category2SubCategoryA: this.selCat2SubA, category2SubCategoryB: this.selCat2SubB,
        dateAdded: Date(), dateUpdated: Date(), delete: false, verified: 'No', requestRemove: 'No'});
        let savedMessage = document.getElementById("savedMessage");
          savedMessage.className = "show";
          setTimeout(function(){ savedMessage.className = savedMessage.className.replace("show", ""); },1000);
        this.newText = [];
        this.radioKey = this.urlText;
        }
        catch (err) {
          alert ("Error!\n\nTry Checking the URL.\n\nDuplicate Entries Not Allowed.\n")
        }
      },
      editSite: async function() {
        try {
          this.radioKey = this.urlText;
          this.selectedVersion = await safenetwork.getSelectedEntryVersion(this.radioKey);
          await this.ifEmptyAddNone();
          await safenetwork.updateItem(this.radioKey, {name: this.nameText, url: this.urlText, description: this.descriptionText,
          keywords: this.keywordsText,
          category1: this.selCat1, category1SubCategoryA: this.selCat1SubA, category1SubCategoryB: this.selCat1SubB,
          category2: this.selCat2, category2SubCategoryA: this.selCat2SubA, category2SubCategoryB: this.selCat2SubB,
          dateAdded: this.dateAdded, dateUpdated: Date(), delete: false, verified: 'No', requestRemove:
          this.requestRemove}, this.selectedVersion);
          let savedMessage = document.getElementById("savedMessage");
          savedMessage.className = "show";
          setTimeout(function(){ savedMessage.className = savedMessage.className.replace("show", ""); },1000);
          this.newText = [];
        }
        catch (err) {
          alert ("No Site Selected!\n\nAdd New Site or Select From List...\n")
        }
      },
      ifEmptyAddNone: async function() {
        if (this.selCat1 == "") {
          this.selCat1 = "None"
        }
        else {
          this.selCat1 = this.selCat1
        };
        if (this.selCat2 == "") {
          this.selCat2 = "None"
        }
        else {
          this.selCat2 = this.selCat2
        };
        if (this.selCat1SubA == "") {
          this.selCat1SubA = "None"
        }
        else {
          this.selCat1SubA = this.selCat1SubA
        };
        if (this.selCat1SubB == "") {
          this.selCat1SubB = "None"
        }
        else {
          this.selCat1SubB = this.selCat1SubB
        };
        if (this.selCat2SubA == "") {
          this.selCat2SubA = "None"
        }
        else {
          this.selCat2SubA = this.selCat2SubA
        };
        if (this.selCat2SubB == "") {
          this.selCat2SubB = "None"
        }
        else {
          this.selCat2SubB = this.selCat2SubB
        };
      },
      clearTextBox: async function() {
        if (this.newText == true) {
          if (confirm ("Discard Changes?")==true) {
            await this.emptyAll();
           }
           else {
             return;
           }
        }
        else {
          await this.emptyAll();
          this.urlText = 'safe://';
        }
          let waitCat1 = await this.selCat1;
          await this.chooseSelectSubCategory1AList(waitCat1);
          await this.chooseSelectSubCategory1AList(waitCat1);
          let waitCat2 = await this.selCat2;
          await this.chooseSelectSubCategory2AList(waitCat2);
          await this.chooseSelectSubCategory2AList(waitCat2);
      },
      emptyAll: async function() {
          this.radioKey = '';
          this.nameText = '';
          this.descriptionText = '';
          this.keywordsText = '';
          this.selCat1 = '';
          this.selCat1SubA = '';
          this.selCat1SubB = '';
          this.selCat2 = '';
          this.selCat2SubA = '';
          this.selCat2SubB = '';
          this.requestRemoveIndicator = false
      },
      urlSearch: async function(urlText) {

        try {

          this.ufsites = await safenetwork.getItems();

          this.chosenSites = await this.ufsites.filter((ufsite) => (ufsite.value.url == urlText)
          );

          this.chosenSite = await this.chosenSites[0];

          this.nameText = await this.chosenSite.value.name;
          this.descriptionText = await this.chosenSite.value.description;
          this.keywordsText = await this.chosenSite.value.keywords;
          this.selCat1 = await this.chosenSite.value.category1;
            let waitCat1 = await this.selCat1;
            await this.chooseSelectSubCategory1AList(waitCat1);
            await this.chooseSelectSubCategory1BList(waitCat1);
            this.selCat1SubA = await this.chosenSite.value.category1SubCategoryA;
            this.selCat1SubB = await this.chosenSite.value.category1SubCategoryB;
          this.selCat2 = await this.chosenSite.value.category2;
          await this.chooseSelectSubCategory2AList(this.selCat2);
          await this.chooseSelectSubCategory2BList(this.selCat2);
          this.selCat2SubA = await this.chosenSite.value.category2SubCategoryA;
          this.selCat2SubB = await this.chosenSite.value.category2SubCategoryB; 
          //this.dateAdded = await radioSite.value.dateAdded;
          this.verified = await this.chosenSite.value.verified;
          this.requestRemove = await this.chosenSite.value.requestRemove;
          if (this.requestRemove == 'Yes') {
            this.requestRemoveIndicator = true
          }
          else if (this.requestRemove == 'No') {
            this.requestRemoveIndicator = false
          }
          this.radioKey = await this.chosenSite.key;
        }
        catch(err) {
          await this.emptyAll();
          alert('No Records for This Location.\n\nIs this Your Address?\n\nAdd a New Entry in the Index!')
        }
      },
      showMailDropdown: async function() {
        document.getElementById("mailDropdown").classList.toggle("show");
      },
      documentClick(e) {
        let el = this.$refs.mailDropdown
        let target = e.target
        if ( el !== (target) && !el.contains(target)) {
          this.mailVisible = false
        }
      },
      
    },
    async created() {
      await this.loadTheme(this.theme);
      await safenetwork.authoriseAndConnect();
      await safenetwork.linkToMutableData();
      await document.addEventListener('click', this.documentClick)
    },
    destroyed() {
      document.removeEventListener('click', this.documentClick)
    },
  }
  
</script>

<style scoped>

{
@import './stylesheets/main-stylesheet.css';
}

</style>

<template>
  <body>
    <div id="mainDiv">
      <div id="savedMessage" ><b>Saved</b></div>
      <div id="homeIcon">
        <a href="***LINK TO SEARCH PAGE HOME***"></a>
      </div>
      <div id="mailIcon">
        <a @click="mailVisible = !mailVisible" ref="mailDropdown"></a>
        <div id="mailDropdown" v-if="mailVisible">
          <div id="innerMailDropdown" class="mailItem">
            <p>Index administered by David.</p>
            <br>
            <p>For Queries please get in touch...</p>
            <br>
            <br>
            <br>
            <p><span class="button mail">SAFE Mail</span></p>
            <br>
            <br>
            <br>
            <p>Or <span class="button mail">Patter</span></p>
            <br>
          </div>
        </div>
      </div>
      <div id="settingsIcon" @click.prevent="settingsAlert()">
      </div>
      <div id="titleBox">
        <div id="safeIcon"></div>
        <span><h1 class="heading1Size">SAFE Index</h1></span>
      </div>
      <div id="subTitleBox">
        <h2>Editor</h2><span id="editorIcon"></span>
      </div>
      <form>
        <div id="URLBox">
          <h3>Address</h3>
          <div class="editItemAlt">
            <input id="textBoxAddress" class="textInputBox" style="width:94%; margin-left: 3%; font-style: oblique;" 
            type="text" maxlength="45"
            v-model="urlText">
          </div>
          <div id="searchAndClearBtns">
            <input id= "searchBtn" class="button search colour2" type="submit" value="Search" @click.prevent="urlSearch(urlText)">
            <input id= "clearBtn" class="button clear colour3" type="submit" value="Clear" @click.prevent="clearTextBox()">
          </div>
        </div>
        <div id="mainEditBox" v-bind:class="{'remove-yes':requestRemoveIndicator}">
          <div id="textBoxWrapperName" style="position: relative; width: 100%">
            <div class="editItem" style="padding-top:15px;">
              <h3>Name</h3>
              <div class="editItemAlt">
                <input id="textBoxName" class="textInputBox" 
                type="text" maxlength="50" 
                v-model="nameText" @input="textChange(true)">
              </div>
            </div>
          </div>
          <div id="textBoxWrapperDescription" style="position: relative; width: 100%">
            <div class="editItem">
              <h3>Description</h3>
              <div class="editItemAlt">
                <textarea id="textBoxDescription" class="textInputBox" 
                type="text" maxlength="200"   
                v-model="descriptionText" @input="textChange(true)">
                </textarea>
              </div>
            </div>
          </div>
          <div id="textBoxWrapperKeywords" style="position: relative; width: 100%;">
            <div class="editItem">
              <h3>Keywords</h3>
              <div class="editItemAlt">
                <textarea id="textBoxKeywords" class="textInputBox" 
                type="text" maxlength="170" 
                v-model="keywordsText" @input="textChange(true)">
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div id="mainEditBoxLower" >
          <div id="categorySelectBoxesWrapper" v-bind:class="{'remove-yes':requestRemoveIndicator}">
            <div id="category1SelectBoxes">
              <div class="editItem">
                <h3>Category 1</h3>
                <div class="editItemAlt">
                  <select class="menuInputBox" v-model="selCat1" @change.prevent="chooseSelectSubCategory1AList(selCat1),
                  resetSubCategories1()" @input="textChange(true)">   
                    <option value="" disabled selected>Select</option>
                    <option value="Information">Information</option>
                    <option value="Tools">Tools</option>
                    <option value="All Media">Media</option>
                    <option value="Social">Social</option>
                    <option value="Trade">Trade</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div class="editItem">
                <h3>Sub Category 1</h3>
                <div class="editItemAlt">
                  <select id="subCategory1ASelectList" class="menuInputBox" v-model="selCat1SubA" @change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
                <div class="editItemAlt">
                  <select id="subCategory1BSelectList" class="menuInputBox" v-model="selCat1SubB" @change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="category2SelectBoxes">
              <div class="editItem">
                <h3>Category 2</h3>
                <div class="editItemAlt">
                  <select class="menuInputBox" v-model="selCat2" @change="chooseSelectSubCategory2AList(selCat2),
                  resetSubCategories2()" @input="textChange(true)">
                    <option value="" disabled selected>Select</option>
                    <option value="Information">Information</option>
                    <option value="Tools">Tools</option>
                    <option value="All Media">Media</option>
                    <option value="Social">Social</option>
                    <option value="Trade">Trade</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div class="editItem">
                <h3>Sub Category 2</h3>
                <div class="editItemAlt">
                  <select id="subCategory2ASelectList" class="menuInputBox" v-model="selCat2SubA" @change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
                <div class="editItemAlt">
                  <select id="subCategory2BSelectList" class="menuInputBox" v-model="selCat2SubB" @change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
              </div> 
            </div>
            <div id="verifiedBox" class="editItemAlt" v-bind:class="{'remove-yes':requestRemoveIndicator}">
            <span style="font-size: 20px"><b>Verified: </b>{{verified}}</span>
            </div>
            <div style="display: none; position: absolute">{{radioKey}}</div>
          </div>
          <div id="editAndSaveButtonsBox" v-bind:class="{'remove-yes':requestRemoveIndicator}">
            <input id= "addBtn" class="button addSite colour4" type="submit" value="Add Site" @click.prevent="addSite">
            <input id= "editBtn" class="button saveChanges colour2" type="submit" value="Save Changes" @click.prevent="editSite">
          </div>
          <div id="requestRemoveBox" >
            <input id="requestRemoveBtn" class="button requestRemove colour1" type="submit" v-model="requestRemoveButton" 
            v-bind:class="{'remove-yes-button':requestRemoveIndicator}" v-on:click.prevent="requestRemoveSite(requestRemove)">
          </div>
        </div>
      </form>
    </div>
  </body>
</template>