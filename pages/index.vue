<script setup>
const copied = ref(false)
const longURL = ref(null)

const { timeLeft, startTimer, formattedTimer } = timeStatus()
const { fetchData, isLoading, shortendLink, slug, url } = fetchAPI()

const copyLink = ()=>{
    copied.value = true;
    navigator.clipboard.writeText(shortendLink.value)
    setTimeout(() => {
        copied.value = false
    }, 1000);
}

onMounted(()=>{
    //alert('This project is all made by HP (Hussain Panahy)!')

    const timeState = JSON.parse(localStorage.getItem('timeLeft'))
    if(timeState){
        timeLeft.value = timeState?.timeLeft;
        formattedTimer.value = timeState?.formattedTimer
        startTimer()
    }
})
</script>

<template>
  <div class="body">
    <div class="mainContainer" :class="shortendLink ? 'active':''">
      <div class="secondaryContainer">
        <div class="grid lg:block place-items-center">
          <h1 class="w-[14em] text-4xl font-bold text-center lg:text-start">
            The Most Simple URL Shortener Ever !
          </h1>
          <p class="text-sm w-96 my-4">
            Shorten any URL link in a matter of a few seconds without any toil
            and having to registrate or watch any annoying ads. All for Free,
            All for YOU.
          </p>
          <div class="flex flex-col mt6">
            <input
              type="text"
              placeholder="e.g. https://hp-us.vercel.app/"
              v-model="url"
            />
            <small>Paste or type your URL link to shorten.</small>

            <input type="text" placeholder="myFavouriteSlug" v-model="slug">
            <small>Choose your desired slug (optional)</small>

            <div class="flex flex-col" v-show="shortendLink">
                <span class="text-sm mt-4 mb-1 font-semibold">Your Bitly shortend link :</span>
                <div class="relative w-fit">
                <input type="text" class="inp2" v-model="shortendLink" readonly>
                <i :class="copied ? 'fa-solid fa-check':'fa-solid fa-copy'" @click="copyLink" />
            </div>
            </div>
            <button
              @click="fetchData()"
              :class="isLoading || timeLeft ? 'active' : ''"
              :disabled="timeLeft"
            >
              <div v-if="timeLeft === 0" class="flex gap-2">
                <img src="/spinner.svg" class="w-6" v-show="isLoading" />
                Shorten
              </div>
              <div v-else>{{ formattedTimer }}</div>
            </button>
          </div>
        </div>
        <div>
          <img src="/download.svg" class="w-44" />
          <h1 class="text-7xl font-bold text-center py-10 brand">Bitly</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="h-96"></div>
</template>

<style scoped>
.body {
  @apply place-items-center grid bg-slate-200 w-full h-screen;
}
.mainContainer {
  @apply relative overflow-hidden shadow-xl text-white rounded-xl mx-auto w-[30em] lg:w-[50em]
  lg:h-[30em] bg-gradient-to-br from-orange-500 to-orange-700;
}
.mainContainer.active{
    @apply h-[35em]
}
.secondaryContainer {
  @apply flex flex-col-reverse lg:flex-row items-center px-16 py-20;
}
input {
  @apply rounded w-80 h-10 px-4 text-black outline-none focus:ring-2 ring-orange-400 mb-0;
}
.inp2{
    @apply w-72 focus:ring-0
}
.fa-solid{
    @apply text-orange-600 absolute right-2 top-1/2 -translate-y-5 text-lg cursor-pointer 
}
button {
  @apply bg-white text-orange-600 font-bold w-fit mt-3 rounded-lg px-4 py-2;
}
button.active {
  @apply opacity-60;
}
.brand {
  font-family: "Lobster";
}
small{
  @apply pb-3 pt-0.5
}
</style>
