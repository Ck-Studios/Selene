<template>
  <div id="weekly-container" v-if="account">
    <div class="column">
      <h1 class="ui header">{{ account.realname }}님의 스프린트 일정</h1>
    </div>

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
          <th style="width: 10%">삭제하기</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="task of this.$store.state.mySprintTask" :key="task.id" :class="{ positive: task.is_complete }">
          <td class="collapsing">
            <div class="ui fitted toggle checkbox">
              <input v-model="task.is_complete" type="checkbox" :checked="task.is_complete" @change="markAsCompleted(task)"> <label></label>
            </div>
          </td>
          <td class="selectable"><a @click="showModify(task)">{{ task.work }}</a></td>
          <td>{{ manHourDisplay(task.hour) }}</td>
          <td>{{ getDateOfTask(task) }}</td>

          <td>
            <h4 class="ui image header">
              <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
              <div class="content">
                {{ account.realname }}
                <div class="sub header">
                  {{ account.position }}
                </div>
              </div>
            </h4>
          </td>

          <td>
            <h4 class="ui image header">
              <img src="https://semantic-ui.com/images/avatar2/small/lena.png" class="ui mini rounded image">
              <div class="content">
                {{ account.realname }}
                <div class="sub header">
                  {{ account.position }}
                </div>
              </div>
            </h4>
          </td>

          <td>
            <button @click="removeTask(task.id)" class="ui orange basic button">삭제</button>
          </td>
        </tr>
        </tbody>

        <tfoot class="full-width">
        <tr>
          <th colspan="7">
            <div @click="showAdd" class="ui right floated small primary labeled icon button">
              <i class="user icon"></i> 새 일정 추가
            </div>
            <div @click="markAllAsCompleted()" class="ui small button">
              모두 완료한 것으로 처리
            </div>
            <div class="ui small disabled button">
              모두 완료하지 않은 것으로 처리
            </div>
          </th>
        </tr>
        </tfoot>
      </table>
    </div>

    <!-- Modal Area -->

    <modal v-model="modal_form">
      <p slot="header">새 일정 추가</p>
      <div slot="content">
        <div class="ui form">
          <div class="field">
            <div class="fields">
              <div :class="{ error: modal_form_content_error }" class="twelve wide field">
                <input v-model="modal_form_content" type="text" placeholder="할 일" autofocus tabindex="0">
              </div>
              <div :class="{ error: modal_form_man_hour_error }" class="four wide field">
                <input v-model="modal_form_man_hour" type="number" name="task_manhour" placeholder="맨 아워" tabindex="0">
              </div>
            </div>
          </div>
        </div>
      </div>

      <template slot="actions">
        <div @click="hideModalForm" class="ui black deny button" tabindex="0">
          취소하고 닫기
        </div>
        <div v-if="is_add_task" @click="addTask()" class="ui positive right button" tabindex="0">
          추가하기
        </div>
        <div v-if="is_modify_task" @click="updateTask()" class="ui positive right button" tabindex="0">
          수정하기
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import modal from 'vue-semantic-modal'
  import HelpSegment from "./HelpSegment";

  export default {
    components: {
      modal,
      HelpSegment
    },

    name: "sprint",

    data() {
      return {
        users: this.$store.state.users,
        weekly: 'call from weekly component',

        modal_form: false,
        modal_task: null,
        modal_form_content_error: false,
        modal_form_man_hour_error: false,
        modal_form_content: "",
        modal_form_man_hour: "",

        is_add_task: false,
        is_modify_task: false,

        account: this.$store.state.account,
      }
    },

    created() {
      this.$store.dispatch('loadMyTask');
    },

    methods: {
      showAdd() {
        const caller = 'showAdd';

        this.showModalForm(caller);
      },

      showModify(task) {
        const caller = 'showModify';
        console.log(task);

        this.modal_task = task;
        this.modal_form_content = task.work;
        this.modal_form_man_hour = task.hour;
        this.showModalForm(caller);
      },

      showModalForm(caller) {
        if (caller === 'showAdd') {
          this.is_add_task = true;
          this.modal_form = true;
        } else if (caller === 'showModify') {
          this.is_modify_task = true;
          this.modal_form = true;
        }
        return;
      },

      hideModalForm() {
        this.modal_form = false;
        this.modal_task = null;
        this.modal_form_content_error = false;
        this.modal_form_man_hour_error = false;
        this.modal_form_content = "";
        this.modal_form_man_hour = "";

        this.is_modify_task = false;
        this.is_add_task = false;
      },

      validateContent() {
        return (this.modal_form_content === "");
      },

      validateManHour() {
        if(!this.modal_form_man_hour) {
          return;
        };

        const mh = Number(this.modal_form_man_hour);
        return !(mh % 1 === 0) || (mh < 1) || (mh > 100)
      },

      addTask() {
        this.modal_form_content_error = this.validateContent();
        this.modal_form_man_hour_error = this.validateManHour();

        if (this.modal_form_content_error || this.modal_form_man_hour_error)
          return;

        if (this.modal_task === null) {
          // TODO : 추가
          const new_task = { work: this.modal_form_content, hour: this.modal_form_man_hour, day: null, review_user: null };
          this.$store.dispatch('addTask', new_task);
          this.hideModalForm();
        }
      },

      updateTask() {
        this.modal_form_content_error = this.validateContent();
        this.modal_form_man_hour_error = this.validateManHour();

        if (this.modal_form_content_error || this.modal_form_man_hour_error) {
          return;
        }

        const modified_task = Object.assign({}, this.modal_task, { work: this.modal_form_content, hour : this.modal_form_man_hour });
        this.$store.dispatch('updateMyTask', modified_task);
        this.hideModalForm();
      },

      removeTask(task_id) {
        this.$store.dispatch('removeMyTask', task_id);
      },

      manHourDisplay(mh) {
        let unit = "MHs";

        if (mh === 1) {
          unit = "MH";
        }

        return `${mh} ${unit}`;
      },

      markAsCompleted(task) {
        this.$store.dispatch('updateMyTask', task);
      },


      markAllAsCompleted(task) {
        this.$store.dispatch('markAllTaskAsCompleted');
      },

      getDateOfTask(task) {
        if (!task) return;

        if (task.day === null) {
          return '미정'
        }

        const sprint_date = new Date(task.day);

        return `${sprint_date.getMonth() + 1}월 ${sprint_date.getDate()}일`
      },
    }
  }
</script>

<style scoped>

</style>
