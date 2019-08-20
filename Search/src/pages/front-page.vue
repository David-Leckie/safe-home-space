

<script>
import safenetwork from '../safenetwork_interface.js';
export default {
  name: 'Home',
  data () {
    return {
      mailVisible: false, settingsVisible: false, theme: 'neon',
      neon: 'neon', dark: 'dark', ocean: 'ocean', categoriesList1Visible: false,
      categoriesList2Visible: false, categoriesList3Visible: false, 
      categoriesList4Visible: false, categoriesList5Visible: false, 
      searchText: '', pushCategory: '',
      //sites: [], testText: '', searchBoxText: '', id: ''

    }
  },
  methods: {
    /*getTheme: async function() {
        this.theme = await safenetwork.getTheme();
        await this.loadTheme(this.theme)
      },*/
      loadTheme(theme) {
        for (var i=0; i < document.styleSheets.length; i++) {
          document.styleSheets[i].disabled=true;
          
          document.styleSheets[0].disabled=false;
          document.styleSheets[1].disabled=false;
          document.styleSheets[2].disabled=false;
          document.styleSheets[3].disabled=false;
          document.styleSheets[4].disabled=false;
          document.styleSheets[5].disabled=false;
        };
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
          document.styleSheets[6].disabled=false;
        }
      },
      timeout: function(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
          },
      saveTheme: async function(theme) {
        /*let themeVersion = await safenetwork.getThemeVersion();
          await safenetwork.updateTheme(theme, themeVersion);
          let savedMessage = document.getElementById("savedMessage2");
          savedMessage.className = "show";
          setTimeout(function(){ savedMessage.className = savedMessage.className.replace("show", ""); },600);
          function timeout(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
          }
          await this.timeout(600);
          await this.getTheme()*/
          alert("Custom Themes Coming Soon!")
      },
      homeAlert: async function() {
          alert("Home!\n\nYou're Already There!")
      },
      /*showSettingsDropdown: async function() {
        document.getElementById("settingsDropdown").classList.toggle("show");
      },
      showMailDropdown: async function() {
        document.getElementById("mailDropdown").classList.toggle("show");
      },*/
      showCategoriesList1Dropdown: async function() {
        document.getElementById("categoriesList1Dropdown").classList.toggle("show");
      },
      showCategoriesList2Dropdown: async function() {
        document.getElementById("categoriesList2Dropdown").classList.toggle("show");
      },
      showCategoriesList3Dropdown: async function() {
        document.getElementById("categoriesList3Dropdown").classList.toggle("show");
      },
      showCategoriesList4Dropdown: async function() {
        document.getElementById("categoriesList4Dropdown").classList.toggle("show");
      },
      showCategoriesList5Dropdown: async function() {
        document.getElementById("categoriesList5Dropdown").classList.toggle("show");
      },
      emitGlobalClickEvent: async function(text, category) {
        this.searchText = text;
        this.pushCategory = category;
      //eventBus.$emit('text-event', this.searchText);
      
      this.$router.push({ name: "search-results-page",  params: {passedText: this.searchText, passedCat: this.pushCategory}})
    },
      documentClick(e) {
        /*let el = this.$refs.settingsDropdown
        let target = e.target
        if ( el !== (target) && !el.contains(target)) {
          this.settingsVisible = false
        }
        /*let el2 = this.$refs.mailDropdown
        let target2 = e.target
        if ( el2 !== (target) && !el2.contains(target2)) {
          this.mailVisible = false
        }*/
        let el = this.$refs.categoriesList1Dropdown
        let target = e.target
        if ( el !== (target) && !el.contains(target)) {
          this.categoriesList1Visible = false
        }
        let el4 = this.$refs.categoriesList2Dropdown
        let target4 = e.target
        if ( el4 !== (target) && !el4.contains(target4)) {
          this.categoriesList2Visible = false
        }
        let el5 = this.$refs.categoriesList3Dropdown
        let target5 = e.target
        if ( el5 !== (target) && !el5.contains(target5)) {
          this.categoriesList3Visible = false
        }
        let el6 = this.$refs.categoriesList4Dropdown
        let target6 = e.target
        if ( el6 !== (target) && !el6.contains(target6)) {
          this.categoriesList4Visible = false
        }
        let el7 = this.$refs.categoriesList5Dropdown
        let target7 = e.target
        if ( el7 !== (target) && !el7.contains(target7)) {
          this.categoriesList5Visible = false
        }
      }
  },
  async created() {
    await this.loadTheme(this.theme);
    await safenetwork.authoriseAndConnect();
    await safenetwork.linkToMutableData();
    //await this.getTheme();
    await document.addEventListener('click', this.documentClick)
    },
    destroyed() {
      document.removeEventListener('click', this.documentClick)
    }
}
</script>

