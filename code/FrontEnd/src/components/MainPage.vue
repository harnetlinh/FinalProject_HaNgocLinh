<template>
  <div id="qna">
    <div class="container-fluid dashboard">
      <div class="row">

          <div class="col-lg-5 col-sm">
              <div class="card" id="search" style="height:20vh; overflow:auto">
                <center>
                  <b-table-simple hover small caption-top responsive>
                    <b-thead head-variant="light">
                      <b-tr>
                        <b-th>Download list</b-th>
                        <b-th></b-th>
                      </b-tr>
                      <b-tbody style="width:40vw">
                        <b-tr v-for="(row,index) in listVoice" :key="index" style="width:40vw">
                          <b-td>{{row.date}}</b-td>
                          <b-td class="text-right">{{row.title}}</b-td>
                          <b-td>
                            <b-button size="h1" class="mb-2" :variant="isReady?'success':'secondary'" v-on:click="onclickDownload(row.title)">
                              <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
                            </b-button>
                          </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-thead>
                  </b-table-simple>
                </center>
              </div>
          </div>
          
          <div class="col-lg col-sm">
              <div class="card" id="qoutes" style="height:20vh; overflow:auto">
                  <div class="card-body">
                      <div class="media align-items-center">
                          <div class="media-body">
                            <aplayer autoplay
                              listMaxHeight="70px"
                              :list="listVoice"
                              :music="{
                                title: isReady?'READY TO HEAR':'NOT AVAILABLE',
                                artist: 'RubySmile',
                                src: voicerecord,
                                theme:isReady?'rgb(65, 184, 131)':'tomato',
                              }"
                            />
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

            <b-row class="my-0" v-for="i in currentBoxNumber" :key="i" style="padding-top:20px">
              <b-col sm="2">
                <span>Language</span>
              </b-col>
              <b-col sm="2">
                <b-form-select :state="getValidationState(selectedLanguageCode[i-1])" required v-model="selectedLanguageCode[i-1]" :options="optionsLanguageCode"></b-form-select>
              </b-col>
              <b-col sm="2">
                <span>Voice</span>
              </b-col>
              <b-col sm="3">
                <b-form-select :state="getValidationState(selectedVoiceCode[i-1])" required v-model="selectedVoiceCode[i-1]" :options="optionsVoiceCode[i-1]"></b-form-select>
              </b-col>
              <b-col sm="12">
                <div
                  id="sel"
                  :ref="'dynamicDiv'+i"
                  contenteditable="true"
                  >
                </div>
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
                      <span>pitch {{selectedSSML.valueOptionSSML.prosody.pitch}}</span>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.prosody.pitch" min="-50" max="50" type="range"></b-form-input>
                      <span>volume {{selectedSSML.valueOptionSSML.prosody.volume}}</span>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.prosody.volume" min="0" max="100" type="range"></b-form-input>
                    </div>
                    <div v-if="selectedSSML.SSML == 'break'">
                        {{selectedSSML.SSML}}
                        <b-form-radio-group
                        v-model="selectedSSML.valueOptionSSML.break.strength"
                        :options="optionsBreak"
                        stacked
                      ></b-form-radio-group>
                      <span>Time (ms/s)</span>
                      <b-form-input v-model="selectedSSML.valueOptionSSML.break.time" type="text">ms</b-form-input>
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
    <b-modal id="modal-error" title="BootstrapVue" hide-footer hide-header >
      <div>
        Error
        {{responseErrorDetail}}
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
        responseErrorDetail:"",
        currentBoxNumber:1,
        optionsLanguageCode:[
          { value: 'en-GB', text: 'English (UK)' },
          { value: 'en-US', text: 'English (US)' },
          { value: 'vi-VN', text: 'Vietnamese (VN)' },
          { value: 'ru-RU', text: 'Russian (Russia)' },
        ],
        selectedSSML4Delete:"",
        optionsVoiceCode:[],
        selectedLanguageCode:[],
        selectedVoiceCode:[],
        selectedSSML_id:"",
        windowSelectionValue:"",
        numID:1,
        valueSearch:"",
        box: false,
        textSend: '',
        voicerecord:nullAudio,
        listVoice:[],
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
    computed:{
      allselectedLaguage(){
        let str = "";
        this.selectedLanguageCode.forEach(lang=>{
          str+=lang;
        });
        return str;
      }
    },
    watch:{
      allselectedLaguage:function(newval,oldval){
        console.log(this.selectedLanguageCode)
        for(let i = 0; i < this.selectedLanguageCode.length; i++){
           switch(this.selectedLanguageCode[i]){
            case 'en-GB':
              this.optionsVoiceCode[i] = [
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
              this.optionsVoiceCode[i] = [
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
              this.optionsVoiceCode[i] = [
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
              this.optionsVoiceCode[i] = [
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
              this.optionsVoiceCode[i] = [];
          }
          console.log(this.optionsVoiceCode);
        }
       
      }
    },
    mounted() {
    // window.addEventListener('mouseup', this.highlighter);
    this.test = compo;
  },
    methods:{
      getValidationState(value){
        if(value !== null && value !== "" && value !== undefined && value !== '' && value != [] && value.length !== 0){
          return true;
        }else return false;
      },
      onclickDownload(url){
        window.open('http://localhost:3000/download/'+ url);
      },
      addInputBox(){
        this.currentBoxNumber++;
        this.selectedVoiceCode.push([]);
        this.selectedLanguageCode.push([]);
        this.optionsVoiceCode.push([]);
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
        document.getElementById(this.selectedSSML4Delete).outerHTML = document.getElementById(this.selectedSSML4Delete).innerHTML;
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
        this.selectedSSML4Delete = id;
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
      raw2RequestBody(){
        var arrayObj = [];
        const searchRegExp2 = /&nbsp;/g;
        const searchRegExp1 = /><\/break>/g;
        const replaceWith1 = '/>';  
        const replaceWith2 = ''; 
        for(var i = 1; i <= this.currentBoxNumber; i++){
          console.log('dynamicDiv'+i)
          let refname = 'dynamicDiv'+i
          console.log(this.$refs[refname][0].innerHTML)
          let obj = {
            "audioConfig": {
              "audioEncoding": "MP3",
            },
            "input": {
              "ssml": "<speak>" + this.$refs[refname][0].innerHTML.replace(searchRegExp1, replaceWith1).replace(searchRegExp2, replaceWith2) + "</speak>"
            },
            "voice": {
              "languageCode": this.selectedLanguageCode[i-1],
              "name": this.selectedVoiceCode[i-1]
            }
          }
          arrayObj.push(obj);
        }
        console.log(arrayObj);
        return arrayObj;
      },

      getTestAudio()
      {
        this.$bvModal.show('modal-spinner');
        console.log("HERE")
        console.log(this.$refs.dynamicDiv1[0])
        console.log(this.raw2RequestBody());
        // console.log(this.$refs.dynamicDiv.innerHTML)
        this.axios.post('http://localhost:3000/test',this.raw2RequestBody()).then((res)=>{
          console.log("OK");
          console.log(res)
          this.$bvModal.hide('modal-spinner')
          
          this.voicerecord = res.data.url;
          var date =  new Date();
          this.listVoice.push({
                                date: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
                                title: this.voicerecord.substring(this.voicerecord.lastIndexOf('/') + 1),
                                artist: 'RubySmile',
                                src: this.voicerecord,
                                theme:'rgb(65, 184, 131)',
                                
                              })
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
        .catch((res)=>{
          this.$bvModal.hide('modal-spinner')
          if(res.status !== 200){
            this.$bvModal.show('modal-error');
          }
          console.log(res.response.data.err);
          this.responseErrorDetail = res.response.data.err.details;
        })
      },
      objSSML(id,maker,engine){ 
          this.id = id; 
          this.maker = maker; 
          this.engine = engine; 
      },
    }
}
</script>

<style>

</style>

<style scoped src="../assets/css/QnAMaker.css">
span {color: green;}
</style>