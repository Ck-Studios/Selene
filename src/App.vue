<template>
  <div id="app">
    <div class="ui stackable container menu">
      <div class="item">
        DevHi Luna
        <!--<img src="assets/images/logo.png">-->
      </div>

      <div class="ui simple dropdown item">
        계정 관리 <i class="dropdown icon"></i>
        <div class="menu">
          <div v-if="this.$store.state.account.uuid">
            <a class="item" href="#">
              <span v-text="this.$store.state.account.realname"></span>님
            </a>
            <a class="item" href="#" @click="logout">로그아웃</a>
          </div>
          <div v-else>
            <router-link :to="{ name: 'login' }">
              <a class="item" href="#">로그인</a>
            </router-link>
          </div>
        </div>
      </div>

      <div class="ui simple dropdown item">
        업무 관리 <i class="dropdown icon"></i>
        <div class="menu">
          <div class="header">근무 관리</div>
          <router-link :to="{ name: 'attendance' }">
            <a class="item" href="#">근무 시간 관리</a>
          </router-link>
          <div class="divider"></div>
          <div class="header">업무 관리</div>
          <router-link :to="{ name: 'sprint' }">
            <a class="item" href="#">스프린트 관리</a>
          </router-link>
          <router-link :to="{ name: 'daily' }">
            <a class="item" href="#">일간 업무 관리</a>
          </router-link>
          <router-link :to="{ name: 'sprint-view' }">
            <a class="item" href="#">모든 스프린트 보기</a>
          </router-link>
        </div>
      </div>

      <div class="ui simple dropdown item">
        투표하기 <i class="dropdown icon"></i>
        <!--<div class="menu">-->
          <!--<div class="header"></div>-->
          <!--<router-link :to="{ name: 'attendance' }">-->
            <!--<a class="item" href="#">근무 시간 관리</a>-->
          <!--</router-link>-->
          <!--<div class="divider"></div>-->
          <!--<div class="header">업무 관리</div>-->
          <!--<router-link :to="{ name: 'sprint' }">-->
            <!--<a class="item" href="#">스프린트 관리</a>-->
          <!--</router-link>-->
          <!--<router-link :to="{ name: 'daily' }">-->
            <!--<a class="item" href="#">일간 업무 관리</a>-->
          <!--</router-link>-->
        <!--</div>-->
      </div>

      <div v-if="this.$store.state.account.uuid" class="right item">
        <stop-watch/>
        <!--<a class="ui button">Log in</a>-->
        <!--<a class="ui button">Sign Up</a>-->
      </div>
    </div>

    <div id="main-container" class="ui stackable container">
      <div class="item">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskList from './components/task/TaskList'
  import Navigation from './components/navigation/Navigation'
  import StopWatch from "./components/stopwatch/StopWatch";

  export default {
    name: 'App',
    components: {
      StopWatch,
      TaskList,
      Navigation,
    },
    data() {
      return {
        nickname: this.$store.state.account.nickname,
      }
    },
    methods: {
      logout() {
        this.$store.state.account.uuid = '';
      },
    },

    mounted() {
      this.$store.dispatch('loadSession');
    },
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    padding: 30px;
  }

  #main-container {
    padding-top: 20px;
  }
</style>
