<template>
  <div id="daily-container">
    <div>
      <h1 class="ui header">{{ account.realname }}님의 일간 업무</h1>
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

          <tr v-for="task of dailyTasks" :key="task.id" :class="{ positive: task.is_complete }">
            <td class="collapsing">
              <div class="ui fitted toggle checkbox">
                <input v-model="task.is_complete" type="checkbox" :checked="task.is_complete"> <label></label>
              </div>
            </td>
            <td class="selectable"><a href="#">{{ task.work }}</a></td>
            <td>{{ manHourDisplay(task.hour) }}</td>
            <td>{{ getDateOfTask(task) }}</td>
            <td>

              <h4 class="ui image header">
                <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
                <div class="content">
                  {{ account.realname }}
                  <div class="sub header">{{ account.position }}
                  </div>
                </div>
              </h4>

            </td>
            <td>
              <h4 class="ui image header">
                <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
                <div class="content">
                  {{ account.realname }}
                  <div class="sub header">{{ account.position }}
                  </div>
                </div>
              </h4>
            </td>
          </tr>
          </tbody>
          <tfoot class="full-width">
          <tr>
            <th colspan="6">
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

  <!-- Modal Area -->

  <modal v-model="modalForm">
    <p slot="header">오늘의 일정 추가</p>
    <div slot="content">

    <div class="ui form"> <!-- class : loading -->
      <table class="ui compact celled definition table">
        <thead class="full-width">
        <tr>
          <th style="">할 일</th>
          <th style="width: 10%">맨 아워</th>
          <th style="width: 15%">날짜</th>
          <th style="width: 15%">업무 담당자</th>
          <th style="width: 15%">검토</th>
          <th style="width: 15%">업무 추가</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="sprint_task of this.$store.state.mySprintTask" :key="sprint_task.id" :class="{ positive: sprint_task.is_complete }">
          <!--<td class="collapsing">-->
            <!--<div class="ui fitted toggle checkbox">-->
              <!--<input v-model="task.completed" type="checkbox" :checked="task.completed">-->
              <!--<label></label>-->
            <!--</div>-->
          <!--</td>-->
          <td class="selectable">{{ sprint_task.work }}</td>
          <td>{{ manHourDisplay(sprint_task.hour) }}</td>
          <td>{{ getDateOfTask(sprint_task) }}</td>

          <td>
            <h4 class="ui image header">
              <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
              <div class="content">
                {{account.realname}}
                <div class="sub header">{{account.position}}
                </div>
              </div>
            </h4>

          </td>
          <td>
            <h4 class="ui image header">
              <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
              <div class="content">
                {{account.realname}}
                <div class="sub header">{{account.position}}
                </div>
              </div>
            </h4>
          </td>
          <td>
            <button @click="addToDailyTask(sprint_task)" class="ui positive right button" tabindex="0">
              추가하기
            </button>
          </td>
        </tr>
        </tbody>

        <tfoot class="full-width">
        </tfoot>
      </table>
    </div>
    </div>
  </modal>
  </div>
</template>

<script>
    import modal from 'vue-semantic-modal'
    import TaskList from "./TaskList";
    import HelpSegment from "./HelpSegment";

    export default {
      components: {
        modal,
        HelpSegment,
        TaskList
      },

      name: "daily",

      data() {
        return {
          daily: 'call from daily component',
          account: this.$store.state.account,

          modalForm: false,
          modalTask: null,
          modalFormContentError: false,
          modalFormManHourError: false,
          daily_modal_form_content: "",
          modalFormManHour: "",
        }
      },

      methods: {
        openDailyTaskModal() {
          this.modalForm = !this.modalForm;
        },

        showModify(task) {
          this.modalTask = task;
          this.daily_modal_form_content = task.content;
          this.modalFormManHour = task.manHour;
          this.showModalForm();
        },

        hideModalForm() {
          this.modalForm = false;
          this.modalTask = null;
          this.modalFormContentError = false;
          this.modalFormManHourError = false;
          this.daily_modal_form_content = "";
          this.modalFormManHour = "";
        },

        validateContent() {
          return (this.daily_modal_form_content === "");
        },

        validateManHour() {
          let mh = Number(this.modalFormManHour);
          return !(mh % 1 === 0) || (mh < 1) || (mh > 100)
        },

        manHourDisplay(mh) {
          let unit = "MHs";

          if (mh === 1) {
            unit = "MH";
          }

          return mh + " " + unit;
        },

        getDateOfTask(task) {
          if (!task) return;

          if (task.day === null) {
            return '미정'
          }

          const sprint_date = new Date(task.day);

          return `${sprint_date.getMonth() + 1}월 ${sprint_date.getDate()}일`
        },

        addToDailyTask(task) {
          this.$store.dispatch('updateMyTask', task);
        }

      },

      computed: {
        dailyTasks () {
          return this.$store.getters.getDailyTasks;
        }
      }

    }
</script>

<style scoped>

</style>
