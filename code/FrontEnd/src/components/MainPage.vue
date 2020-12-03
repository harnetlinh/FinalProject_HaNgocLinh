<template>
  <div id="qna">
    <div class="container-fluid dashboard">
      <div class="row">

          <div class="col-lg-5 col-sm">
              <div class="card" id="search">
                <center>
                  <h4 id="title">Search text</h4>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col class="col-8"><b-form-input v-model="valueSearch" v-on:change="onChangedSearch()" type="text" debounce="500" placeholder="Search Text" id="keyword-input"></b-form-input></b-col>
                      <b-col class="col-4"><b-button v-on:click="onChangedSearch(valueSearch)">Regex</b-button></b-col>
                    </b-row>
                  </b-container>
                </center>
              </div>
          </div>
          
          <div class="col-lg col-sm">
              <div class="card" id="qoutes">
                  <div class="card-body">
                      <div class="media align-items-center">
                          <div class="media-body">
                            <aplayer autoplay
                              :music="{
                                title: isReady?'READY TO HEAR':'NOT AVAILABLE',
                                artist: 'FPT AI',
                                src: voicerecord,
                                theme:isReady?'rgb(65, 184, 131)':'tomato'
                              }"
                            />
                          </div>
                          <div class="text-center" style="margin-left:20px">
                              <b-button size="h1" class="mb-2" :variant="isReady?'success':'secondary'" v-on:click="$router.push(voicerecord)">
                                <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
                              </b-button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

      <div class="row">

        <div class="col-lg-9 col-sm">
          <div class="card center-div" id="maker" ref="maker" >
            <center>
              <h4 id="title">Type your text here</h4>
            </center>

            <b-row class="my-0">
              <b-col sm="4">
                <label for="textarea-auto-height">Turn on highlight Text</label>
              </b-col>
              <b-col sm="1">
                <b-form-checkbox v-model="highlightEnabled" name="check-button" switch>
                </b-form-checkbox>
              </b-col>
              <b-col sm="12">
                <div
                  id="sel"
                  ref="dynamicDiv"
                  contenteditable="true"
                  style="border:1px solid black;width: 100%;height: 100%;" 
                  >
                </div>
                <b-button @click="saveSelectionSSML()">SAVE SELECTION</b-button>
                <b-button @click="restoreSelectionSSML()">RESTORE SELECTION</b-button>
                <b-button @click="unSelectSSML()">RESET SELECTION</b-button>
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="sendMsg()">Submit</b-button>
                <b-button @click="merge()"> TEST MEGR</b-button>
                <b-button @click="forceUpdate()">FORCE UPDATE</b-button>
                <b-button @click="gettext()">GET TEXT</b-button>
                <b-button @click="addSSMLfromMain()">HIGHTLIGHT TEXT</b-button>
                <b-button @click="getTestAudio()">getTestAudio</b-button>
                <b-button @click="getTestFeedback()"> FEED BACK</b-button>
                <b-button @click="addSSML()">addSSML</b-button>
                <b-button @click="unwrapSSML_byID()"> test unwrap</b-button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-3 col-sm">
          <div class="card center-div overflow-auto" style="" >
              <b-col sm="15">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="selectedSSML.SSML"
                      :options="options"
                      name="radio-inline"
                      stacked
                    ></b-form-radio-group>
                    ------------------------
                    <div v-if="selectedSSML.SSML == 'say_as'">
                        {{selectedSSML.SSML}}
                        <b-form-radio-group
                        v-model="selectedSSML.valueOptionSSML.say_as.interpret_as"
                        :options="optionsSayAs"
                        stacked
                      ></b-form-radio-group>
                    </div>
                    <div v-if="selectedSSML.SSML == 'emphasis'">
                        {{selectedSSML.SSML}}
                        <b-form-radio-group
                        v-model="selectedSSML.valueOptionSSML.emphasis.level"
                        :options="optionsEmphasis"
                        stacked
                      ></b-form-radio-group>
                    </div>
                    <div v-if="selectedSSML.SSML == 'prosody'">
                        {{selectedSSML.SSML}}
                        <b-form-radio-group
                        v-model="selectedSSML.valueOptionSSML.prosody.rate"
                        :options="optionsProsody"
                        stacked
                      ></b-form-radio-group>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.prosody.pitch" min="-50" max="50" type="range"></b-form-input>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.prosody.volume" min="-50" max="50" type="range"></b-form-input>
                    </div>
                    <div v-if="selectedSSML.SSML == 'break'">
                        {{selectedSSML.SSML}}
                        <b-form-radio-group
                        v-model="selectedSSML.valueOptionSSML.break.strength"
                        :options="optionsBreak"
                        stacked
                      ></b-form-radio-group>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.break.time" type="number"></b-form-input>
                    </div>
                    <!-- {{valueOptionSSML.prosody.pitch}} -->
                  <!-- <b-button v-if="selectedSSML.SSML != ''" @click="onClickSave()">SAVE</b-button> -->
              </b-col>
          </div>
        </div>
      </div>

      <div class="messages">
        <div id="box-mess" v-show="box">
          <div id="title-box">Chatbot</div>
          <div id="show-mess">

            <div class="bot-send">
              <div class="row">
                <div class="col-3 ava">
                  <img src="../assets/bot.png" alt="Avatar">
                </div>
                <div class="col-8 text">
                  <p>Hello. How can I help you?</p>
                </div>
              </div>
            </div>+
          </div>
          <div id="send" class="row">
              <b-form-input  id="textSend" class="col-10"></b-form-input>
              <b-button class="col-2"><i class="icofont-location-arrow"></i></b-button>
          </div>
        </div>
        <b-button id="openMessages" @click="box = !box"><i class="icofont-facebook-messenger"></i></b-button>
      </div>
      
    </div>
    <b-modal id="modal-spinner" title="BootstrapVue" hide-footer hide-header no-close-on-backdrop no-close-on-esc >
      <div>
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </b-modal>
    
  </div>
