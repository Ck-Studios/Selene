<template>
  <div>
    <div class="ui labeled button" tabindex="0">
      <div v-if="!is_working" @click="start" class="ui green button">
        <i class="clock outline icon"></i> 시작
      </div>
      <div v-else @click="stop" class="ui red button">
        <i class="notched circle loading icon"></i> 중단
      </div>
      <a v-html="time" :class="{ green: !is_working, red: is_working }"
         class="ui basic left pointing label"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "stop-watch",

    data() {
      return {
        startTime: Date.now(),
        currentTime: Date.now(),
        interval: null,
      }
    },

    mounted() {
      this.$store.dispatch('loadMyAttendance');
      this.interval = setInterval(this.updateCurrentTime, 1000);
    },

    destroyed() {
      clearInterval(this.interval)
    },

    computed: {
      time() {
        return this.hours + ':' + this.minutes + ':' + this.seconds;
      },

      milliseconds() {
        return this.currentTime - this.$data.startTime + this.attendance;
      },

      hours() {
        let lapsed = this.milliseconds;
        let hrs = Math.floor((lapsed / 1000 / 60 / 60));
        return hrs >= 10 ? hrs : '0' + hrs;
      },

      minutes() {
        let lapsed = this.milliseconds;
        let min = Math.floor((lapsed / 1000 / 60) % 60);
        return min >= 10 ? min : '0' + min;
      },

      seconds() {
        let lapsed = this.milliseconds;
        let sec = Math.ceil((lapsed / 1000) % 60);
        return sec >= 10 ? sec : '0' + sec;
      },

      is_working() {
        return this.$store.state.account.is_working;
      },

      attendance() {
        return this.$store.state.account.attendance;
      }
    },

    methods: {
      updateCurrentTime() {
        if (this.$store.state.account.is_working) {
          this.$data.currentTime = Date.now();
        }
      },

      stop() {
        const self = this;
        this.$store.dispatch('saveMyAttendance', {type: 'stop'}).then(response => {
          self.startTime = Date.now();
          self.currentTime = Date.now();
          self.notifyIsWorking(self.$store.state.account)
        }).catch(error => {
          alert(`오류가 발생하였습니다.(${error})`);
        });
      },

      start() {
        const self = this;
        this.$store.dispatch('saveMyAttendance', {type: 'start'}).then(response => {
          self.startTime = Date.now();
          self.currentTime = Date.now();
          self.notifyIsWorking(self.$store.state.account);
        }).catch(error => {
          alert(`오류가 발생하였습니다.(${error})`);
        });
      },

      notifyIsWorking(worker) {
        if (Notification.permission !== "granted")
          Notification.requestPermission();

        else if (worker.is_working === true) {
          const notification = new Notification('Toast 알림', {
            icon: 'http://drive.google.com/uc?export=view&id=1AccyXEoVJpeA-07Bn0eID2mQEFO1vwQL',
            body: `${worker.realname}님이 근무를 중단하였습니다.`,
          });

          notification.onclick = function () {
            window.open("https://luna.devhi.me/selene/#/attendance");
          };
        }

        else if (worker.is_working === false) {
          const notification = new Notification('Toast 알림', {
            icon: 'http://drive.google.com/uc?export=view&id=1f6lPgBeP4T8x3SQgH1HuWh2jF8SaWUEC',
            body: `${worker.realname}님이 근무를 시작하였습니다.`,
          });

          notification.onclick = function () {
            window.open("https://luna.devhi.me/selene/#/attendance");
          };
        }
      }
    },
  }
</script>

<style scoped>

</style>