<style scoped>

</style>

<template>
<div id="mainDiv">
  <div id="homeIcon">
    <a @click.prevent="homeAlert()"></a>
  </div>
  <div id="settingsIcon">
    <!--<a @click="settingsVisible = !settingsVisible" ref="settingsDropdown"><img src="../media/settings-icon-white-centre.png" width="38"></a>-->
    <a @click.prevent="saveTheme()"></a>
  </div>
  <div id="safeLogo"></div>
  <div id="title"><h1 class="heading1Size">SAFE Network</h1></div>
  <div id="addMySiteButton" class="colour2">
    <b>+ Add My Site</b>
  </div>
  <div id="searchBoxWrapper">
    <form>
      <button type="submit" id="searchButton" v-on:click.prevent="emitGlobalClickEvent(searchText, '/')">
        <b>Search</b>
      </button>
      <input type="text" id="searchBox" v-model="searchText"
        maxlength="50" placeholder="">
      </input>
    </form>
  </div>
  
  <div id="categoryButtonsWrapper">
      <div id="learnButton" class="button colour3" @click.prevent="categoriesList1Visible = !categoriesList1Visible"  ref="categoriesList1Dropdown">
        <b>Learn</b>
        <div id="categoriesList1Dropdown" v-if="categoriesList1Visible" class="subCategoriesPopUpMenu">
          <div @click="emitGlobalClickEvent('/','Information')" class="subCategoryPopUpMenuItem" 
            >All</div>
          <div @click="emitGlobalClickEvent('/','SAFE')" class="subCategoryPopUpMenuItem">SAFE</div>
          <div @click="emitGlobalClickEvent('/','Tech')" class="subCategoryPopUpMenuItem">Tech</div>
          <div @click="emitGlobalClickEvent('/','Science')" class="subCategoryPopUpMenuItem">Science</div>
          <div @click="emitGlobalClickEvent('/','Geography')" class="subCategoryPopUpMenuItem">Geography</div>
          <div @click="emitGlobalClickEvent('/','Society')" class="subCategoryPopUpMenuItem">Society</div>
          <div @click="emitGlobalClickEvent('/','Media')" class="subCategoryPopUpMenuItem">Media</div>
          <div @click="emitGlobalClickEvent('/','Arts')" class="subCategoryPopUpMenuItem">Arts</div>
          <div @click="emitGlobalClickEvent('/','General')" class="subCategoryPopUpMenuItem"
            style="border-style: none;">General</div>
        </div>
      </div>
      <div id="workButton" class="button colour4" @click.prevent="categoriesList2Visible = !categoriesList2Visible" ref="categoriesList2Dropdown">
        <b>Work</b>
        <div id="categoriesList2Dropdown" v-if="categoriesList2Visible" class="subCategoriesPopUpMenu">
          <div @click="emitGlobalClickEvent('/','Tools')" class="subCategoryPopUpMenuItem">All</div>
          <div @click="emitGlobalClickEvent('/','Storage')" class="subCategoryPopUpMenuItem">Storage</div>
          <div @click="emitGlobalClickEvent('/','Computing')" class="subCategoryPopUpMenuItem">Computing</div>
          <div @click="emitGlobalClickEvent('/','Organisation')" class="subCategoryPopUpMenuItem">Organisation</div>
          <div @click="emitGlobalClickEvent('/','Finance')" class="subCategoryPopUpMenuItem">Finance</div>
          <div @click="emitGlobalClickEvent('/','Language')" class="subCategoryPopUpMenuItem">Language</div>
          <div @click="emitGlobalClickEvent('/','Visual')" class="subCategoryPopUpMenuItem">Visual</div>
          <div @click="emitGlobalClickEvent('/','Sound')" class="subCategoryPopUpMenuItem">Sound</div>
          <div @click="emitGlobalClickEvent('/','Other Tools')" class="subCategoryPopUpMenuItem"
          style="border-style: none;">Other</div>
        </div>
      </div>
      <div id="playButton" class="button colour2" @click.prevent="categoriesList3Visible = !categoriesList3Visible" ref="categoriesList3Dropdown">
        <b>Play</b>
        <div id="categoriesList3Dropdown" v-if="categoriesList3Visible" class="subCategoriesPopUpMenu">
          <div @click="emitGlobalClickEvent('/','All Media')" class="subCategoryPopUpMenuItem">All</div>
          <div @click="emitGlobalClickEvent('/','Music')" class="subCategoryPopUpMenuItem">Music</div>
          <div @click="emitGlobalClickEvent('/','Video')" class="subCategoryPopUpMenuItem">Video</div>
          <div @click="emitGlobalClickEvent('/','Games')" class="subCategoryPopUpMenuItem">Games</div>
          <div @click="emitGlobalClickEvent('/','Art')" class="subCategoryPopUpMenuItem">Art</div>
          <div @click="emitGlobalClickEvent('/','Words')" class="subCategoryPopUpMenuItem">Words</div>
          <div @click="emitGlobalClickEvent('/','Kids')" class="subCategoryPopUpMenuItem">Kids</div>
          <div @click="emitGlobalClickEvent('/','Other Media')" class="subCategoryPopUpMenuItem"
          style="border-style: none;">Other</div>
        </div>
      </div>
      <div id="connectButton" class="button wide colour1" @click.prevent="categoriesList4Visible = !categoriesList4Visible" ref="categoriesList4Dropdown">
        <b>Connect</b>
        <div id="categoriesList4Dropdown" v-if="categoriesList4Visible" class="subCategoriesPopUpMenu">
          <div @click="emitGlobalClickEvent('/','Social')" class="subCategoryPopUpMenuItem">All</div>
          <div @click="emitGlobalClickEvent('/','People')" class="subCategoryPopUpMenuItem">People</div>
          <div @click="emitGlobalClickEvent('/','Mail')" class="subCategoryPopUpMenuItem">Mail</div>
          <div @click="emitGlobalClickEvent('/','Chat')" class="subCategoryPopUpMenuItem">Chat</div>
          <div @click="emitGlobalClickEvent('/','Blog')" class="subCategoryPopUpMenuItem">Blog</div>
          <div @click="emitGlobalClickEvent('/','Forums')" class="subCategoryPopUpMenuItem">Forums</div>
          <div @click="emitGlobalClickEvent('/','Community')" class="subCategoryPopUpMenuItem">Community</div>
          <div @click="emitGlobalClickEvent('/','Other Social')" class="subCategoryPopUpMenuItem"
          style="border-style: none;">Other</div>
        </div> 
      </div>
      <div id="tradeButton" class="button wide colour3" @click.prevent="categoriesList5Visible = !categoriesList5Visible" ref="categoriesList5Dropdown">
        <b>Trade</b>  
        <div id="categoriesList5Dropdown" v-if="categoriesList5Visible" class="subCategoriesPopUpMenu">
          <div @click="emitGlobalClickEvent('/','Trade')" class="subCategoryPopUpMenuItem">All</div>
          <div @click="emitGlobalClickEvent('/','Markets')" class="subCategoryPopUpMenuItem">Markets</div>
          <div @click="emitGlobalClickEvent('/','Retail')" class="subCategoryPopUpMenuItem">Retail</div>
          <div @click="emitGlobalClickEvent('/','Services')" class="subCategoryPopUpMenuItem">Services</div>
          <div @click="emitGlobalClickEvent('/','Local')" class="subCategoryPopUpMenuItem">Local</div>
          <div @click="emitGlobalClickEvent('/','Software')" class="subCategoryPopUpMenuItem">Software</div>
          <div @click="emitGlobalClickEvent('/','Currency')" class="subCategoryPopUpMenuItem">Currency</div>
          <div @click="emitGlobalClickEvent('/','Other Trade')" class="subCategoryPopUpMenuItem"
          style="border-style: none;">Other</div>
        </div>
      </div>
    </div> 
      <!--<div id="settingsDropdown" v-if="settingsVisible" class="settingsDropdown">
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
      </div>-->
    
  
</div>
</template>
