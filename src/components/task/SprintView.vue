<template>
  <div id="daily-container">
    <div>
      <h1 class="ui header">모든 스프린트 일정</h1>
      <help-segment/>

      <div class="ui form">
        <table class="ui compact celled definition table">
          <thead class="full-width">
          <tr>
            <th></th>
            <th style="">할 일</th>
            <th style="width: 10%">맨 아워</th>
            <th style="width: 15%">날짜</th>
            <th style="width: 15%">업무 담당자</th>
            <th style="width: 15%">검토</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="task of this.$store.state.sprintTask" :key="task.id" :class="{ positive: task.is_complete }">
            <td class="collapsing">
              <div class="ui fitted toggle checkbox">
                <input v-model="task.is_complete" type="checkbox" :checked="task.is_complete"> <label></label>
              </div>
            </td>
            <td class="selectable"><a href="#">{{ task.work }}</a></td>
            <td>{{ manHourDisplay(task.hour) }}</td>
            <td>{{ getDateOfTask(task.plan_datetime) }}</td>
            <td>

              <h4 class="ui image header">
                <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
                <div class="content">
                  {{ getAssignedUserName(task.assign_user_uuid) }}
                  <div class="sub header">{{ getAssignedUserPosition(task.assign_user_uuid) }}
                  </div>
                </div>
              </h4>

            </td>
            <td>
              <h4 class="ui image header">
                <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
                <div class="content">
                  {{ getAssignedUserName(task.assign_user_uuid) }}
                  <div class="sub header">{{ getAssignedUserPosition(task.assign_user_uuid) }}
                  </div>
                </div>
              </h4>
            </td>
          </tr>
          </tbody>
          <tfoot class="full-width">
          <tr>
            <th></th>
            <th colspan="5">
              <div @click="openDailyTaskModal()" class="ui right floated small primary labeled icon button">
                <i class="user icon"></i> 오늘 할 일 추가
              </div>
              <div class="ui small  button">
                모두 완료한 것으로 처리
              </div>
              <div class="ui small  disabled button">
                모두 완료하지 않은 것으로 처리
              </div>
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import modal from 'vue-semantic-modal'
  import TaskList from "./TaskList";
  import HelpSegment from "./HelpSegment";

    export default {
      name: "sprint-view",

      components: {
        modal,
        HelpSegment,
        TaskList,
      },

      created() {
        this.$store.dispatch('loadAllSprintTask');
      },

      data() {
        return {
          account: this.$store.state.account
        }
      },

      methods: {
        manHourDisplay(mh) {
          let unit = "MHs";

          if (mh === 1) {
            unit = "MH";
          }

          return `${mh} ${unit}`;
        },

        getDateOfTask(time) {
          if (time) {
            const date = new Date(time);
            const added_month = date.getMonth()+1;
            const added_day = date.getDate();

            return `${added_month}월 ${added_day}일`
          }
          return;
        },

        getAssignedUserName(id) {
          if (id && this.$store.state.users.length) {
            return this.$store.state.users.find(user => user.uuid === id).realname;
          }

          return;
        },

        getAssignedUserPosition(id) {
          if (id && this.$store.state.users.length) {
            return this.$store.state.users.find(user => user.uuid === id).position;
          }
        }
      },
    }
</script>

<style scoped>

</style>
