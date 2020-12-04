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
          <div class="card center-div overflow-auto" id="maker" ref="maker" >
            <center>
              <h4 id="title">Type your text here</h4>
            </center>

            <b-row class="my-0" v-for="i in currentBoxNumber" :key="i">
              <b-col sm="1">
                <span>Language</span>
              </b-col>
              <b-col sm="2">
                <b-form-select required v-model="selectedLanguageCode" :options="optionsLanguageCode"></b-form-select>
              </b-col>
              <b-col sm="1">
                <span>Voice</span>
              </b-col>
              <b-col sm="3">
                <b-form-select required v-model="selectedVoiceCode" :options="optionsVoiceCode"></b-form-select>
              </b-col>
              <b-col sm="12">
                <div
                  id="sel"
                  :ref="'dynamicDiv'+i"
                  contenteditable="true"
                  >
                </div>
                {{'dynamicDiv'+i}}
                <!-- <div
                  id="sel"
                  ref="dynamicDiv1"
                  contenteditable="true"
                  >
                </div>
                <div
                  id="sel"
                  ref="dynamicDiv2"
                  contenteditable="true"
                  >
                </div> -->
                
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-button @click="addInputBox()">+</b-button>
              </b-col>
            </b-row>
            
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="saveSelectionSSML()">Save selection</b-button>
                <b-button @click="restoreSelectionSSML()">Restore selection</b-button>
                <b-button @click="unSelectSSML()">Reset selection</b-button>
                <b-button @click="getTestAudio()">Get Audio file</b-button>
                <b-button @click="addSSML()">Add SSML</b-button>
                <b-button @click="unwrapSSML_byID()">Delete selected SSML</b-button>
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
                      <span>pitch</span>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.prosody.pitch" min="-50" max="50" type="range"></b-form-input>
                      <span>volume</span>
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
        currentBoxNumber:1,
        optionsLanguageCode:[
          { value: 'en-GB', text: 'English (UK)' },
          { value: 'en-US', text: 'English (US)' },
          { value: 'vi-VN', text: 'Vietnamese (VN)' },
          { value: 'ru-RU', text: 'Russian (Russia)' },
        ],
        optionsVoiceCode:[],
        selectedLanguageCode:"",
        selectedVoiceCode:"",
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
        ],
      }
      
    },
    watch:{
      selectedLanguageCode:function(newval,oldval){
        switch(newval){
          case 'en-GB':
            this.optionsVoiceCode = [
              { value: 'en-GB-Standard-A', text: 'en-GB A Standard Female' },
              { value: 'en-GB-Standard-B', text: 'en-GB B Standard Male' },
              { value: 'en-GB-Standard-C', text: 'en-GB C Standard Female' },
              { value: 'en-GB-Standard-D', text: 'en-GB D Standard Male' },
              { value: 'en-GB-Standard-F', text: 'en-GB F Standard Female' },
              { value: 'en-GB-Wavenet-A', text: 'en-GB A Wavenet Female' },
              { value: 'en-GB-Wavenet-B', text: 'en-GB B Wavenet Male' },
              { value: 'en-GB-Wavenet-C', text: 'en-GB C Wavenet Female' },
              { value: 'en-GB-Wavenet-D', text: 'en-GB D Wavenet Male' },
              { value: 'en-GB-Wavenet-F', text: 'en-GB F Wavenet Female' },
            ]
            break;
          case 'en-US':
            this.optionsVoiceCode = [
              { value: 'en-US-Standard-B', text: 'en-US B Standard Male' },
              { value: 'en-US-Standard-C', text: 'en-US C Standard Female' },
              { value: 'en-US-Standard-D', text: 'en-US D Standard Male' },
              { value: 'en-US-Standard-E', text: 'en-US E Standard Female' },
              { value: 'en-US-Standard-G', text: 'en-US G Standard Female' },
              { value: 'en-US-Standard-H', text: 'en-US H Standard Female' },
              { value: 'en-US-Standard-I', text: 'en-US I Standard Male' },
              { value: 'en-US-Standard-J', text: 'en-US J Standard Male' },
              { value: 'en-US-Wavenet-A', text: 'en-US A Wavenet Male' },
              { value: 'en-US-Wavenet-B', text: 'en-US B Wavenet Male' },
              { value: 'en-US-Wavenet-C', text: 'en-US C Wavenet Female' },
              { value: 'en-US-Wavenet-D', text: 'en-US D Wavenet Male' },
              { value: 'en-US-Wavenet-F', text: 'en-US F Wavenet Female' },
              { value: 'en-US-Wavenet-G', text: 'en-US G Wavenet Female' },
              { value: 'en-US-Wavenet-H', text: 'en-US H Wavenet Female' },
              { value: 'en-US-Wavenet-I', text: 'en-US I Wavenet Male' },
              { value: 'en-US-Wavenet-J', text: 'en-US J Wavenet Male' },
            ]
            break;
          case 'vi-VN':
            this.optionsVoiceCode = [
              { value: 'vi-VN-Standard-A', text: 'vi-VN A Standard Female' },
              { value: 'vi-VN-Standard-B', text: 'vi-VN B Standard Male' },
              { value: 'vi-VN-Standard-C', text: 'vi-VN C Standard Female' },
              { value: 'vi-VN-Standard-D', text: 'vi-VN D Standard Male' },
              { value: 'vi-VN-Wavenet-A', text: 'vi-VN A Wavenet Female' },
              { value: 'vi-VN-Wavenet-B', text: 'vi-VN B Wavenet Male' },
              { value: 'vi-VN-Wavenet-C', text: 'vi-VN C Wavenet Female' },
              { value: 'vi-VN-Wavenet-D', text: 'vi-VN D Wavenet Male' },
            ]
            break;
          case 'ru-RU':
            this.optionsVoiceCode = [
              { value: 'ru-RU-Standard-A', text: 'ru-RU A Standard Female' },
              { value: 'ru-RU-Standard-B', text: 'ru-RU B Standard Male' },
              { value: 'ru-RU-Standard-C', text: 'ru-RU C Standard Female' },
              { value: 'ru-RU-Standard-D', text: 'ru-RU D Standard Male' },
              { value: 'ru-RU-Standard-E', text: 'ru-RU E Standard Female' },
              { value: 'ru-RU-Wavenet-A', text: 'ru-RU A Wavenet Female' },
              { value: 'ru-RU-Wavenet-B', text: 'ru-RU B Wavenet Male' },
              { value: 'ru-RU-Wavenet-C', text: 'ru-RU C Wavenet Female' },
              { value: 'ru-RU-Wavenet-D', text: 'ru-RU D Wavenet Male' },
              { value: 'ru-RU-Wavenet-E', text: 'ru-RU E Wavenet Female' },
            ]
            break;
          default:
            this.optionsVoiceCode = [];
        }
      }
    },
    mounted() {
    // window.addEventListener('mouseup', this.highlighter);
    this.test = compo;
  },
    methods:{
      addInputBox(){
        this.currentBoxNumber++;
      },
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
      async getTestFeedback(){
        var res = await axios({
          method: 'post',
          url: 'http://localhost:3000/testnewfeedback',
          data: {"data":["Bui Duc Duy test 3 from Nam Dep Trai","22-26 test 3 from Nam Dep Trai","Developer test 3 from Nam Dep Trai"]}
        });
        console.log(res);
      },
      raw2RequestBody(){
        var arrayObj = [];
        for(var i = 1; i <= this.currentBoxNumber; i++){
          console.log('dynamicDiv'+i)
          let refname = 'dynamicDiv'+i
          console.log(this.$refs[refname][0].innerHTML)
          let obj = {
            "audioConfig": {
              "audioEncoding": "MP3",
            },
            "input": {
              "ssml": "<speak>" + this.$refs[refname][0].innerHTML + "</speak>"
            },
            "voice": {
              "languageCode": "en-US",
              "name": "en-US-Wavenet-D"
            }
          }
          arrayObj.push(obj);
        }
        return arrayObj;
      },

      getTestAudio()
      {
        console.log(this.raw2RequestBody());
        // console.log(this.$refs.dynamicDiv.innerHTML)
        this.axios.post('http://localhost:3000/test',this.raw2RequestBody()).then((res)=>{
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