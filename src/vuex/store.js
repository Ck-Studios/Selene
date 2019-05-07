import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.use(Vuex);
Vue.use(VueSession);

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// let csrf_token = null;
//
// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   config.headers = {"X-CSRFToken": csrf_token};
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
//
// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   csrf_token = /csrftoken\=([^\s]+)/.exec(document.cookie)[1];
//   console.log(csrf_token);
//
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export const store = new Vuex.Store({
  state: {
    api: {
      endpoint: 'https://luna.devhi.me/api',
      // endpoint: 'http://127.0.0.1:8050/api',
    },

    // menuContainer: [
    //   {id: 1, content: '대시보드', path: 'index'},
    //   {id: 2, content: '근무 정보', path: 'work-time'},
    //   {id: 3, content: '스프린트 일정', path: 'weekly'},
    //   {id: 4, content: '일간 업무', path: 'daily'},
    //   {id: 5, content: '리포트 생성', path: 'report'},
    // ],

    mySprintTask: [
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-02T18:07:08.579664+09:00",
      //   "work": "Intro Screen 개발",
      //   "hour": 5,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-02T18:07:08.579664+09:00",
      //   "work": "Notice 파일 표시 처리",
      //   "hour": 1,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-03T18:07:08.579664+09:00",
      //   "work": "Activity Layout 수정",
      //   "hour": 1,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-03T18:07:08.579664+09:00",
      //   "work": "App 실행시 Archive 동기화",
      //   "hour": 3,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-04T18:07:08.579664+09:00",
      //   "work": "비즈니스 로직 분리",
      //   "hour": 3,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-05T18:07:08.579664+09:00",
      //   "work": "MobX 적용 검토",
      //   "hour": 2,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-05T18:07:08.579664+09:00",
      //   "work": "Modal 컴포넌트 함수로 전환",
      //   "hour": 1,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
      // {
      //   "assign_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "review_user_uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   "id": 9,
      //   "plan_datetime": "2018-03-03T18:07:08.579664+09:00",
      //   "week": 2,
      //   "day": "2018-07-05T18:07:08.579664+09:00",
      //   "work": "src 디렉토리 간소화",
      //   "hour": 3,
      //   "is_complete": false,
      //   "complete_datetime": null,
      //   "is_confirm": false
      // },
    ],

    sprintTask: [
      // {
      //   assign_user_uuid: "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   review_user_uuid: "d9487e3f-baca-4a4c-975b-b465e1838b8b",
      //   id: 9,
      //   plan_datetime: new Date("2018-03-03T18:07:08.579664+09:00"),
      //   week: 2,
      //   day: null,
      //   work: "공부",
      //   hour: 20,
      //   is_complete: false,
      //   complete_datetime: null,
      //   is_confirm: false
      // },
    ],

    account: {
      // uuid: '',
      // realname: '박찬규',
      // attendance: 10,
      // is_working: false,
    },

    users: [
      // {uuid: "2ee36b10-8fd6-4c3c-8cb1-d3e40d24a061", realname: "박찬규", position: "프론트엔드/IOS 개발자", attendance: "150509550", is_working: true},
      // {"uuid": "5a91f29d-1ca1-47b4-ba00-7ebedd145bf6", "realname": "이남진", "position": "영업/마케팅", attendance: "120100200", is_working: true},
      // {"uuid": "d9487e3f-baca-4a4c-975b-b465e1838b8b", "realname": "정국영", "position": "인간 디버거", attendance: "130040030", is_working: false},
      // {"uuid": "70d42a6c-2b6c-42b9-849c-4e045b11c6f6", "realname": "배요한", "position": "인공지능 연구원", attendance: "152003000", is_working: false},
      // {"uuid": "8700b1a6-561c-48a2-b8c4-c515cf2370a6", "realname": "오정환", "position": "안드로이드 개발자", attendance: "145004000", is_working: true}
    ],
  },


  mutations: {
    login(state, payload) {
      state.account.uuid = payload.uuid;
      state.account.realname = payload.realname;
    },

    updateUsers(state, users) {
      self = this;
      state.users = users;

      users.forEach(user => {
          self.dispatch('loadUserAttendance', user);
        }
      );
    },

    updateUser(state, payload) {
      const user = payload;
      const index = state.users.findIndex(find_user => {
        return find_user.uuid === user.uuid;
      });
      Vue.set(state.users, index, user);
      state.users = JSON.parse(JSON.stringify(state.users));
    },

    updateAccount(state, payload) {
      Object.assign(state.account, payload.account);
      state.account = JSON.parse(JSON.stringify(state.account));
    },

    loadMyTask(state, payload) {
      state.mySprintTask = payload;
    },

    loadAllSprintTask(state, payload) {
      state.sprintTask = payload;
    },

    addTask(state, payload) {
      const task = payload;
      const date = new Date();

      Object.assign(task, {plan_datetime: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`});
      state.mySprintTask = [task, ...state.mySprintTask];
    },

    updateMyTask(state, payload) {
      const modified_task = payload;

      state.mySprintTask = state.mySprintTask.map(current_task => {
        return current_task.id === modified_task.id ?
          Object.assign(current_task, {
            work: modified_task.work,
            hour: modified_task.hour,
            day: modified_task.day,
            is_complete: modified_task.is_complete,
            is_confirm: modified_task.is_confirm
          }) : current_task
      });
    },

    removeMyTask(state, task_id) {
      state.mySprintTask = state.mySprintTask.filter(task => task.id !== task_id);
    },

    addToDailyTask(state, payload) {
      const _task = payload.task;
      const _today = payload.today;

      state.mySprintTask = state.mySprintTask.map(task => task.id === _task.id ? Object.assign(task, {plan_datetime: _today}) : task);
    },

  },

  actions: {
    login(context, payload) {
      const self = this;

      setTimeout(() => {
        axios.post(`${self.state.api.endpoint}/login`, {
          username: payload.username,
          password: payload.password,
        })
          .then(response => {
            const data = response.data;
            context.commit('login', {uuid: data.uuid, realname: data.realname});
          })
          .catch(error => {
            console.log(error);
          });
      }, 1);
    },

    loadSession(context) {
      axios.get(`${this.state.api.endpoint}/login`)
        .then(response => {
          const data = response.data;
          context.commit('login', {uuid: data.uuid, realname: data.realname});
        })
        .catch(error => {
          console.log(error);
        });
    },

    loadUsers(context) {
      self = this;

      axios.get(`${this.state.api.endpoint}/users`)
        .then(response => {
          const users = response.data.results;
          context.commit('updateUsers', users);
        })
        .catch(error => {
          console.log(error);
        });
    },

    loadUserAttendance(context, user) {
      axios.get(`${this.state.api.endpoint}/attendance/${user.uuid}`)
        .then(response => {
          const data = response.data;
          const _user = Object.assign({}, user, {attendance: data.attendance, is_working: data.is_working});

          context.commit('updateUser', _user);
        })
    },

    loadMyAttendance(context) {
      axios.get(`${this.state.api.endpoint}/attendance`)
        .then(response => {
          const data = response.data;
          context.commit('updateAccount', {account: data});
        })
        .catch(error => {
          console.log(error);
        })
    },

    loadAllSprintTask(context) {
      const self = this;
      const date = new Date();
      axios.get(`${self.state.api.endpoint}/task/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
        .then((response) => {
          context.commit('loadAllSprintTask', response.data.results);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },

    saveMyAttendance(context, payload) {
      const self = this;
      const type = payload.type;

      axios.get(`${self.state.api.endpoint}/attendance?${type}`)
        .then(response => {
          const data = response.data;
          context.commit('updateAccount', {account: data});
        })

        .catch(error => {
          console.log(error);
        })
    },

    getMonthlyAttendance(context, payload) {
      const self = this;
      const user_id = payload.uuid;
      const date = new Date();

      axios.get(`${self.state.api.endpoint}/attendance/${user_id}/${date.getFullYear()}/${date.getMonth() + 1}`)
        .then(() => {

        })

        .catch(error => {
          console.log(error);
        })
    },

    addTask(context, payload) {
      const task = payload;
      const self = this;
      console.log(task.day);

      axios.post(`${self.state.api.endpoint}/task/${self.state.account.uuid}`, {
        work: task.work,
        hour: task.hour,
        day: task.day,
        review_user: task.review_user
      })
        .then(response => {
          console.log(response);
          context.commit('addTask', task);
        })
        .catch(error => {
          console.log(error);
        })
    },

    loadMyTask(context) {
      const self = this;
      const date = new Date();
      console.log(date.getMonth());

      axios.get(`${self.state.api.endpoint}/task/${self.state.account.uuid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
        .then(response => {
          context.commit('loadMyTask', response.data.results);
        })

        .catch(error => {
          console.log(error);
        })
    },

    updateMyTask(context, payload) {
      const self = this;
      const task = payload;
      console.log(task);
      const date = new Date();

      axios.patch(`${self.state.api.endpoint}/task/${task.id}`, {
        work: task.work,
        review_user: task.assign_user_uuid,
        day: `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`,
        hour: task.hour,
        is_complete: task.is_complete,
        is_confirm: task.is_confirm
      })
        .then(() => {
          context.commit('updateMyTask', task);
          console.log(task.is_complete);
        })
        .catch(error => {
          console.log(error);
        })
    },

    markAllTaskAsCompleted(context) {
      const self = this;
      const not_completed_task = self.state.mySprintTask.filter(task => !task.completed);


    },

    removeMyTask(context, payload) {
      const self = this;
      const task_id = payload;

       axios.delete(`${self.state.api.endpoint}/task/${task_id}`)
         .then(() => {
           context.commit('removeMyTask', task_id);
         })

         .catch(error => {
           console.log(error);
         })
    },

    addToDailyTask(context, payload) {
      const task = payload;
      const date = new Date();
    }

  },

  getters: {
    getDailyTasks: (state) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();
      const current_day = `${year}/${month}/${date}`;

      const my_daily_task = state.mySprintTask.filter(task => {
        const task_date = new Date(task.day);
        const _year = task_date.getFullYear();
        const _month = task_date.getMonth();
        const _date = task_date.getDate();
        const compare_date = `${_year}/${_month}/${_date}`;

        return current_day === compare_date;
      });

      return my_daily_task;
    },

    getMySprintTasks: (state) => {
      if (!state.account.uuid) {
        return;
      }
      return state.mySprintTask.filter(user => user.uuid === state.account.uuid);
    },
  }
});
