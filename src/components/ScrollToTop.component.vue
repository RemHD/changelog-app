<template>
  <button ref="myButtonRef" id="button-top" title="Go to top" @click="topFunction">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="12" width="12" class="white-svg">
      <path
        d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"
      ></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myButtonRef = ref<HTMLButtonElement | null>(null)

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
}

const scrollFunction = () => {
  if (myButtonRef.value) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      myButtonRef.value.style.display = 'block'
    } else {
      myButtonRef.value.style.display = 'none'
    }
  }
}

const topFunction = () => {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
</script>

<style scoped>
.white-svg {
  fill: white;
}

#button-top {
  display: none;
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
}

#button-top:hover {
  background-color: #555; /* Add a dark-grey background on hover */
}
</style>
