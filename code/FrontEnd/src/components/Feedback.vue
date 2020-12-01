<template>
  <div id="qna">
    <div class="container-fluid dashboard">


      <div class="row">

        <div class="col-lg-9 col-sm">
          <div class="card center-div" id="maker" ref="maker" >
            <center>
              <h4 id="title">Please give us feedback</h4>
            </center>
            <b-row class="my-0">
            
            </b-row>
            <b-row class="my-0">
              <b-col sm="6">
                <b-row>
                    <b-col sm="6">
                        <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
                    </b-col>
                    <b-col sm="6">
                        <b-form-input v-model="text" placeholder="Enter your email"></b-form-input>
                    </b-col>
                </b-row>
                <b-form-rating v-model="value"></b-form-rating>
              </b-col>
              <b-col sm="1">
              </b-col>
              <b-col sm="12">
                <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                ></b-form-textarea>
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="sendMsg()">Submit</b-button>
              </div>
            </div>

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