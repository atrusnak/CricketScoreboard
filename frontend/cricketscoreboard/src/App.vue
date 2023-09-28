<script setup>
import {ref} from 'vue'

const numPlayers = 4
const playerNames = ref(['Name','Name','Name','Name'])
const scores = ref([])
const totalScores = ref([])
const scoreNumbers = ref([15,16,17,18,19,20,25])
const scoreNames = ref([15,16,17,18,19,20,'B'])
const buttonColors = ref(['white', 'lightgreen', 'orange', 'red'])

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
  checkWin()
}

function checkWin() {
  for (let i = 0; i < numPlayers; i++) {
    const sum = scores.value[i].reduce((a,b) => a+b,0);
    if (sum >= scores.value[i].length*3 && totalScores.value[i]==Math.max(...totalScores.value)) {
      alert(playerNames.value[i] + ' wins!')
    }
  }
}

async function saveScore() {
  const scoreRecord = {
    names: playerNames.value,
    totalScores: totalScores.value,
    scores: scores.value
  }
  const response = await fetch("SOMEURL", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scoreRecord), 
  });
  console.log(response.json()); // parses JSON response into native JavaScript objects
}

</script>

<template>
  <header>
  </header>

  <main>
    <table>
      <thead>
        <tr>
          <td>
            <button @click=saveScore()>Save Score</button>
          </td>
          <td>
            <input v-model="playerNames[0]">
          </td>
          <td>
            <input v-model="playerNames[1]">
          </td>
          <td>
            <input v-model="playerNames[2]">
          </td>
          <td>
            <input v-model="playerNames[3]">
          </td>
        </tr>
        <tr>
        <td class="scoreNum">Total Score</td>
        <td class="scoreNum" v-for="(total, index) in totalScores">
          {{ total }}
        </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(scoreNumber, scoreIndex) in scoreNumbers">
          <td class="scoreNum">{{ scoreNames[scoreIndex] }}</td>
          <td class="scoreRow" v-for="(player,playerIndex) in scores">
            <button :style="{'background-color': buttonColors[player[scoreIndex]]}" @click="incrementScore(playerIndex,scoreIndex)">
              {{ player[scoreIndex]}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
* {
  box-sizing: content-box;
  font-size: 3vh;
}
main {
  width: 100%;
  align-content: center;
}
table {
  position: absolute;
  table-layout: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-collapse: collapse;
}
tr {
  height: 10%;
  width: 100%
}
td {
  height: 10%;
  text-align: center;
}

.scoreRow{
  height: 10%;
  border: 1px solid #ccc;
}
.closed {
  background-color: red;
}
.scoreNum {
  height: 10%;
  border: 1px solid #ccc;
  font-weight: bold;

}

button {
  width: 95%;
  height: 95%;
  margin: 2px;
}
</style>