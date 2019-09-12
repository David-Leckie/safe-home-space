

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
    }
  },
  methods: {
    loadTheme(theme) {
      for (var i=0; i < document.styleSheets.length; i++) {
        document.styleSheets[i].disabled=true;

        document.styleSheets[0].disabled=false;
        document.styleSheets[1].disabled=false;
        document.styleSheets[2].disabled=false;
        document.styleSheets[3].disabled=false;
        document.styleSheets[4].disabled=false;
        document.styleSheets[5].disabled=false;
        document.styleSheets[6].disabled=false;
        document.styleSheets[13].disabled=false;
      };
      if (theme == "neon") {
        document.styleSheets[15].disabled=false;
      }
      else if (theme == "dark") {
        document.styleSheets[16].disabled=false;
      }
      else if (theme == "ocean") {
        document.styleSheets[17].disabled=false;
      }
      else {
        document.styleSheets[15].disabled=false;
      }
    },
    timeout: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    saveTheme: async function(theme) {
      alert("Custom Themes Coming Soon!")
    },
    homeAlert: async function() {
      alert("Home!\n\nYou're Already There!")
    },
    setSearchTerms: async function(text, category) {
      this.searchText = text;
      this.pushCategory = category; 
      this.$router.push({ name: "search-results-page",  params: {passedText: this.searchText, passedCat: this.pushCategory}})
    },
    documentClick(e) {
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
  <div id="homeIcon" @click.prevent="homeAlert()">
  </div>
  <div id="settingsIcon" @click.prevent="saveTheme()">
  </div>
  <div id="safeLogo"></div>
  <div id="title"><h1 class="heading1Size">SAFE Network</h1></div>
  <div id="addMySiteButton" class="colour2">
    <b>+ Add My Site</b>
  </div>
  <div id="searchBoxWrapper">
    <form>
      <button type="submit" id="searchButton" v-on:click.prevent="setSearchTerms(searchText, '/')">
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
        <div @click.prevent="setSearchTerms('/','Information')" class="subCategoryPopUpMenuItem">All</div>
        <div @click.prevent="setSearchTerms('/','SAFE')" class="subCategoryPopUpMenuItem">SAFE</div>
        <div @click.prevent="setSearchTerms('/','Tech')" class="subCategoryPopUpMenuItem">Tech</div>
        <div @click.prevent="setSearchTerms('/','Science')" class="subCategoryPopUpMenuItem">Science</div>
        <div @click.prevent="setSearchTerms('/','Geography')" class="subCategoryPopUpMenuItem">Geography</div>
        <div @click.prevent="setSearchTerms('/','Society')" class="subCategoryPopUpMenuItem">Society</div>
        <div @click.prevent="setSearchTerms('/','Media')" class="subCategoryPopUpMenuItem">Media</div>
        <div @click.prevent="setSearchTerms('/','Arts')" class="subCategoryPopUpMenuItem">Arts</div>
        <div @click.prevent="setSearchTerms('/','General')" class="subCategoryPopUpMenuItem" style="border-style: none;">General</div>
      </div>
    </div>
    <div id="workButton" class="button colour4" @click.prevent="categoriesList2Visible = !categoriesList2Visible" ref="categoriesList2Dropdown">
      <b>Work</b>
      <div id="categoriesList2Dropdown" v-if="categoriesList2Visible" class="subCategoriesPopUpMenu">
        <div @click.prevent="setSearchTerms('/','Tools')" class="subCategoryPopUpMenuItem">All</div>
        <div @click.prevent="setSearchTerms('/','Storage')" class="subCategoryPopUpMenuItem">Storage</div>
        <div @click.prevent="setSearchTerms('/','Computing')" class="subCategoryPopUpMenuItem">Computing</div>
        <div @click.prevent="setSearchTerms('/','Organisation')" class="subCategoryPopUpMenuItem">Organisation</div>
        <div @click.prevent="setSearchTerms('/','Finance')" class="subCategoryPopUpMenuItem">Finance</div>
        <div @click.prevent="setSearchTerms('/','Language')" class="subCategoryPopUpMenuItem">Language</div>
        <div @click.prevent="setSearchTerms('/','Visual')" class="subCategoryPopUpMenuItem">Visual</div>
        <div @click.prevent="setSearchTerms('/','Sound')" class="subCategoryPopUpMenuItem">Sound</div>
        <div @click.prevent="setSearchTerms('/','Other Tools')" class="subCategoryPopUpMenuItem"style="border-style: none;">Other</div>
      </div>
    </div>
    <div id="playButton" class="button colour2" @click.prevent="categoriesList3Visible = !categoriesList3Visible" ref="categoriesList3Dropdown">
      <b>Play</b>
      <div id="categoriesList3Dropdown" v-if="categoriesList3Visible" class="subCategoriesPopUpMenu">
        <div @click.prevent="setSearchTerms('/','All Media')" class="subCategoryPopUpMenuItem">All</div>
        <div @click.prevent="setSearchTerms('/','Music')" class="subCategoryPopUpMenuItem">Music</div>
        <div @click.prevent="setSearchTerms('/','Video')" class="subCategoryPopUpMenuItem">Video</div>
        <div @click.prevent="setSearchTerms('/','Games')" class="subCategoryPopUpMenuItem">Games</div>
        <div @click.prevent="setSearchTerms('/','Art')" class="subCategoryPopUpMenuItem">Art</div>
        <div @click.prevent="setSearchTerms('/','Words')" class="subCategoryPopUpMenuItem">Words</div>
        <div @click.prevent="setSearchTerms('/','Kids')" class="subCategoryPopUpMenuItem">Kids</div>
        <div @click.prevent="setSearchTerms('/','Other Media')" class="subCategoryPopUpMenuItem"style="border-style: none;">Other</div>
      </div>
    </div>
    <div id="connectButton" class="button wide colour1" @click.prevent="categoriesList4Visible = !categoriesList4Visible" ref="categoriesList4Dropdown">
      <b>Connect</b>
      <div id="categoriesList4Dropdown" v-if="categoriesList4Visible" class="subCategoriesPopUpMenu">
        <div @click.prevent="setSearchTerms('/','Social')" class="subCategoryPopUpMenuItem">All</div>
        <div @click.prevent="setSearchTerms('/','People')" class="subCategoryPopUpMenuItem">People</div>
        <div @click.prevent="setSearchTerms('/','Mail')" class="subCategoryPopUpMenuItem">Mail</div>
        <div @click.prevent="setSearchTerms('/','Chat')" class="subCategoryPopUpMenuItem">Chat</div>
        <div @click.prevent="setSearchTerms('/','Blog')" class="subCategoryPopUpMenuItem">Blog</div>
        <div @click.prevent="setSearchTerms('/','Forums')" class="subCategoryPopUpMenuItem">Forums</div>
        <div @click.prevent="setSearchTerms('/','Community')" class="subCategoryPopUpMenuItem">Community</div>
        <div @click.prevent="setSearchTerms('/','Other Social')" class="subCategoryPopUpMenuItem"style="border-style: none;">Other</div>
      </div> 
    </div>
    <div id="tradeButton" class="button wide colour3" @click.prevent="categoriesList5Visible = !categoriesList5Visible" ref="categoriesList5Dropdown">
      <b>Trade</b>  
      <div id="categoriesList5Dropdown" v-if="categoriesList5Visible" class="subCategoriesPopUpMenu">
        <div @click.prevent="setSearchTerms('/','Trade')" class="subCategoryPopUpMenuItem">All</div>
        <div @click.prevent="setSearchTerms('/','Markets')" class="subCategoryPopUpMenuItem">Markets</div>
        <div @click.prevent="setSearchTerms('/','Retail')" class="subCategoryPopUpMenuItem">Retail</div>
        <div @click.prevent="setSearchTerms('/','Services')" class="subCategoryPopUpMenuItem">Services</div>
        <div @click.prevent="setSearchTerms('/','Local')" class="subCategoryPopUpMenuItem">Local</div>
        <div @click.prevent="setSearchTerms('/','Software')" class="subCategoryPopUpMenuItem">Software</div>
        <div @click.prevent="setSearchTerms('/','Currency')" class="subCategoryPopUpMenuItem">Currency</div>
        <div @click.prevent="setSearchTerms('/','Other Trade')" class="subCategoryPopUpMenuItem"style="border-style: none;">Other</div>
      </div>
    </div>
  </div> 
</div>
</template>
