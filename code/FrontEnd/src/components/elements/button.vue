<template>
 <header>
  <input type="checkbox" id="checkbox" v-model="checkbox">
 </header>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      checkbox: false
    };
  },
  watch: {
    checkbox: function() {
      // Emit this information to the parents component
      this.$emit("child-checkbox", this.checkbox);
    }
  }
};
</script>