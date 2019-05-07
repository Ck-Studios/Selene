<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <!--<img src="assets/images/logo.png" class="image">-->
        <div class="content">
          DevHi Luna 계정 인증
        </div>
      </h2>
      <form class="ui large form">

        <div class="ui stacked segment">

          <div v-if="loginError" class="ui negative message">
            <div class="header">
              인증에 실패하였습니다.
            </div>
            <p>아이디 또는 비밀번호를 확인하세요.
            </p></div>

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="username" type="text" placeholder="루나 아이디">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" placeholder="비밀번호">
            </div>
          </div>

          <div @click="login" class="ui fluid large teal submit button">로그인</div>
        </div>

      </form>

      <div class="ui message">
        루나에는 허가된 사용자만 접근할 수 있습니다. <a href="#" onclick="alert('준비중입니다.');">접근 권한 요청하기</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginError: false,
        username: "",
        password: "",
      }
    },
    methods: {
      login() {
        self = this;

        this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        }).then(response => {
          self.$router.push('attendance');
        }).catch(error => {
          self.loginError = true;
        });
      }
    },
  }
</script>

<style scoped>

</style>
