<template>
  <div class="ui grid">
    <div class="ui inverted dimmer"> <!-- active -->
      <div class="ui large text loader">잠시만 기다려주세요...</div>
    </div>

    <h4 class="ui horizontal divider header">
      <i class="bar chart icon"></i>
      내 근무 통계
    </h4>

    <div class="ui centered">

      <div class="ui huge statistic">
        <div class="value">
          <span>{{ getMyMonthlySprintHours(my_account) }}</span>
        </div>
        <div class="label">
          스프린트 근무 시간
        </div>
      </div>

      <h4 class="ui horizontal divider header">
        <i class="tag icon"></i>
        다른 근무자 정보
      </h4>

      <div class="ui grid">
        <profile-card class="four wide column"
                      v-for="user of users"
                      :key="user.uuid"
                      :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
  import modal from 'vue-semantic-modal'
  import {mapState} from 'vuex'
  import StopWatch from "../stopwatch/StopWatch";
  import ProfileCard from "../profile/ProfileCard";

  export default {
    components: {
      modal,
      ProfileCard,
      StopWatch,
    },
    name: "attendance",

    data() {
      return {
        my_account: this.$store.state.account,
        // users: this.$store.state.users,
      }
    },

    created() {
      this.$store.dispatch('loadUsers')
    },

    mounted() {
      document.addEventListener('DOMContentLoaded', () => {
        if (!Notification) {
          alert('현재 사용중인 브라우저에서는 알림기능을 지원하지 않습니다. 다른 브라우저를 설치하세요.');
          return;
        }

        if (Notification.permission !== "granted")
          Notification.requestPermission();
      });
    },

    computed: mapState([
      'users'
    ]),

    methods: {
      getMyMonthlySprintHours(account) {
        if(account.realname){
          console.log(account);
          const lapsed = account.attendance;
          const hrs = Math.floor((lapsed / 1000 / 60 / 60));
          this.$store.dispatch('getMonthlyAttendance', account)
          return hrs >= 10 ? hrs : '0' + hrs;
        }
        return '계정 정보가 없습니다.'
      }
    }
  }
</script>

<style scoped>

</style>
