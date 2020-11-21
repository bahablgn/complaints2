<template lang="html">
  <div class="chat container">
    <div class="center">
      <router-link to="/" class="btn green">Return to HOME</router-link>
    </div><br>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li class="chat-message" v-for="message in messages" :key="message.id">
            <div class="right-bubble" v-if="message.name === name">
              <span class="green-text">{{ message.name }}&nbsp;</span>
              <span class="grey-text text-darken-3">{{ message.content }}</span>
              <span class="grey-text time">{{ message.timestamp | moment }}</span>
            </div>
            <div class="left-bubble right-align" v-if="message.name !== name">
              <span class="green-text">{{ message.name }}&nbsp;</span>
              <span class="grey-text text-darken-3">{{ message.content }}</span>
              <span class="grey-text time">{{ message.timestamp | moment }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-content">
        <form @submit.prevent="addMessage">
          <label>New Message from {{ name }} (enter to add):</label>
          <input type="text" v-model="newMessage"/>
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn green" name="button">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/db2'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Chat',
  props: ['name'],
  data () {
    return {
      newMessage: null,
      feedback: null
    }
  },
  computed: mapState([
    'messages'
  ]),
  mounted () {
    this.getMessage()
  },
  filters: {
    moment: function (date) {
      return moment(date).format('lll')
    }
  },
  methods: {
    getMessage () {
      this.$store.dispatch('loadMessages')
    },
    async addMessage () {
      if (this.newMessage) {
        await db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        })
        this.newMessage = ''
        this.feedback = ''
      } else {
        this.feedback = 'you must enter a message'
      }
    }
  }
}
</script>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';

.container {
  border-radius: 5px;
}
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
.chat-message {
  width: 80%;
  min-height: 40px;
}
.chat-message .right-bubble {
  position: relative;
  background: #dcf8c6;
  border-top-left-radius: .4em;
  border-bottom-left-radius: .4em;
  border-bottom-right-radius: .4em;
  padding: 5px 10px 10px;
  margin-bottom: 10px;
  left: 50%;
  width: 70%
}
.chat-message .right-bubble:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #dcf8c6;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.chat-message .left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: .4em;
  border-bottom-left-radius: .4em;
  border-bottom-right-radius: .4em;
  padding: 5px 10px 10px;
  margin-bottom: 10px;
  left: 5%;
  width: 70%;
}
.chat-message .left-bubble:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}
</style>
