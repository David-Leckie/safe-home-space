<script>
import safenetwork from '../safenetwork_interface.js'
/*import searchbox from '../components/searchbox.vue'*/
export default {
  /*components: {
    searchbox
  },*/
  name: 'search-results',
  data () {
    return {
      mailVisible: false, settingsVisible: false, theme: 'neon', verifiedIndicator: false,
      neon: 'neon', safe: 'safe', mondrian: 'mondrian', categoryButtonsWrapperIndicator: false,
      categoriesList1Visible: false,
      categoriesList2Visible: false, categoriesList3Visible: false, 
      categoriesList4Visible: false, categoriesList5Visible: false, 
      sites: [], filCat: '', searchText: '', passedText: '', passedCat: '', id: ''
    }
  },
  methods: {
    primeSearchBox: async function(passedText) {
      if (passedText == '/') {
        this.searchText = ''
      }
      else {
        this.searchText = await passedText;
      }
    },
    loadTheme(theme) {
      for (var i=0; i < document.styleSheets.length; i++) {
        document.styleSheets[i].disabled=true
        
        document.styleSheets[7].disabled=false;
        document.styleSheets[8].disabled=false;
        document.styleSheets[9].disabled=false;
        document.styleSheets[10].disabled=false;
        document.styleSheets[11].disabled=false;
        document.styleSheets[12].disabled=false;
        document.styleSheets[13].disabled=false;
        document.styleSheets[14].disabled=false;
      };
      if (theme == "neon") {
        document.styleSheets[15].disabled=false;
      }
      else if (theme == "safe") {
        document.styleSheets[16].disabled=false;
      }
      else if (theme == "mondrian") {
        document.styleSheets[17].disabled=false;
      }
      else {
        document.styleSheets[15].disabled=false;
      }
    },
    timeout: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    noResultsToShow: async function(returnedSites) {
      let nothingToShow = document.getElementById("noSitesToShow");
      nothingToShow.className = nothingToShow.className.replace("show", "");
      let sitesLength = await returnedSites.length;
      console.log(sitesLength)
      if (sitesLength == 0) {
        nothingToShow.className = "show";
      }
      else {
        return
      }
    },
    saveTheme: async function(theme) {
      alert("Custom Themes Coming Soon!")
    },
    showCategoryMenu: async function() {
      let categoryButtonsWrapper = document.getElementById("categoryButtonsWrapper");
      categoryButtonsWrapper.classList.toggle('show');
    },
    setSearchTerms: async function(text, category) {
      this.searchText = text;
      this.pushCategory = category; 
      this.$router.push({ name: "search-results-page",  params: {passedText: this.searchText, passedCat: this.pushCategory}})
      await this.handlePassedSearchTerms();
    },
    handlePassedSearchTerms: async function() {
      this.passedText = await this.$route.params.passedText;
      this.passedCat = await this.$route.params.passedCat;
      await this.primeSearchBox(this.passedText);
      if (this.passedText == '/') {
        await this.filterByCategory(this.passedCat)
      }
      else {
        await this.filterBySearchTerm(this.passedText);
      }
    },
    filterByCategory: async function(filCat) {
      this.searchText = ''
      try {
        let noNetworkConnection = document.getElementById("noNetworkConnection");
        noNetworkConnection.className = noNetworkConnection.className.replace("show", "");
        let nothingToShow = document.getElementById("noSitesToShow");
        nothingToShow.className = nothingToShow.className.replace("show", "");
        let searchingMessage = document.getElementById("searchingMessage");
        searchingMessage.className = "show";
        let uvsites = await safenetwork.getItems();
        let ufsites = await uvsites.filter(uvsite => (uvsite.value.verified == "Yes"));
        this.sites = await ufsites.filter(ufsite => (ufsite.value.category1 == filCat || ufsite.value.category2 == filCat
          || ufsite.value.category1SubCategoryA == filCat || ufsite.value.category1SubCategoryB == filCat ||
          ufsite.value.category2SubCategoryA == filCat || ufsite.value.category2SubCategoryB == filCat));
        await this.noResultsToShow(this.sites);
        searchingMessage.className = searchingMessage.className.replace("show", "");
        return this.sites
      }
      catch (err) {
        let noNetworkConnection = document.getElementById("noNetworkConnection");
        searchingMessage.className = searchingMessage.className.replace("show", "");
        noNetworkConnection.className = noNetworkConnection.className.replace("", "show");
        return
      }
    },
    filterBySearchTerm: async function(xText) {
      try {
        let noNetworkConnection = document.getElementById("noNetworkConnection");
        noNetworkConnection.className = noNetworkConnection.className.replace("show", "");
        let nothingToShow = document.getElementById("noSitesToShow");
        nothingToShow.className = nothingToShow.className.replace("show", "");
        let searchingMessage = document.getElementById("searchingMessage");
        searchingMessage.className = "show";
        let uvsites = await safenetwork.getItems();
        let ufsites = await uvsites.filter(uvsite => (uvsite.value.verified == "Yes"));
        var searchTextArray = xText.split(" ");
        let filteredSites1 = await ufsites.filter((ufsite) => {
          let position2 = ufsite.value.name.search(new RegExp(searchTextArray[0], "i"));
          let position1 = ufsite.value.description.search(new RegExp(searchTextArray[0], "i"));
          let position3 = ufsite.value.keywords.search(new RegExp(searchTextArray[0], "i"));
          if ((position1 + position2 + position3) > -3) {
            return ufsite
          }
        });
        let filteredSites2 = await filteredSites1.filter((filSite1) => {
          let position2 = filSite1.value.name.search(new RegExp(searchTextArray[1], "i"));
          let position1 = filSite1.value.description.search(new RegExp(searchTextArray[1], "i"));
          let position3 = filSite1.value.keywords.search(new RegExp(searchTextArray[1], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite1
          }
        });
        let filteredSites3 = await filteredSites2.filter((filSite2) => {
          let position2 = filSite2.value.name.search(new RegExp(searchTextArray[2], "i"));
          let position1 = filSite2.value.description.search(new RegExp(searchTextArray[2], "i"));
          let position3 = filSite2.value.keywords.search(new RegExp(searchTextArray[2], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite2
          }
        });
        let filteredSites4 = await filteredSites3.filter((filSite3) => {
          let position2 = filSite3.value.name.search(new RegExp(searchTextArray[3], "i"));
          let position1 = filSite3.value.description.search(new RegExp(searchTextArray[3], "i"));
          let position3 = filSite3.value.keywords.search(new RegExp(searchTextArray[3], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite3
          }
        });
        let filteredSites5 = await filteredSites4.filter((filSite4) => {
          let position2 = filSite4.value.name.search(new RegExp(searchTextArray[4], "i"));
          let position1 = filSite4.value.description.search(new RegExp(searchTextArray[4], "i"));
          let position3 = filSite4.value.keywords.search(new RegExp(searchTextArray[4], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite4
          }
        });
        let filteredSites6 = await filteredSites5.filter((filSite5) => {
          let position2 = filSite5.value.name.search(new RegExp(searchTextArray[5], "i"));
          let position1 = filSite5.value.description.search(new RegExp(searchTextArray[5], "i"));
          let position3 = filSite5.value.keywords.search(new RegExp(searchTextArray[5], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite5
          }
        });
        let filteredSites7 = await filteredSites6.filter((filSite6) => {
          let position2 = filSite6.value.name.search(new RegExp(searchTextArray[6], "i"));
          let position1 = filSite6.value.description.search(new RegExp(searchTextArray[6], "i"));
          let position3 = filSite6.value.keywords.search(new RegExp(searchTextArray[6], "i"));
          if ((position1 + position2 + position3) > -3) {
            return filSite6
          }
        });

        let searchWords = await searchTextArray.length;
        if (searchWords > 1) {
          window.filteredSites8 = await ufsites.filter((ufsite) => {
            let position2 = ufsite.value.name.search(new RegExp(searchTextArray[1], "i"));
            let position1 = ufsite.value.description.search(new RegExp(searchTextArray[1], "i"));
            let position3 = ufsite.value.keywords.search(new RegExp(searchTextArray[1], "i"));
            if ((position1 + position2 + position3) > -3) {
              return ufsite
            }
        })}
        else {
          window.filteredSites8 = []
        };
        if (searchWords > 2) {
          window.filteredSites9 = await ufsites.filter((ufsite) => {
            let position2 = ufsite.value.name.search(new RegExp(searchTextArray[2], "i"));
            let position1 = ufsite.value.description.search(new RegExp(searchTextArray[2], "i"));
            let position3 = ufsite.value.keywords.search(new RegExp(searchTextArray[2], "i"));
            if ((position1 + position2 + position3) > -3) {
              return ufsite
            }
        })}
        else {
            window.filteredSites9 = []
        };
        if (searchWords > 3) {
          window.filteredSites10 = await ufsites.filter((ufsite) => {
            let position2 = ufsite.value.name.search(new RegExp(searchTextArray[3], "i"));
            let position1 = ufsite.value.description.search(new RegExp(searchTextArray[3], "i"));
            let position3 = ufsite.value.keywords.search(new RegExp(searchTextArray[3], "i"));
            if ((position1 + position2 + position3) > -3) {
              return ufsite
            }
        })}
        else {
            window.filteredSites10 = []
        };
        this.sites = await Array.from(new Set(filteredSites7.concat(filteredSites6, filteredSites5, filteredSites4, filteredSites3,
        filteredSites2, filteredSites1, window.filteredSites8, window.filteredSites9, window.filteredSites10)));
        await this.noResultsToShow(this.sites);
        searchingMessage.className = searchingMessage.className.replace("show", "");
      }
      catch (err) {
        searchingMessage.className = searchingMessage.className.replace("show", "");
        let noNetworkConnection = document.getElementById("noNetworkConnection");
        noNetworkConnection.className = noNetworkConnection.className.replace("", "show");
        return
      }
    },
    alphabetSort: async function(sites) {
      this.sites.sort((a, b) => a.value.name.localeCompare(b.value.name))
    },
    dateAddedSort: async function(sites) {
      await sites.sort((a, b) => a.value.dateAdded.localeCompare(b.value.dateAdded)),
      await sites.reverse()
    },
    documentClick(e) {
      try {
        let el = this.$refs.categoriesList1Dropdown
        let target = e.target
        if ( el!== (target) && !el.contains(target)) {
          this.categoriesList1Visible = false
        }
        let el2 = this.$refs.categoryButtonsWrapper;
        let el3 = this.$refs.categoryButtonsWrapper2;
        let target2 = e.target;
        if (el2 !== (target2) && !el2.contains(target2) && el3 !== (target2) && !el3.contains(target2)) { 
          let categoryButtonsWrapper = document.getElementById("categoryButtonsWrapper");
          categoryButtonsWrapper.className = categoryButtonsWrapper.className.replace("show", "");
        }
        let el4 = this.$refs.categoriesList2Dropdown
        let target4 = e.target
        if ( el4 !== (target4) && !el4.contains(target4)) {
          this.categoriesList2Visible = false
        }
        let el5 = this.$refs.categoriesList3Dropdown
        let target5 = e.target
        if ( el5 !== (target5) && !el5.contains(target5)) {
          this.categoriesList3Visible = false
        }
        let el6 = this.$refs.categoriesList4Dropdown
        let target6 = e.target
        if ( el6 !== (target6) && !el6.contains(target6)) {
          this.categoriesList4Visible = false
        }
        let el7 = this.$refs.categoriesList5Dropdown
        let target7 = e.target
        if ( el7 !== (target7) && !el7.contains(target7)) {
          this.categoriesList5Visible = false
        }
      }
      catch (err) {
        return
      }
    }
  },
  async created() {
    await this.loadTheme(this.theme);
    await safenetwork.authoriseAndConnect();
    await safenetwork.linkToMutableData();
    await this.handlePassedSearchTerms();
    await document.addEventListener('click', this.documentClick);
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
  <div id="fixedElements">
    <a href="../home/">
    <div id="homeIcon"></div>
    </a>
    <div id="menuIcon" @click.prevent="showCategoryMenu()" ref="categoryButtonsWrapper">
    </div>
    <div id="settingsIcon" @click.prevent="saveTheme()">
    </div>
    <div id="addMySiteButtonSR" class="colour2"><b>+ Add My Site</b>
    </div>
    <div id="searchBoxWrapperSR">
      <form>
        <button type="submit" id="searchButtonSR" v-on:click.prevent="setSearchTerms(searchText, '/')">
          <b>Search</b>
        </button>
        <input type="text" id="searchBoxSR" v-model="searchText"
          maxlength="50">
        </input>
      </form>
    </div>
    <div id="titleBox">
      <div id="safeIcon"></div>
      <span><h1 class="heading1Size">SAFE Results</h1></span>
    </div>
    <div id="sortButtonsWrapper">
      <input class="button sort" type="submit" value="A-Z" v-on:click.prevent="alphabetSort(sites)">
      <input class="button sort" type="submit" value="D/M/Y" v-on:click.prevent="dateAddedSort(sites)">
    </div>
  </div>
  <div id="sitesList">
    <div id="searchingMessage">             
      <div class= "siteFailedItem"><h3>Searching...</h3></div>
      <div class= "siteFailedItem">Press Space Bar then Enter to show *all* SAFE network sites!</div>
    </div>
    <div id="noSitesToShow">           
      <div class= "siteFailedItem"><h3>Sorry, Nothing Found...</h3></div>
      <div class= "siteFailedItem">Why not make your own site to fill in the gap!</div>
    </div>
    <div id="noNetworkConnection">           
      <div class= "siteFailedItem"><h3>Search Interrupted...</h3></div>
      <div class= "siteFailedItem">Seems like there's no connection to the SAFE network just now!</div>
    </div>
    <ul style="list-style: none;">
      <li v-for="site in sites" :key=site.key >
        <a :href="site.value.url">
          <div class="site" >             
            <div class= "siteItemTitle"><h3>{{site.value.name}}</h3></div>
              <div class= "siteItemURL">{{site.value.url}}</div>
              <div class= "siteItemDescription">{{site.value.description}}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div id="fixedElements2">
  <div id="categoryButtonsWrapper" ref="categoryButtonsWrapper2">
      <div id="learnButton" class="button category colour3" @click.prevent="categoriesList1Visible = !categoriesList1Visible"  ref="categoriesList1Dropdown">
        <b>Learn</b>
        <div id="categoriesList1Dropdown" v-if="categoriesList1Visible" class="subCategoriesPopUpMenu">
          <div @click.prevent="setSearchTerms('/','Information')" class="subCategoryPopUpMenuItem" >All</div>
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
      <div id="workButton" class="button category colour4" @click.prevent="categoriesList2Visible = !categoriesList2Visible" ref="categoriesList2Dropdown">
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
          <div @click.prevent="setSearchTerms('/','Other Tools')" class="subCategoryPopUpMenuItem" style="border-style: none;">Other</div>
        </div>
      </div>
      <div id="playButton" class="button category colour2" @click.prevent="categoriesList3Visible = !categoriesList3Visible" ref="categoriesList3Dropdown">
        <b>Play</b>
        <div id="categoriesList3Dropdown" v-if="categoriesList3Visible" class="subCategoriesPopUpMenu">
          <div @click.prevent="setSearchTerms('/','All Media')" class="subCategoryPopUpMenuItem">All</div>
          <div @click.prevent="setSearchTerms('/','Music')" class="subCategoryPopUpMenuItem">Music</div>
          <div @click.prevent="setSearchTerms('/','Video')" class="subCategoryPopUpMenuItem">Video</div>
          <div @click.prevent="setSearchTerms('/','Games')" class="subCategoryPopUpMenuItem">Games</div>
          <div @click.prevent="setSearchTerms('/','Art')" class="subCategoryPopUpMenuItem">Art</div>
          <div @click.prevent="setSearchTerms('/','Words')" class="subCategoryPopUpMenuItem">Words</div>
          <div @click.prevent="setSearchTerms('/','Kids')" class="subCategoryPopUpMenuItem">Kids</div>
          <div @click.prevent="setSearchTerms('/','Other Media')" class="subCategoryPopUpMenuItem" style="border-style: none;">Other</div>
        </div>
      </div>
      <div id="connectButton" class="button category colour1" @click.prevent="categoriesList4Visible = !categoriesList4Visible" ref="categoriesList4Dropdown">
        <b>Connect</b>
        <div id="categoriesList4Dropdown" v-if="categoriesList4Visible" class="subCategoriesPopUpMenu lower">
          <div @click.prevent="setSearchTerms('/','Social')" class="subCategoryPopUpMenuItem">All</div>
          <div @click.prevent="setSearchTerms('/','People')" class="subCategoryPopUpMenuItem">People</div>
          <div @click.prevent="setSearchTerms('/','Mail')" class="subCategoryPopUpMenuItem">Mail</div>
          <div @click.prevent="setSearchTerms('/','Chat')" class="subCategoryPopUpMenuItem">Chat</div>
          <div @click.prevent="setSearchTerms('/','Blog')" class="subCategoryPopUpMenuItem">Blog</div>
          <div @click.prevent="setSearchTerms('/','Forums')" class="subCategoryPopUpMenuItem">Forums</div>
          <div @click.prevent="setSearchTerms('/','Community')" class="subCategoryPopUpMenuItem">Community</div>
          <div @click.prevent="setSearchTerms('/','Other Social')" class="subCategoryPopUpMenuItem" style="border-style: none;">Other</div>
        </div> 
      </div>
      <div id="tradeButton" class="button category colour3" @click.prevent="categoriesList5Visible = !categoriesList5Visible" ref="categoriesList5Dropdown">
        <b>Trade</b>  
        <div id="categoriesList5Dropdown" v-if="categoriesList5Visible" class="subCategoriesPopUpMenu lower">
          <div @click.prevent="setSearchTerms('/','Trade')" class="subCategoryPopUpMenuItem">All</div>
          <div @click.prevent="setSearchTerms('/','Markets')" class="subCategoryPopUpMenuItem">Markets</div>
          <div @click.prevent="setSearchTerms('/','Retail')" class="subCategoryPopUpMenuItem">Retail</div>
          <div @click.prevent="setSearchTerms('/','Services')" class="subCategoryPopUpMenuItem">Services</div>
          <div @click.prevent="setSearchTerms('/','Local')" class="subCategoryPopUpMenuItem">Local</div>
          <div @click.prevent="setSearchTerms('/','Software')" class="subCategoryPopUpMenuItem">Software</div>
          <div @click.prevent="setSearchTerms('/','Currency')" class="subCategoryPopUpMenuItem">Currency</div>
          <div @click.prevent="setSearchTerms('/','Other Trade')" class="subCategoryPopUpMenuItem" style="border-style: none;">Other</div>
        </div>
      </div>
    </div>
    </div>
</div>
</template>



