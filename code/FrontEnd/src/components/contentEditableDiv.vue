<template>
<div>
  <div
    id="sel"
    ref="dynamicDiv"
    contenteditable="true"
    style="border:1px solid black;width: 100%;height: 100%;" 
    @contextmenu.prevent="$refs.menu.open($event, {})"
    >
    
  </div>
  <vue-context ref="menu">
        <template slot-scope="child" v-if="child.data">
            <li>
                <a @click="addSSML(child.data)">
                    addSSML
                </a>
            </li>
            <li>
                <a @click.prevent="remove(child.data.index)">
                    Delete "{{ child.data.name }}"
                </a>
            </li>
        </template>
    </vue-context>

    <b-button @click="tagBreak()">SAVE</b-button>
    <b-button @click="change()">CHANGE TAG</b-button>
    <b-button @click="saveSelect()">SAVE SELECTION</b-button>
    <b-button @click="restore()">RESTORE SELECTION</b-button>
    <b-input v-model="choosenSSML"></b-input>

</div>
</template>

<script>
import {saveSelection,restoreSelection} from './lib/storeSelection'
import construct from './lib/contruct'
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';

const constructorSSML = construct;
export default {
    data(){
        return{
        numID:1,
        viewMenu: false,
        top: '0px',
        left: '0px',
        listSSML:[],
        choosenTextData:{},
        choosenSSML:"",
        testSave:{},
        windowSelectionValue:{}
        }
    },
    components: {
            VueContext 
    },
    // watch:{
    //   selectText:()=>{

    //   }
    // },
    // computed:{
    //   selectText(){
    //     return window.getSelection().getRangeAt(0).extractContents();
    //   }
    // },
    methods:{
      saveSelect(){
        this.windowSelectionValue = saveSelection();
      },
      restore(){
        restoreSelection(this.windowSelectionValue)
      },
      change(){
      },
      getData(){

      },
      unwrap(wrapper) {
      // place childNodes in document fragment
      var docFrag = document.createDocumentFragment();
      while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        docFrag.appendChild(child);
      }

      // replace wrapper with document fragment
      wrapper.parentNode.replaceChild(docFrag, wrapper);
    },
    

// Try it:
// unwrap(document.getElementById("test"));
      getContent(){
        console.log(this.$refs.dynamicDiv.innerHTML)
        var str = this.$refs.dynamicDiv.innerHTML;
        str =  str.replace("></break>","/>")
        console.log(str)
      },
      addProperties(id){
        document.getElementById(id)
      },
      // checkEmptyString(str){
      //   let re = new RegExp('/([A-Z,0-9])\w+/g');
      // },
      unwrapSSML_byID(){
        document.getElementById(this.$store.getters.currentID).outerHTML = document.getElementById(this.$store.getters.currentID).innerHTML;

      },
        addSSML(){
          console.log(this.testSave)
          // listKey = Object.keys(data)
          this.choosenSSML = this.$store.getters.choosenTag;
          console.log(this.choosenSSML)
            console.log("SSML")
          // listKey.forEach(e => {
            if(this.choosenSSML)
            {
              var tag = constructorSSML.p.tag
              var selection = this.windowSelectionValue;
              console.log("nodeName "+window.getSelection().anchorNode.parentNode.nodeName)
              console.log(selection)
              if(window.getSelection().anchorNode.parentNode.nodeName === 'SAY-AS') //&& (!selection.extractContents().replace(/\s/g, '').length || selection.extractContents() === ""))
              // window.getSelection().anchorNode.parentNode.nodeName === 'sel'
              {
                console.log("OKKKKKKKK")
                let selectedText = selection.extractContents();
                selection.insertNode("");
              }else{
                console.log("ELSE")
                console.log(constructorSSML)
                // if(window.getSelection().baseNode.parentNode.id != "sel") return;
                let selectedText = selection.extractContents();
                let span = document.createElement(constructorSSML[this.choosenSSML].tag);
                console.log(constructorSSML)
                this.numID++;
                span.setAttribute("id",this.numID)
                let x = new Object(constructorSSML)
                x.id = this.numID;
                console.log("this.choosenSSML = "+this.choosenSSML)
                console.log(x[this.choosenSSML])
                x[this.choosenSSML].isActive = 1;
                this.$store.dispatch('ssml/pushSSML', x);
                this.$store.dispatch('ssml/changeOption', {'currentID':this.numID});
                span.onclick = function(){
                  _this.getlistSSML(this.id)
                }
                span.classList.add(constructorSSML[this.choosenSSML].class);
                span.appendChild(selectedText);
                selection.insertNode(span);
                this.$emit("transferObjFromContent")
              }
            }else{
              console.log("please choose a tag")
            }
            
          // });
          var _this = this;    
          
          // console.log(window.getSelection())
          console.log("select "+ window.getSelection().anchorNode.parentNode.nodeName)
          
      },
      choose(text){
        this.choosenSSML = text
      },
      tagBreak(){
        this.$store.dispatch('ssml/pushSSML', 1);
        console.log(this.$store.getters.listSSML)
        // var selection = document.getSelection().getRangeAt(0);
        // var toInsert = document.createElement("");
        // toInsert.innerText = constructorSSML.break.innerText
        // // toInsert.style[constructorSSML.break.styleType] = constructorSSML.break.styleValue
        // // toInsert.setAttribute("id",this.numID)
        // // var _this = this
        // // toInsert.onclick = function(){
        // //       _this.getlistSSML(this.id)
        // //     }
        // // var newContent = oldContent.substring(0, cursorPos) + toInsert + oldContent.substring(cursorPos);
        // selection.insertNode(toInsert);
      },
      getlistSSML(id){
        // console.log("id = "+id)
        var one = this.listSSML.filter(function(one){
            return one.id == id
        })
        console.log("getlistSSML")
        this.choosenTextData = one[0]
        // console.log(this.choosenTextData)
        this.$emit("transferObjFromContent")
      },
    }
}
</script>

<style>
@import './lib/styleContruct.css';
body {
    width: 100%;
    height: 100%;
}

h1 {
  font-size: 3em;
}

.center {
  text-align: center;
}

#demo {
    width: 100%;
    height: 100%;
}

#right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}
</style>