<template>
  <div id="profile-card-container" v-if="user.attendance">
    <div class="ui card">
      <div class="content">
        <a v-if="user.is_working" class="ui green right ribbon label">근무중</a>
        <a v-else class="ui red right ribbon label">근무중이 아님</a>
        <div class="header">
          {{ user.realname }}
        </div>
        <div class="meta">
          {{ user.position }}
        </div>
      </div>
      <div class="content">
        <h4 class="ui sub header">근무 정보</h4>
        <div class="ui small feed">

          <div class="event">
            <div class="content">
              <div class="summary">
                <span v-if="user.is_working">현재 근무중입니다.</span>
                <span v-else>현재 근무중이 아닙니다.</span>
              </div>
            </div>
          </div>

          <div class="event">
            <div class="content">
              <div class="summary">
                <span>이번 주 {{ hours }}시간 {{ minutes }}분 {{ seconds }}초 근무하였습니다.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--<div class="extra content">-->
        <!--<button class="ui button">상세정보 보기</button>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "profile-card",
    props: ['user'],

    data () {
      return {
        is_loaded: false,
        test : 'test',
      }
    },

    computed: {
      hours() {
        const lapsed = this.user.attendance;
        const hrs = Math.floor((lapsed / 1000 / 60 / 60));
        return hrs >= 10 ? hrs : '0' + hrs;
      },

      minutes() {
        const lapsed = this.user.attendance;
        const min = Math.floor((lapsed / 1000 / 60) % 60);
        return min >= 10 ? min : '0' + min;
      },

      seconds() {
        const lapsed = this.user.attendance;
        const sec = Math.ceil((lapsed / 1000) % 60);
        return sec >= 10 ? sec : '0' + sec;
      },
    },

    methods: {

    }
  }
</script>

<style scoped>

</style>