</template>

<script>
import construct from './lib/contruct'
const constructorSSML = construct;
import {saveSelection,restoreSelection} from './lib/storeSelection'
import play from 'audio-play'
import contenteditableDiv from './contentEditableDiv'
import choiceSub from './choices/choiceSub'
import Crunker from 'crunker'
import axios from 'axios';
import HighlightableInput from "vue-highlightable-input"
import aplayer from 'vue-aplayer'
import compo from './elements/button'
import speak from './elements/speak'
const audio = new Crunker();
const nullAudio = new Audio();
export default {
    name: 'QnAMaker',
    components : {
      HighlightableInput,
      aplayer,
      'speak':speak,
      choiceSub,
      contenteditableDiv
    },
    data() {
      return {
        selectedSSML_id:"",
        windowSelectionValue:"",
        numID:1,
        valueSearch:"",
        box: false,
        textSend: '',
        voicerecord:nullAudio,
        msg: '',
        ToChoice:{},
        isReady:false,
        componentKey : 0,
        listSSML:[],
        highlight: [
          {text:'chicken', style:"background-color:#f37373"},
          {text:'noodle', style:"background-color:#fca88f"},
          {text:'soup', style:"background-color:#bbe4cb"},
          {text:'so', style:"background-color:#fff05e"},

        ],
        test:'',
      highlightEnabled: true,
      choiceSSML:choiceSub,
      
      selectedSSML:{
        SSML:"",
        valueOptionSSML:{
        say_as:{
          interpret_as:null
        },
        emphasis:{
          level:null
        },
        prosody:{
          rate:null,
          pitch:null,
          volume:null
        },
        break:{
          time:null,
          strength:null
        },
      },
      
      },
      optionsBreak:[
        {text: 'strong', value: 'strong'},
        {text: 'medium', value: 'medium'},
        {text: 'weak', value: 'weak'},
        {text: 'none', value: ''},
      ],
      optionsProsody: [
        {text: 'low', value: 'low'},
        {text: 'medium', value: 'medium'},
        {text: 'high', value: 'high'},
        {text: 'none', value: ''},
      ],
      optionsEmphasis:[
        {text: 'strong', value: 'strong'},
        {text: 'moderate', value: 'moderate'},
        {text: 'none', value: 'none'},
        {text: 'reduced', value: 'reduced'},
      ],
      optionsSayAs:[
        {text: 'cardinal', value: 'cardinal'},
        {text: 'ordinal', value: 'ordinal'},
        {text: 'characters', value: 'characters'},
        {text: 'fraction', value: 'fraction'},
        {text: 'expletive', value: 'expletive'},
        {text: 'unit', value: 'unit'},
        {text: 'verbatim', value: 'verbatim'},
        {text: 'date', value: 'date'},
        {text: 'time (hms12)', value: 'time'},
        {text: 'telephone', value: 'telephone'}
      ],
      options: [
          { text: 'say_as', value: 'say_as' },
          { text: 'emphasis', value: 'emphasis' },
          { text: 'prosody', value: 'prosody' },
          { text: 'break', value: 'break' },
        ]
      }
    },
    mounted() {
    // window.addEventListener('mouseup', this.highlighter);
    this.test = compo;
  },
    methods:{
      saveSelectionSSML(){
        this.windowSelectionValue = saveSelection();
      },
      restoreSelectionSSML(){
        restoreSelection(this.windowSelectionValue)
      },
      getSSMLChoice(){
        let obj = {
          SSML: this.selectedSSML.SSML,
          attributes:{}
        };
        Object.keys(this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML]).forEach(key => {
          if(this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML][key] !== null
          && this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML][key] !== undefined
          && this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML][key] !== ''
          && this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML][key] != 0)
          {
            obj.attributes[key] = this.selectedSSML.valueOptionSSML[this.selectedSSML.SSML][key];
          }
        });
        return obj;
      },
      unwrapSSML_byID(){
        document.getElementById(2).outerHTML = document.getElementById(2).innerHTML;
      },
      addSSML(){
          var selectedChoice = this.getSSMLChoice();
          console.log(selectedChoice);
          this.choosenSSML = selectedChoice.SSML;
          console.log(this.choosenSSML)
            console.log("SSML")
          // listKey.forEach(e => {
            if(this.choosenSSML)
            {
              var tag = constructorSSML[selectedChoice.SSML].tag
              var selection = this.windowSelectionValue;
              console.log("nodeName "+window.getSelection().anchorNode.parentNode.nodeName)
              console.log(selection)
              if(window.getSelection().anchorNode.parentNode.nodeName === 'sel') //&& (!selection.extractContents().replace(/\s/g, '').length || selection.extractContents() === ""))
              // window.getSelection().anchorNode.parentNode.nodeName === 'sel'
              {
                console.log("OKKKKKKKK")
                let selectedText = selection.extractContents();
                selection.insertNode("");
              }else{
                console.log("ELSE")
                console.log(constructorSSML)
                let selectedText = selection.extractContents();
                let span = document.createElement(constructorSSML[this.choosenSSML].tag);
                console.log(constructorSSML)
                this.numID++;
                span.setAttribute("id",this.numID)
                this.$store.dispatch('ssml/pushSSML', {
                  id:this.numID,
                  windowSelection:this.windowSelectionValue,
                  choiceSSML:selectedChoice
                });
                var _this = this;
                span.onclick = function(){
                  _this.getlistSSML(this.id)
                }
                Object.keys(selectedChoice.attributes).forEach(key=>{
                  span.setAttribute(constructorSSML[selectedChoice.SSML].attributes[key].text,selectedChoice.attributes[key])
                })
                span.classList.add(constructorSSML[this.choosenSSML].class);
                span.appendChild(selectedText);
                selection.insertNode(span);
                this.$emit("transferObjFromContent")
                console.log(this.$store.getters.listSSML)
              }
            }else{
              console.log("please choose a tag")
            }
      },
      getlistSSML(id){
        var one = this.$store.getters.listSSML.find(function(one){
            return one.id == id
        })
        this.windowSelectionValue = one.windowSelection;
        this.selectedSSML.SSML=one.choiceSSML.SSML;
        Object.keys(one.choiceSSML.attributes).forEach(key=>{
          this.selectedSSML.valueOptionSSML[one.choiceSSML.SSML][key] = one.choiceSSML.attributes[key];
        });
        this.restoreSelectionSSML();
      },
      unSelectSSML(){
        this.windowSelectionValue = {};
        this.selectedSSML = {
            SSML:"",
            valueOptionSSML:{
            say_as:{
              interpret_as:null
            },
            emphasis:{
              level:null
            },
            prosody:{
              rate:null,
              pitch:null,
              volume:null
            },
            break:{
              time:null,
              strength:null
            },
          }
        }
      },
      getTestFeedback(){
        this.axios.get('http://localhost:3000/feedback');
      },

      getTestAudio(){
        this.axios.get('http://localhost:3000/test').then((res)=>{
          this.voicerecord = res.data.mp3[0].audioContent
          console.log(res)
          let pause = play(this.voicerecord, {
          //start/end time, can be negative to measure from the end
          start: 0,
          end: this.voicerecord.duration,

          //repeat playback within start/end
          loop: false,

          //playback rate
          rate: 1,

          //fine-tune of playback rate, in cents
          detune: 0,

          //volume
          volume: 1,

          //possibly existing audio-context, not necessary
          context: require('audio-context'),

          //start playing immediately
          autoplay: true
        },);
        })
      },
      objSSML(id,maker,engine){ 
          this.id = id; 
          this.maker = maker; 
          this.engine = engine; 
      },
      sendMsg(){
        this.$bvModal.show('modal-spinner')
        axios.post(`http://c39a6c482a7a.ngrok.io/getOnlyMp3`,{
            text:this.msg
        })
        .then(response => {
          this.voicerecord = response.data.mp3
          this.isReady = true
          this.$bvModal.hide('modal-spinner')
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getSelectionText() {
          document.getElementById("sel").textContent
          let text = window.getSelection().toString();
        return text;
    },
    merge(){
      audio
          .fetchAudio("http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3", "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3")
          .then(buffers => {
            // => [AudioBuffer, AudioBuffer]
            audio.mergeAudio(buffers);
          })
          .then(merged => {
            // => AudioBuffer
            audio.export(merged, "audio/mp3");
          })
          .then(output => {
            // => {blob, element, url}
            audio.download(output.blob);
            document.append(output.element);
            console.log(output.url);
          })
          .catch(error => {
            // => Error Message
          });
    }
    }
}
</script>

<style>

</style>

<style scoped src="../assets/css/QnAMaker.css">
span {color: green;}
</style>