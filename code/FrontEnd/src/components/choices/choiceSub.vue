<template>
  <div>
    <b-button :hidden="state" @click="remove()">{{value[0]}}</b-button>
    <b-form-checkbox-group
      v-model="value"
      :options="options"
      :state="state"
      :hidden="!state"
      stacked
      name="checkbox-validation"
    >
    </b-form-checkbox-group>
    <b-button @click="onClickSave()">SAVE</b-button>
  </div>
</template>

<script>
import construct from '../lib/contruct'
export default {
  data(){
    return{
      tempData:construct,
      totalSum : 0,
      value : [],
      checkboxData:{
        p:0,
        paragraph:0,
        say_as:0,
        emphasis:0,
        prosody:0,
        break:0,
        audio:0,
        desc:0,
        mark:0
      },
      sum:0,
      options: [
          { text: 'p', value: 'p' },
          { text: 'paragraph', value: 'paragraph' },
          { text: 'say_as', value: 'say_as' },
          { text: 'emphasis', value: 'emphasis' },
          { text: 'prosody', value: 'prosody' },
          { text: 'break', value: 'break' },
          { text: 'audio', value: 'audio' },
          { text: 'desc', value: 'desc' },
          { text: 'mark', value: 'mark' },
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
    remove(){
      this.value = []
      this.$emit("removechoiceSSML");
},
    whatLL(){
      console.log("OKKKKKKKK")
    },
    assignData(){
      this.checkboxData.p = this.$store.getters.listSSML[this.$store.getters.currentID].p.isActive;
      this.checkboxData.paragraph = this.$store.getters.listSSML[this.$store.getters.currentID].paragraph.isActive;
      this.checkboxData.say_as = this.$store.getters.listSSML[this.$store.getters.currentID].say_as.isActive;
      this.checkboxData.emphasis = this.$store.getters.listSSML[this.$store.getters.currentID].emphasis.isActive;
      this.checkboxData.prosody = this.$store.getters.listSSML[this.$store.getters.currentID].prosody.isActive;
      this.checkboxData.break = this.$store.getters.listSSML[this.$store.getters.currentID].break.isActive;
      this.checkboxData.audio = this.$store.getters.listSSML[this.$store.getters.currentID].audio.isActive;
      this.checkboxData.desc = this.$store.getters.listSSML[this.$store.getters.currentID].desc.isActive;
      this.checkboxData.mark = this.$store.getters.listSSML[this.$store.getters.currentID].mark.isActive;
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