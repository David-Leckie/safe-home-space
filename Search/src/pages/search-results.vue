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
      neon: 'neon', safe: 'safe', mondrian: 'mondrian', infoSearch1Visible: false,
      infoSearch2Visible: false, infoSearch3Visible: false, infoSearch4Visible: false,
      sites: [], filCat: '', searchText: '', passedText: '', //passedCat: '', id: ''
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
    /*getTheme: async function() {
        this.theme = await safenetwork.getTheme();
        await this.loadTheme(this.theme)
      },*/
      loadTheme(theme) {
        for (var i=0; i < document.styleSheets.length; i++) {
          document.styleSheets[i].disabled=true
        };

        if (theme == "neon") {
         
         document.styleSheets[8].disabled=false;
        }
        else if (theme == "safe") {
          document.styleSheets[9].disabled=false;
        }
        else if (theme == "mondrian") {
          document.styleSheets[10].disabled=false;
        }
        else {
          document.styleSheets[8].disabled=false;
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
      
      filterByCategory: async function(filCat) {
        
          let ufsites = await safenetwork.getItems();
          this.sites = await ufsites.filter(ufsite => (ufsite.value.category1 == filCat || ufsite.value.category2 == filCat
          || ufsite.value.category1SubCategoryA == filCat || ufsite.value.category1SubCategoryB == filCat ||
          ufsite.value.category2SubCategoryA == filCat || ufsite.value.category2SubCategoryB == filCat));
        return this.sites
      },
      
      filterBySearchTerm: async function(xText) {
        let ufsites = await safenetwork.getItems();
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
      },
      alphabetSort: async function(sites) {
          this.sites.sort((a, b) => a.value.name.localeCompare(b.value.name))
      },
      dateAddedSort: async function(sites) {
          await sites.sort((a, b) => a.value.dateAdded.localeCompare(b.value.dateAdded)),
          await sites.reverse()
      },
      /*showSettingsDropdown: async function() {
        document.getElementById("settingsDropdown").classList.toggle("show");
      },
      showMailDropdown: async function() {
        document.getElementById("mailDropdown").classList.toggle("show");
      },*/
      showinfoSearch1Dropdown: async function() {
        document.getElementById("infoSearch1Dropdown").classList.toggle("show");
      },
      showinfoSearch2Dropdown: async function() {
        document.getElementById("infoSearch2Dropdown").classList.toggle("show");
      },
      showinfoSearch3Dropdown: async function() {
        document.getElementById("infoSearch3Dropdown").classList.toggle("show");
      },
      showinfoSearch4Dropdown: async function() {
        document.getElementById("infoSearch4Dropdown").classList.toggle("show");
      },
      /*listenGlobalClickEvent: async function() {
      eventBus.$on('text-event', returnedText => {
        this.testText=returnedText
      })
    },*/
      documentClick(e) {
        let el = this.$refs.settingsDropdown
        let target = e.target
        if ( el !== (target) && !el.contains(target)) {
          this.settingsVisible = false
        }
        /*let el2 = this.$refs.mailDropdown
        let target2 = e.target
        if ( el2 !== (target) && !el2.contains(target2)) {
          this.mailVisible = false
        }*/
        let el3 = this.$refs.infoSearch1Dropdown
        let target3 = e.target
        if ( el3 !== (target) && !el3.contains(target3)) {
          this.infoSearch1Visible = false
        }
        let el4 = this.$refs.infoSearch2Dropdown
        let target4 = e.target
        if ( el4 !== (target) && !el4.contains(target4)) {
          this.infoSearch2Visible = false
        }
        let el5 = this.$refs.infoSearch3Dropdown
        let target5 = e.target
        if ( el5 !== (target) && !el5.contains(target5)) {
          this.infoSearch3Visible = false
        }
        let el6 = this.$refs.infoSearch4Dropdown
        let target6 = e.target
        if ( el6 !== (target) && !el6.contains(target6)) {
          this.infoSearch4Visible = false
        }
      },
  },
  async created() {
    await this.loadTheme(this.theme);
    await safenetwork.authoriseAndConnect();
    //await safenetwork.checkForMutableData();
      //await safenetwork.getMutableDataAddress();
      await safenetwork.linkToMutableData();
      //await this.dateAddedSort(this.sites);
    //await this.getTheme();
    //await this.listenGlobalClickEvent();
    

    await document.addEventListener('click', this.documentClick);
    this.passedText = await this.$route.params.passedText;
    this.passedCat = await this.$route.params.passedCat;
    await this.primeSearchBox(this.passedText);
    if (this.passedText == '/') {
    await this.filterByCategory(this.passedCat)
    }
    else {
      await this.filterBySearchTerm(this.passedText);
      };
      
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
  <div id="safeLogoSR"></div>
  <div id="titleSR"><b><p style = "font-size: 36px">SAFE Results</p></b></div>
  <div id="sortBox2">
        <input class="button buttonSort2" type="submit" value="A-Z" v-on:click.prevent="alphabetSort(sites)">
        <input class="button buttonSort2" type="submit" value="D/M/Y" v-on:click.prevent="dateAddedSort(sites)">
      </div>
      <div id="addMySiteButton" class="topSearchButton yellow" style="width: 14vw; left: 74vw; top: 3vh"><b>+ Add My Site</b>
      </div>
      
      <div id="sitesList2">
            <div class="site-2" style="z-index: -2">
                <div class="basicSite2">             
                  <div class= "siteItem" style="padding: 15px; padding-left: 25px; padding-bottom: 5px"><h3>Searching...</h3></div>
                  <!--<div class= "siteItem URL" style="padding: 6px; font-size: 14px; font-style: oblique;">{{site.value.url}}</div>-->
                  <div class= "siteItem" style="padding: 15px; padding-left: 40px; padding-bottom: 20px">Type Space Bar then Return to show all SAFE sites</div>
                </div>
            </div>
            <div style="z-index: -1" id="noSitesToShow">
                <div class="basicSite2">             
                  <div class= "siteItem" style="padding: 15px; padding-left: 25px; padding-bottom: 5px"><h3>Sorry, Nothing Found...</h3></div>
                  <!--<div class= "siteItem URL" style="padding: 6px; font-size: 14px; font-style: oblique;">{{site.value.url}}</div>-->
                  <div class= "siteItem" style="padding: 15px; padding-left: 40px; padding-bottom: 20px">Why not make your own site to fill in the gap!</div>
                </div>
            </div>
          <ul style="list-style: none;">
            <li v-for="site in sites" :key=site.key >
              <div class="site2">
                <div class="basicSite2">             
                  <div class= "siteItem" style="padding: 10px;"><h3>{{site.value.name}}</h3></div>
                  <div class= "siteItem URL" style="padding: 6px; padding-left: 14px; font-size: 14px; font-style: oblique;">{{site.value.url}}</div>
                  <div class= "siteItem" style="padding: 10px; padding-bottom: 18px" >{{site.value.description}}</div>
                </div>
            </div>
        </li>
        </ul>
    </div>
    <div id="searchPageRHSButtons">
      <div id="searchPageRHSButton1">
        <span class="searchPageButton green" style="width: 10vw;" @click="infoSearch1Visible = !infoSearch1Visible" 
        ref="infoSearch1Dropdown"><b>Learn</b></span>
        <div id="infoSearch1Dropdown" v-if="infoSearch1Visible" class="infoSearchDropdown2">
            <div @click="filterByCategory('Information')" class="infoSearchItem" style="border: solid;">All </div>
            <div @click="filterByCategory('SAFE')" class="infoSearchItem">SAFE</div>
            <div @click="filterByCategory('Tech')" class="infoSearchItem">Tech</div>
            <div @click="filterByCategory('Science')" class="infoSearchItem">Science</div>
            <div @click="filterByCategory('Geography')" class="infoSearchItem">Geography</div>
            <div @click="filterByCategory('Humanity')" class="infoSearchItem">Humanity</div>
            <div @click="filterByCategory('Arts')" class="infoSearchItem">Arts</div>
            <div @click="filterByCategory('Other')" class="infoSearchItem">Other</div>
        </div> 
      </div>     
    <div id="searchPageRHSButton2">
    <span class="searchPageButton orange" style="width: 10vw;" @click="infoSearch2Visible = !infoSearch2Visible" 
    ref="infoSearch2Dropdown"><b>Work</b></span>
      <div id="infoSearch2Dropdown" v-if="infoSearch2Visible" class="infoSearchDropdown2">
        <div @click="filterByCategory('Tools')" class="infoSearchItem" style="border: solid;">All </div>
        <div @click="filterByCategory('Storage')" class="infoSearchItem">Storage</div>
        <div @click="filterByCategory('Computing')" class="infoSearchItem">Computing</div>
        <div @click="filterByCategory('Money')" class="infoSearchItem">Money</div>
        <div @click="filterByCategory('Language')" class="infoSearchItem">Language</div>
        <div @click="filterByCategory('Visual')" class="infoSearchItem">Visual</div>
        <div @click="filterByCategory('Sound')" class="infoSearchItem">Sound</div>
        <div @click="filterByCategory('Other Tools')" class="infoSearchItem">Other</div>
      </div> 
    </div>
    <div id="searchPageRHSButton3">
      <span class="searchPageButton yellow" style="width: 10vw;" @click="infoSearch3Visible = !infoSearch3Visible" 
      ref="infoSearch3Dropdown"><b>Play</b></span>
      <div id="infoSearch3Dropdown" v-if="infoSearch3Visible" class="infoSearchDropdown2">
        <div @click="filterByCategory('Media')" class="infoSearchItem" style="border: solid;">All </div>
        <div @click="filterByCategory('Music')" class="infoSearchItem">Music</div>
        <div @click="filterByCategory('Video')" class="infoSearchItem">Video</div>
        <div @click="filterByCategory('Games')" class="infoSearchItem">Games</div>
        <div @click="filterByCategory('Art')" class="infoSearchItem">Art</div>
        <div @click="filterByCategory('Words')" class="infoSearchItem">Words</div>
        <div @click="filterByCategory('Kids')" class="infoSearchItem">Kids</div>
        <div @click="filterByCategory('Other Media')" class="infoSearchItem">Other</div>
        
      </div> 
    </div>
    <div id="searchPageRHSButton4">
      <span class="searchPageButton pink" style="width: 10vw;" @click="infoSearch4Visible = !infoSearch4Visible" 
      ref="infoSearch4Dropdown"><b>Connect</b></span>
      <div id="infoSearch4Dropdown" v-if="infoSearch4Visible" class="infoSearchDropdown2">
        <div @click="filterByCategory('Social')" class="infoSearchItem" style="border: solid;">All </div>
        <div @click="filterByCategory('People')" class="infoSearchItem">People</div>
        <div @click="filterByCategory('Mail')" class="infoSearchItem">Mail</div>
        <div @click="filterByCategory('Chat')" class="infoSearchItem">Chat</div>
        <div @click="filterByCategory('Blog')" class="infoSearchItem">Blog</div>
        <div @click="filterByCategory('Forums')" class="infoSearchItem">Forums</div>
        <div @click="filterByCategory('Community')" class="infoSearchItem">Community</div>
        <div @click="filterByCategory('Other Social')" class="infoSearchItem">Other</div>
      </div> 
    </div>
  </div>
  <div id="topSearchBoxDiv">
    <!--<searchbox v-model="searchText" @input="filterBySearchTerm(searchText)" ></searchbox>-->
    <!--<div id="searchButton"><span class="frontPageButton"><b>Search</b></span></div>
    <input type="text" id="searchBox1" style="" 
        v-model="searchText" @input="" maxlength="50" placeholder="" autofocus>
    </input>-->

  <!--<div id="searchButton"><span class="topSearchButton"><b>Search</b></span></div>
    <input type="text" id="searchBoxTop" style="" 
         v-model="searchText" @click="filterBySearchTerm(searchText)" maxlength="50" placeholder="" autofocus>
    </input>-->
    <form>
      <button type="submit" id="searchButton" v-on:click.prevent="filterBySearchTerm(searchText)" class="topSearchButton"
      style="border-style: solid none solid solid;">
        <b>Search</b></button>
    <input type="text" id="searchBoxTop" style="" v-model="searchText"
         maxlength="50" placeholder="">
    </input>
    </form>
  </div>
</div>

</template>



