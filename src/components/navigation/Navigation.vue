<template>
  <div class="ui vertical menu navigation-container">
    <div class="item">
      <h4 is="sui-header">
        <sui-image src="https://semantic-ui-vue.github.io/static/images/avatar/small/lindsay.png"
                   shape="rounded" size="mini"/>
        <sui-header-content>
          {{ this.$store.state.userInfo.name }}
          <sui-header-subheader>{{ this.$store.state.userInfo.position }}</sui-header-subheader>
        </sui-header-content>
      </h4>
    </div>
    <div class="link item" v-for="menu of menuContainer" :key="menu.id">
      <router-link :to="{ name: menu.path }">
        <div>
          <span>{{ menu.content }}</span>
        </div>
      </router-link>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'navigation',

    data() {
      return {
        menuContainer: [
          {id: 1, content: '대시보드', path: 'index'},
          {id: 2, content: '근무 정보', path: 'work-time'},
          {id: 3, content: '스프린트 일정', path: 'weekly'},
          {id: 4, content: '일간 업무', path: 'daily'},
          {id: 5, content: '리포트 생성', path: 'report'},
        ],
      }
    },

    methods: {
      test() {
        console.log('Hi!');
      }
    }
  }
</script>

<style scoped>

</style>
