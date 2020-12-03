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
                        <b-form-input v-model="user.name" placeholder="Enter your name"></b-form-input>
                    </b-col>
                    <b-col sm="6">
                        <b-form-input v-model="user.email" placeholder="Enter your email"></b-form-input>
                    </b-col>
                </b-row>
                <b-form-rating v-model="user.rating"></b-form-rating>
              </b-col>
              <b-col sm="1">
              </b-col>
              <b-col sm="12">
                <b-form-textarea
                id="textarea"
                v-model="user.feedback"
                placeholder="Enter something..."
                ></b-form-textarea>
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="submitFeedback()">Submit</b-button>
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
    <b-modal id="modal-spinner" centered title="Submiting Feedback" hide-footer hide-header no-close-on-backdrop no-close-on-esc >
      <div>
        <b-spinner label="Submiting Feedback..."></b-spinner>
      </div>
    </b-modal>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Feedback',
    components : {
    },
    data() {
      return {
        box:false,
        user:{
          name:"",
          email:"",
          rating:0,
          feedback:""
        }
      }
    },
    methods:{
      async submitFeedback(){
        this.$bvModal.show('modal-spinner');
        var res = await axios({
          method: 'post',
          url: 'http://localhost:3000/testnewfeedback',
          data: {data:[this.user.name,this.user.email,this.user.rating,this.user.feedback]}
        });
        if(res.status === 200){
          this.$bvModal.hide('modal-spinner')
        }
      },
    }
}
</script>

<style>

</style>

<style scoped src="../assets/css/QnAMaker.css">
span {color: green;}
</style>