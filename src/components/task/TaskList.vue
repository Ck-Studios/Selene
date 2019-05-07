<template>
  <div id="task-container">
  <table class="ui very basic collapsing celled table" v-if="isWeeklyComponent">

    <thead>
    <tr>
      <th>업무 내용</th>
      <th>맨 아워</th>
      <th>진행 상태</th>
      <th>해야할 날짜</th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="weeklyTask of this.$store.state.sprintTask" :key="weeklyTask.id">
      <td>
        <h4 class="ui image header">

          <div class="content">
            {{ weeklyTask.content }}
          </div>
        </h4></td>
      <td>
        {{ weeklyTask.manHour }}
      </td>
      <td>
        {{ weeklyTask.process }}
      </td>
      <td>
        {{ weeklyTask.date }}
      </td>
    </tr>

    </tbody>
  </table>


    <table class="ui very basic collapsing celled table" v-if="isDailyComponent">
      <thead>
      <tr>
        <th>업무 내용</th>
        <th>진행 상태</th>
        <th>완료 여부</th>
        <th>해야할 날짜</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="dailyTask of getDailyTasks" :key="dailyTask.id">
        <td>
          <h4 class="ui image header">

            <div class="content">
              {{ dailyTask.content }}
              <!--<div class="sub header">{{ user.position }}-->
              <!--</div>-->
            </div>
          </h4></td>
        <td>
          {{ dailyTask.process }}
        </td>
        <td>
          {{ dailyTask.completed ? 'Done' : '' }}
        </td>
        <td>
          {{ dailyTask.date }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'task-list',
    props: ['weekly', 'daily'],

    data() {
      return {
        weeklyTodo: this.$store.state.sprintTask,
        daily_task: null,
        isWeeklyComponent: this.weekly ? this.weekly : null,
        isDailyComponent: this.daily ? this.daily : null
      }
    },

    methods: {

    },

    computed: {
      getDailyTasks() {
        return this.$store.getters.getDailyTasks;
      }
    }

  };
</script>

<style scoped>

</style>
