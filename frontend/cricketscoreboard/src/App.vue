<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import {ref} from 'vue'

const numPlayers = 4
const scores = ref([])
const totalScores = ref([])
const scoreNumbers = ref([15,16,17,18,19,20,25])

for (let i = 0; i < numPlayers; i++) {
  scores.value.push(Array(scoreNumbers.value.length).fill(0))
  totalScores.value.push(0)
}

function incrementScore(playerIndex, scoreIndex) {
  if(scores.value[playerIndex][scoreIndex] < 3) {
    scores.value[playerIndex][scoreIndex]++
  } else {
    totalScores.value[playerIndex] += scoreNumbers.value[scoreIndex]
  }
}

</script>

<template>
  <header>
  </header>

  <main>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Name</th>
          <th>Name</th>
          <th>Name</th>
        </tr>
        <tr v-for="(scoreNumber, scoreIndex) in scoreNumbers">
          <td>{{ scoreNumber }}</td>
          <td v-for="(player,playerIndex) in scores">
            <button @click="incrementScore(playerIndex,scoreIndex)">{{ player[scoreIndex]}}</button>
          </td>
        </tr>
        <tr>
          <td v-for="(total, index) in totalScores">
            {{ total }}
          </td>
        </tr>
      </thead>
    </table>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
