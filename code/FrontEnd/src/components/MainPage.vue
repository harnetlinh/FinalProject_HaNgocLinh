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
                <contenteditableDiv
                  ref="contentEditableDiv"
                  @transferObjFromContent="middleContent2Choice"
                  @transferObjFromChoice="middleChoice2Content"
                >
                </contenteditableDiv>
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="sendMsg()">Submit</b-button>
                <b-button @click="merge()"> TEST MEGR</b-button>
                <b-button @click="forceUpdate()">FORCE UPDATE</b-button>
                <b-button @click="gettext()">GET TEXT</b-button>
                <b-button @click="red()">HIGHTLIGHT TEXT</b-button>
                <b-button @click="getTestAudio()">getTestAudio</b-button>
                <b-button @click="getTestFeedback()"> FEED BACK</b-button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-3 col-sm">
          <div class="card center-div overflow-auto" style="" >
              <b-col sm="15">
                <!-- <ul style="list-style-type:none;">
                  <li> -->
                    <choiceSub ref="choiceSubComponent"
                    @removechoiceSSML="removeSSMLbyID"
                    @choosen="red"
                    ></choiceSub>
                  <!-- </li>
                </ul> -->
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
          // "whatever",
          // {start: 2, end: 5, style:"background-color:#f330ff"}
        ],
        test:'',
      highlightEnabled: true,
      choiceSSML:choiceSub
      }
    },
    mounted() {
    // window.addEventListener('mouseup', this.highlighter);
    this.test = compo;
  },
    methods:{
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
      red(){
        this.$refs.contentEditableDiv.addSSML();
      },
      middleContent2Choice(){
        this.$refs.choiceSubComponent.getData()
      },
      middleChoice2Content(){
        this.$refs.contentEditableDiv.getData()
      },
      gettext(){
        this.$refs.contentEditableDiv.getContent();
      },
      removeSSMLbyID(){
        this.$refs.contentEditableDiv.unwrapSSML_byID();
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