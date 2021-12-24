<template>
  <section class="dropdown__menu">
    <div class="dropdown-header" >
        <slot name="header">
        </slot>
    </div>
    <div class="dropdown__menu-header" ref="menu" @click="openClose($event)">
    </div>
    <section class="dropdown__menu-body" ref="body" v-if="isOpen" :class="styleList">
        <slot name="body"></slot>
    </section>
  </section>
</template>

<script>
export default {
  name: "dropdown",
  props: ['styleList'],
  data(){
    return{
      isOpen: false,
    }
  },
  methods:{
    close(){
      this.isOpen = false
    },
    openClose(e) {
      var _this = this
      const closeListerner = (e) => {
        // Check if user clicks outside of the menu
        // true — close the menu and remove EventListener
        if ( _this.catchOutsideClick(e, _this.$refs.menu, _this.$refs.body ) ){
          window.removeEventListener('click', closeListerner) , _this.isOpen = false
        }
      }
      // Add event listener to watch clicks outside the menu
      window.addEventListener('click', closeListerner)
      // Close if open and vice versa
      this.isOpen = !this.isOpen
    },
    catchOutsideClick(event, dropdown, body)	{
      if( dropdown == event.target ){
        return false
      }
      if( this.hasParentWithMatchingSelector(event.target, '.dropdown__menu-body')){
        return false
      }

      // console.log(body)
      // console.log(event.target)
      // When user clicks outside of the menu — close the menu
      // (!this.hasParentWithMatchingSelector(event.target, 'dropdown__menu-body') && event.target.classList.contains(".link"))
      if( this.isOpen && dropdown != event.target){
        return true
      }
    },
    hasParentWithMatchingSelector (target, selector) {
      return [...document.querySelectorAll(selector)].some(el =>
        el !== target && el.contains(target)
      )
    }
  }
}
</script>

<style scoped>
.dropdown__menu{
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dropdown__menu-header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: unset;
  border: 0;
}
.dropdown__menu-body{
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  z-index: 15;
}
.right_0{
  left: initial!important;
  right: 0!important;
}

@media (max-width: 850px) {
  .pos__static{
    position: static;
  }
}
</style>
