<script>
  import safenetwork from './safenetwork_interface.js'
  import moment from 'moment'
  export default {
    name: 'App',
    data() {
      return {nameText: '', urlText: '', descriptionText: '', keywordsText: '',
      category1Text: '', category2Text: '', sites: [], newText: [], 
      filCat: '', filSubCat: '', selCat1: '', selCat1SubA: '', selCat1SubB: '',
      selCat2: '', selCat2SubA: '', selCat2SubB: '', verified: '', requestRemove: '', verSel: '', 
      mailVisible: false, settingsVisible: false, theme: 'neon', verifiedIndicator: false,
      neon: 'neon', safe: 'safe', mondrian: 'mondrian', radioKey: [], nameAndTag: []}
    },
    methods: {
      showNameAndTag: async function() {
        this.nameAndTag = await safenetwork.showMutableData()
      },
      getTheme: async function() {
        this.theme = await safenetwork.getTheme();
        await this.loadTheme(this.theme)
      },
      loadTheme(theme) {
        for (var i=0; i < document.styleSheets.length; i++) {
          document.styleSheets[i].disabled=true
        };
        if (theme == "neon") {
         document.styleSheets[0].disabled=false;
        }
        else if (theme == "safe") {
          document.styleSheets[1].disabled=false;
        }
        else if (theme == "mondrian") {
          document.styleSheets[2].disabled=false;
        }
        else {
          document.styleSheets[2].disabled=false;
        }
      },
      timeout: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      saveTheme: async function(theme) {
        let themeVersion = await safenetwork.getThemeVersion();
        await safenetwork.updateTheme(theme, themeVersion);
        let savedMessage = document.getElementById("savedMessage2");
        savedMessage.className = "show";
        setTimeout(function(){ savedMessage.className = savedMessage.className.replace("show", ""); },1000);
          function timeout(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
          }
        await this.timeout(1000);
        await this.getTheme()
      },
      refreshList: async function() {
        this.sites = await safenetwork.getItems();
        await this.alphabetSort()
      },
      textChange: async function(typing) {
        this.newText = await typing;
      },
      chooseSubCategorySelList: async function(cat) {
        if (cat == 'Information') {
          var options = ["All", "SAFE", "Tech", "Science", "Geography", "Society", "Media", "Arts","General"]
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
        for (var i = 0; i < options.length; i++) {
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
        for (var i = 0; i < options.length; i++) {
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
        for (var i = 0; i < options.length; i++) {
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
        for (var i = 0; i < options.length; i++) {
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
      verifySite: async function(verified) {
        if (verified =='Yes') {
          this.verified = 'No';
          this.verifiedIndicator = false
        }
        else if (verified == 'No') {
          this.verified = 'Yes';
          this.verifiedIndicator = true
        }
        else {
          this.verified = 'No';
          this.verifiedIndicator = false
        }    
      },
      addSite: async function() {
        //const randomNumber = Math.floor((Math.random() * 10000) + 1);
        //const randomKey = randomNumber.toString();
        try {
          const randomKey = this.urlText;
          await this.ifEmptyAddNone();
          await safenetwork.insertItem(randomKey, {name: this.nameText, url: this.urlText, description: this.descriptionText,
          keywords: this.keywordsText,
          category1: this.selCat1, category1SubCategoryA: this.selCat1SubA, category1SubCategoryB: this.selCat1SubB,
          category2: this.selCat2, category2SubCategoryA: this.selCat2SubA, category2SubCategoryB: this.selCat2SubB,
          dateAdded: Date(), dateUpdated: Date(), delete: false, verified: 'No', requestRemove: 'No'});
          let savedMessage = document.getElementById("savedMessage");
          savedMessage.className = "show";
          setTimeout (function() { savedMessage.className = savedMessage.className.replace("show", ""); },1400);
          this.newText = [];
          this.radioKey = this.urlText;
        }
        catch (err) {
          alert ("Error!\n\nTry checking the URL.\n\nDuplicate entries not allowed.\n")
        }
        await this.refreshList();
      },
      editSite: async function() {
        try {
          this.selectedVersion = await safenetwork.getSelectedEntryVersion(this.radioKey);
          await this.ifEmptyAddNone();
          await safenetwork.updateItem(this.radioKey, {name: this.nameText, url: this.urlText, description: this.descriptionText,
          keywords: this.keywordsText,
          category1: this.selCat1, category1SubCategoryA: this.selCat1SubA, category1SubCategoryB: this.selCat1SubB,
          category2: this.selCat2, category2SubCategoryA: this.selCat2SubA, category2SubCategoryB: this.selCat2SubB,
          dateAdded: this.dateAdded, dateUpdated: Date(), delete: false, verified: this.verified, requestRemove:
          this.requestRemove}, this.selectedVersion);
          let savedMessage = document.getElementById("savedMessage");
          savedMessage.className = "show";
          setTimeout(function(){ savedMessage.className = savedMessage.className.replace("show", ""); },1200);
          this.newText = [];
        }
        catch (err) {
          alert ("No Site Selected!\n\nAdd New Site or Select From List...\n")
        }
        await this.refreshList();
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
        this.urlText = '';
        this.descriptionText = '';
        this.keywordsText = '';
        this.selCat1 = '';
        this.selCat1SubA = '';
        this.selCat1SubB = '';
        this.selCat2 = '';
        this.selCat2SubA = '';
        this.selCat2SubB = '';
      },
      filterByCategory: async function(filCat, caller) {
        if (caller == 'filCat') {
          this.verSel = 'default'
        };
        let ufsites = await safenetwork.getItems();
        if (filCat == "All" || filCat == "" || filCat == null || filCat == "Category") {
          this.sites = ufsites;
        }
        else {
          this.sites = await ufsites.filter(ufsite => (ufsite.value.category1 == filCat || ufsite.value.category2 == filCat));
        };
        await this.chooseFilterSubCategoryList(filCat);
        return this.sites;
      },
      chooseFilterSubCategoryList: async function(filCat) {
        let subCatFilList = document.getElementById("subCategoryFilterList");
        subCatFilList.innerHTML = '';
        let options = await this.filSubCatList(filCat);
        for (var i = 0; i < options.length; i++) {
          var catName = options[i];
          var category = document.createElement("option");
          category.textContent = catName;
          category.value = catName;
          subCatFilList.appendChild(category);
        }
      },
      filSubCatList: async function(filCat) {
        if (filCat == 'All') {
          var options = ["-"]
        } else if (filCat == 'Information') {
          var options = ["All", "SAFE", "Tech", "Science", "Geography", "Society", "Media", "Arts","General"]
        } else if (filCat == 'Tools') {
          var options = ["All", "Storage", "Computing", "Organisation", "Finance", "Language", "Visual", "Sound", "Other Tools"]
        } else if (filCat == 'All Media') {
          var options = ["All", "Music", "Video", "Games", "Art", "Words", "Kids", "Other Media"]
        } else if (filCat == 'Social') {
          var options = ["All", "People", "Mail", "Chat", "Blog", "Forums", "Community", "Other Social"]
        } else if (filCat == 'Trade') {
          var options = ["All", "Markets", "Retail", "Services", "Local", "Software", "Currency", "Other Trade"]
        } else {
          var options = ["Sub Category",]
        };
        return options;
      },
      filSubCatOnLoad: async function () {
        this.filSubCat = "Sub Category"
      },
      filterBySubCategory: async function(filSubCat, caller) {
        if (caller == 'filCat') {
          this.verSel = 'default'
        };
        let ufsites = await this.filterByCategory(this.filCat);
        if (filSubCat == "All" || filSubCat == "" || filSubCat == "None" || filSubCat == null || filSubCat == "Sub Category") {
          this.sites = ufsites;
        }
        else {
          this.sites = await ufsites.filter (ufsite => 
          ufsite.value.category1SubCategoryA == filSubCat ||
          ufsite.value.category1SubCategoryB == filSubCat ||
          ufsite.value.category2SubCategoryA == filSubCat ||
          ufsite.value.category2SubCategoryB == filSubCat
          );
        } 
        return this.sites;
      },
      verBoxOnLoad: async function () {
        this.verSel = "default"
      },
      filterByVerified: async function(verSel) {
        let ufsites = await this.filterBySubCategory(this.filSubCat)
        if (verSel == "All" || verSel == "") {
          this.sites = ufsites;
        }
        else if (verSel == "Verified") {
          this.sites = await ufsites.filter (ufsite => ufsite.value.verified == "Yes");
        }
        else if (verSel == "Unverified") {
          this.sites = await ufsites.filter (ufsite => ufsite.value.verified == "No");
        }
        else if (verSel == "To Remove") {
          this.sites = await ufsites.filter (ufsite => ufsite.value.requestRemove == 'Yes');
        }        
      },
      showSettingsDropdown: async function() {
        document.getElementById("settingsDropdown").classList.toggle("show");
      },
      showMailDropdown: async function() {
        document.getElementById("mailDropdown").classList.toggle("show");
      },
      documentClick(e) {
        let el = this.$refs.settingsDropdown
        let target = e.target
        if ( el !== (target) && !el.contains(target)) {
          this.settingsVisible = false
        }
        let el2 = this.$refs.mailDropdown
        let target2 = e.target
        if ( el2 !== (target) && !el2.contains(target2)) {
          this.mailVisible = false
        }
      },
      alphabetSort: async function(sites) {
        this.sites.sort((a, b) => a.value.name.localeCompare(b.value.name))
      },
      dateAddedSort: async function(sites) {
        await sites.sort((a, b) => a.value.dateAdded.localeCompare(b.value.dateAdded)),
        await sites.reverse()
      },
      selectSite: async function(radioSite) {
        if (this.radioKey == radioSite.key) {
          return
        }
        else {
          if (this.newText == true) {
            if (confirm("Discard Changes?") == true) {
              await this.parcelSelectedSite(radioSite);
            }
            else {
              return;
            }  
          }
          else {
            await this.parcelSelectedSite(radioSite); 
          }
        }
        this.newText = false;
      },
      parcelSelectedSite: async function(radioSite) {
        this.nameText = await radioSite.value.name;
        this.urlText = await radioSite.value.url;
        this.descriptionText = await radioSite.value.description;
        this.keywordsText = await radioSite.value.keywords;
        this.selCat1 = await radioSite.value.category1;
        let waitCat1 = await this.selCat1;
        await this.chooseSelectSubCategory1AList(waitCat1);
        await this.chooseSelectSubCategory1BList(waitCat1);
        this.selCat1SubA = await radioSite.value.category1SubCategoryA;
        this.selCat1SubB = await radioSite.value.category1SubCategoryB;
        this.selCat2 = await radioSite.value.category2;
        await this.chooseSelectSubCategory2AList(this.selCat2);
        await this.chooseSelectSubCategory2BList(this.selCat2);
        this.selCat2SubA = await radioSite.value.category2SubCategoryA;
        this.selCat2SubB = await radioSite.value.category2SubCategoryB; 
        this.dateAdded = await radioSite.value.dateAdded;
        this.verified = await radioSite.value.verified;
        if (this.verified == 'Yes') {
          this.verifiedIndicator = true
        }
        else if (this.verified == 'No') {
          this.verifiedIndicator = false
        };
        this.requestRemove = await radioSite.value.requestRemove;
        if (this.requestRemove == 'Yes') {
          this.requestRemoveIndicator = true
        }
        else if (this.requestRemove == 'No') {
          this.requestRemoveIndicator = false
        }
        this.radioKey = await radioSite.key;
      },
      highlightSelected: async function(key) {
        let site = this.sites.find (e => e.key === key)
        let sites = this.sites.map (e => Vue.set(e, 'active', false))
        Vue.set(site, 'active', !site.active)
      },
      toggleSiteDropdown(event) {
        event.currentTarget.classList.toggle('is-active');
      },
      formatDateAdded: function(date) {
        let dateOnly = moment(date).format('DD/M/YYYY');
        return dateOnly;
      },
      formatDateUpdated: function(date) {
        let dateAndTime = moment(date).format('Do MMMM YYYY h:mm a');
        return dateAndTime;
      },
      remaining: function() {
        var count = 0;
        this.sites.forEach((site) => {
          count += site.value.delete ? 1 : 0;
        });
        return count;
      },
      remove: async function() {
        let sitesToRemove = []
        await this.sites.forEach(async (site) => {
          if (site.value.delete) {
            sitesToRemove.push({ key: site.key, version: site.version });
          }
        });
        if (sitesToRemove.length > 0) {
          await safenetwork.deleteItems(sitesToRemove);
          await this.refreshList();
        }
      }
    },
    async created() {
      await this.loadTheme(this.theme);
      await safenetwork.authoriseAndConnect();
      await safenetwork.checkForMutableData();
      await safenetwork.getMutableDataAddress();
      await safenetwork.setMDPermissions();
      await safenetwork.linkToMutableData();
      //await this.getTheme();
      await this.showNameAndTag();
      await this.filterByCategory();
      await this.filSubCatOnLoad();
      await this.verBoxOnLoad();
      await this.alphabetSort();
      await document.addEventListener('click', this.documentClick)
    },
    destroyed() {
      document.removeEventListener('click', this.documentClick)
    }
  };
</script>

<style scoped>
{
  @import './main-admin.css';
}
</style>

<template>
  <body>
    <div id="mainDiv">
      <div id="topLeftBox"></div>
      <div id="titleBox">
        <div id="safeIcon"></div>
        <h1>SAFE Index</h1>
      </div>
      <div id ="savedBox">
        <div id="savedMessage">Saved</div>
      </div>
      <div id="mainEditBox">
        <form>
          <div class="editItem" style="padding-top:2vh">
            <h4>Name</h4>
            <div class="editItem">
              <input class="textBoxInput" type="text" id="textBox1" style="width:80%;" 
                v-model="nameText" @input="textChange(true)" maxlength="50" placeholder="">
              </input>
            </div>
          </div>
          <div class="editItem">
            <h4>URL</h4>
            <div class="editItem">
              <input class="textBoxInput" type="text" id="textBox2" style="width:85%" 
              v-model="urlText" @input="textChange(true)" size="30"  placeholder="">
              </input>
            </div>
          </div>
          <div class="editItem">
            <h4>Description</h4>
            <div class="editItem">
              <textarea class="textBoxInput" style="width:90%; height: 53px" type="text" id="textBox3" 
              v-model="descriptionText" @input="textChange(true)" maxlength="130" placeholder="">
              </textarea>
            </div>
          </div>
          <div class="editItem">
            <h4>Keywords</h4>
            <div class="editItem">
              <textarea class="textBoxInput" style="width:87%; height: 33px" type="text" id="textBox4" 
              v-model="keywordsText" @input="textChange(true)" maxlength="130" placeholder="">
              </textarea>
            </div>
          </div>
          <div id="categorySelBoxes">
            <div class="editItem">
              <h4>Category 1</h4>
              <div class="editItem">
                <div style="position: relative; width:140px">
                  <select class="menuInput" v-model="selCat1" v-on:change.prevent="chooseSelectSubCategory1AList(selCat1),
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
            </div>
            <div class="editItem">
              <h4>Sub Category 1</h4>
              <div class="editItem">
                <div style="position: relative; width:140px">
                  <select class="menuInput" id="subCategory1ASelectList" v-model="selCat1SubA" v-on:change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
              </div>
              <div class="editItem">
                <div style="position:relative; width:140px">
                  <select class="menuInput" id="subCategory1BSelectList" v-model="selCat1SubB" v-on:change.prevent="textChange(true)">
                    <option value="" disabled selected>-</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="category2SelBoxes">
              <div class="editItem">
                <h4>Category 2</h4>
                <div class="editItem">
                  <div style="position: relative; width:140px">
                    <select class="menuInput" v-model="selCat2" v-on:change="chooseSelectSubCategory2AList(selCat2),
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
              </div>
              <div class="editItem">
                <h4>Sub Category 2</h4>
                <div class="editItem">
                  <div style="position: relative; width:140px">
                    <select class="menuInput" id="subCategory2ASelectList" v-model="selCat2SubA" v-on:change.prevent="textChange(true)">
                      <option value="" disabled selected>-</option>
                    </select>
                  </div>
                </div>
                <div class="editItem">
                  <div style="position:relative; width:140px">
                    <select class="menuInput" id="subCategory2BSelectList" v-model="selCat2SubB" v-on:change.prevent="textChange(true)">
                      <option value="" disabled selected>-</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div id="verifiedBox">
              <div id="verifiedButton">
                <input class="button verified" type="submit" id="verifiedBtn" value="V" v-bind:class="{'verified-yes':verifiedIndicator}" 
                v-on:click.prevent="verifySite(verified)">
              </div>
            </div>
            <div style="display: none; position: absolute">{{radioKey}}
            </div>
          </div>
          <div id="editButtonsBox" class="editItem">
            <input class="button addSite" type="submit" id= "addBtn" value="Add Site" v-on:click.prevent="addSite">
            <input class="button saveChanges" type="submit" id= "editBtn" value="Save Changes" v-on:click.prevent="editSite">
          </div>
          <div id="clearBox">
            <input class="button clear" type="submit" id= "clearBtn" value="Clear" v-on:click.prevent="clearTextBox">
          </div>
        </form>
      </div>
      <div id="divider"></div>
      <div id="bottomLeftBox"></div>
      <div id="topRightBox">
        <div id="savedMessage2">
      <div class="settingsItem" style="padding-top: 3vh; height: 30px; width: 130px; margin: 2vh;"><b>Saved</b></div>
    </div>
        <div id="mailIcon">
          <a @click="mailVisible = !mailVisible" ref="mailDropdown"><img src="../assets/black-mail-icon-1.png" width="55"></a>
          <div id="mailDropdown" v-if="mailVisible" class="mailDropdown">
            <div id="innerMailDropdown" class="mailItem">
              <p>This Index is administered by David.</p>
              <br>
              <p>For any Queries or Requests please get in touch...</p>
              <br>
              <br>
              <br>
              <p>By <span class="button mail">SAFE Mail</span></p>
              <br>
              <br>
              <br>
              <p>Or <span class="button mail">Patter</span></p>
              <br>
            </div>
          </div>
        </div>
        
        <div id="settingsIcon">
          <a @click="settingsVisible = !settingsVisible" ref="settingsDropdown"><img src="../assets/black-settings-icon-1.png" width="30"></a>
          <div id="settingsDropdown" v-if="settingsVisible" class="settingsDropdown">
            <div class="settingsItem">
              <div style="position: absolute; top: 40%"><b>Neon</b>
              </div>
              <div style ="position: absolute; left: 52%">
                <label>
                  <input class="button preview" type="submit" name="radioSite" value="Preview" @click="loadTheme(neon)">
                </label>
                <label> 
                  <input type="checkbox" style="display:none" @click="saveTheme(neon)"><span class="button save">Save</span>
                </label>
              </div>
            </div>         
            <div class="settingsItem">
              <div style="position: absolute; top: 40%"><b>SAFE</b>
              </div>
              <div style ="position: absolute; left: 52%">
                <label>
                  <input class="button preview" type="submit" name="radioSite" value="Preview" @click="loadTheme(safe)">
                </label>
                <label> 
                  <input type="checkbox" style="display:none" @click="saveTheme(safe)"><span class="button save">Save</span>
                </label>
              </div>
            </div>
            <div class="settingsItem">
              <div style="position: absolute; top: 40%"><b>Mondrian</b>
              </div>
              <div style ="position: absolute; left: 52%">
                <label>
                  <input class="button preview" type="submit" name="radioSite" value="Preview" @click="loadTheme(mondrian)">
                </label>
                <label> 
                  <input type="checkbox" style="display:none" @click="saveTheme(mondrian)"><span class="button save">Save</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="filterBox">
        <div><h3>Filter</h3></div>
        <div id="filCategoryBox" class="filterCategoryBox" style="top: 37%; left:6%;">
          <form>
            <select class="menuInput" v-model="filCat" v-on:change="filterByCategory(filCat, 'filCat')">
              <option value="" disabled selected>Category</option>
              <option value="All">All</option>
              <option value="Information">Information</option>
              <option value="Tools">Tools</option>
              <option value="All Media">Media</option>
              <option value="Social">Social</option>
              <option value="Trade">Trade</option>
            </select>
          </form>
        </div>
        <div id="filSubCategoryBox" class="filterCategoryBox" style="top: 67%; left:6%;">
          <form>
            <select class="menuInput" id="subCategoryFilterList" v-model="filSubCat" v-on:change.prevent="filterBySubCategory(filSubCat, 'filCat')">
              <option value="" disabled selected>Sub Category</option>
            </select>
          </form>
        </div>
        <div id="filVerifiedBox" class="filterCategoryBox" style="top: 52%; left:52%;">
          <form>
            <select class="menuInput" id="verifiedFilterList" v-model="verSel" v-on:change.prevent="filterByVerified(verSel)">
              <option value="default" disabled selected>Status</option>
              <option value="Verified">Verified</option>
              <option value="Unverified">Unverified</option>
              <option value="To Remove">To Remove</option>
              <option value="All" >All</option>
            </select>
          </form>
        </div>
      </div>
      <div id="sortBox">
        <input class="button AZ buttonSort" type="submit" value="A-Z" v-on:click.prevent="alphabetSort(sites)">
        <input class="button DMY buttonSort" type="submit" value="D/M/Y" v-on:click.prevent="dateAddedSort(sites)">
      </div>     
      <div id="sitesList">
        <form>
          <ul style="list-style: none;">
            <li v-for="site in sites" :key=site.key v-bind:class="{'delete-true' : site.value.delete}">
              <div class="site" v-bind:class="{'selected-true' : site.active}">
                <div class="basicSite">             
                  <div class= "siteItem" style="width: 60%; height: 50px;"><h3>{{site.value.name}}</h3></div>
                  <div class= "siteItem" style="padding: 6px; font-size: 14px; font-style: oblique">{{site.value.url}}</div>
                  <div class= "siteItem" style="padding: 8px; padding-left: 2px" >{{site.value.description}}</div>
                  <div id="siteButtons">
                    <label>
                      <input class="button edit" type="submit" name="radioSite" value="Edit" v-on:click.prevent="selectSite(site), highlightSelected(site.key)">
                    </label>
                    <label> 
                      <input type="checkbox" v-model="site.value.delete" style="display:none"><span class="button remove">Remove</span>
                    </label> 
                  </div>
                </div>
                <div @click="toggleSiteDropdown($event)" class="dropdownButton">
                  <label>
                    <div class= "siteItem">></div>
                  </label>
                  <div class= "siteItem"><b>Added: </b>{{formatDateAdded(site.value.dateAdded)}}</div>
                  <div class= "siteItem"><b>Updated: </b>{{formatDateUpdated(site.value.dateUpdated)}}</div>
                  <div class= "siteItem"><b>Verified: </b>{{site.value.verified}}</div>
                  <div class= "siteItem">
                    <div class= "siteItem"><b>Category 1: </b>
                      <span>{{site.value.category1}}</span><span> > </span>
                      <span>{{site.value.category1SubCategoryA}}</span><span>, </span>
                      <span>{{site.value.category1SubCategoryB}}</span>
                    </div>
                    <div class= "siteItem"><b>Category 2: </b>
                      <span>{{site.value.category2}}</span><span> > </span>
                      <span>{{site.value.category2SubCategoryA}}</span><span>, </span>
                      <span>{{site.value.category2SubCategoryB}}</span>
                    </div>
                    <div class= "siteItem"><b>Keywords: </b>
                      <span>{{site.value.keywords}}</span>
                    </div>
                    <div class= "siteItem"><b>Removal Requested: </b>
                      <span>{{site.value.requestRemove}}</span>
                    </div>
                  </div>
                </div>
              </div> 
            </li>
          </ul> 
        </form>
      </div>
      <div id="totalBox">{{sites.length}} Total</div>
      <div id="deleteSelectedBox">
        <span style="padding: 2vw">{{remaining()}} Selected </span> 
        <span> <input class="button deleteSelected" type="submit" v-on:click.prevent="remove" value = "Delete Selected"></input></span>
      </div> 
      <div style="position:absolute; top: 10vh; width: 45%; font-size: 11px; height: 4%; background-color:pink">{{nameAndTag}}
      </div>
    </div>
  </body>
</template>