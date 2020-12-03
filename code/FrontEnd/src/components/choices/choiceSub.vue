<template>
  <div>
    <b-button :hidden="state" @click="remove()">{{value[0]}}</b-button>
    <!-- <b-form-checkbox-group
      v-model="value"
      :options="options"
      :state="state"
      :hidden="!state"
      stacked
      name="checkbox-validation"
    >
    </b-form-checkbox-group> -->
     <b-form-radio-group
        id="radio-group-1"
        v-model="selectedSSML"
        :options="options"
        name="radio-inline"
        stacked
      ></b-form-radio-group>
      ------------------------
      <div v-if="selectedSSML == 'say_as'">
          {{selectedSSML}}
          <b-form-radio-group
          v-model="valueOptionSSML.say_as.interpret_as"
          :options="optionsSayAs"
          stacked
        ></b-form-radio-group>
      </div>
      <div v-if="selectedSSML == 'emphasis'">
          {{selectedSSML}}
          <b-form-radio-group
          v-model="valueOptionSSML.emphasis.level"
          :options="optionsEmphasis"
          stacked
        ></b-form-radio-group>
      </div>
      <div v-if="selectedSSML == 'prosody'">
          {{selectedSSML}}
          <b-form-radio-group
          v-model="valueOptionSSML.prosody.rate"
          :options="optionsProsody"
          stacked
        ></b-form-radio-group>
        <b-form-input v-model="valueOptionSSML.prosody.pitch" min="-50" max="50" type="range"></b-form-input>
        <b-form-input v-model="valueOptionSSML.prosody.volume" min="-50" max="50" type="range"></b-form-input>
      </div>
      <div v-if="selectedSSML == 'break'">
          {{selectedSSML}}
          <b-form-radio-group
          v-model="valueOptionSSML.break.strength"
          :options="optionsBreak"
          stacked
        ></b-form-radio-group>
        <b-form-input v-model="valueOptionSSML.break.time" type="number"></b-form-input>
      </div>
      {{valueOptionSSML.prosody.pitch}}
    <b-button v-if="selectedSSML != ''" @click="onClickSave()">SAVE</b-button>
  </div>
</template>

<script>
import construct from '../lib/contruct'
export default {
  data(){
    return{
      // selectedSSML:"",
      tempData:construct,
      totalSum : 0,
      value : [],
      selectedSSML:"",
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
  watch:{
    state(new_val){
      console.log(this.value[0])
      if(new_val === false)
      {
        console.log(new_val)
        this.$store.dispatch('ssml/changeOption', {key:'choosenTag',value:this.value[0]});
        console.log("'ssml/changeOption'" + this.$store.getters.choosenTag)
        this.$emit("choosen");
      }
    }
  },
  computed:{
    state() {
        return this.value.length < 1
      },
  },
  methods:{
    createObjChoice(){
      return {
        SSML: this.selectedSSML,
        options: this.valueOptionSSML[this.selectedSSML]
      }
    },
    remove(){
      this.value = []
      this.$emit("removechoiceSSML");
},

    assignData(){
      for(var i = 0; i < 4; i++)
      {
        if(this.$store.getters.listSSML[this.$store.getters.currentID][this.options.value].isActive){
          this.selectedSSML = this.options.value;
          break;
        }
      }
    },
    getData(data){
      this.tempData = data
      this.tempData = this.$store.getters.listSSML[this.$store.getters.currentID];
      this.assignData();
      console.log("choiceSub");
      console.log(this.tempData)
    },
    onClickSave(){
      console.log(this.tempData.p)
      this.$store.dispatch('ssml/pushSSML', this.checkboxData);
      this.$emit("transferObjFromChoice")
    },
    setData(){
      this.$emit("transferObjFromChoice")
      
    }
  }
}
</script>

<style>

</style>