
const TASKS = [
    {
        id: 1,
        name: 'Get Milk',
        description: 'Need to get Milk for the house',
        priority: 1,
        status: 'TODO',
        startTime: new Date(),
        dueDate: null
    },
    {
        id: 2,
        name: 'Fix download bug',
        description: 'Must fix download bug',
        priority: 2,
        status: 'TODO',
        startTime: new Date(),
        dueDate: null
    },
    {
        id: 3,
        name: 'Paint baby room',
        description: 'Need to get to the baby room painting',
        priority: 3,
        status: 'TODO',
        startTime: new Date(),
        dueDate: null
    }
];
const PRIORITIES = [
    { level: 1, name: 'Lazy Boy' },
    { level: 2, name: 'For the Realm' },
    { level: 3, name: 'Mooove Son' },
    { level: 4, name: 'MAY DAY! MAY DAY!!' },
];


Vue.component('task-edit', {
    props: ['task'],
    template: `
        <div class="tasks">
            <div class="row">
                <div class="col-10">
                    <h4>Add Task</h4>
                </div>
                <div class="col-2 d-flex align-items-center justify-content-end">
                    <a :style="{color: 'inherit'}" href="" @click.prevent="$emit('task-cancel')"><i class="material-icons">arrow_back</i></a>
                </div>
            </div>
            <form @submit.prevent="saveTask()">
                <div class="tasks__edit">
                    <div class="row">
                        <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Task name</label>
                                    <input type="text" class="form-control" id="name" placeholder="The task name..." autocomplete="off" v-model="task.name">
                                </div>
                                <div class="form-group">
                                    <label for="priority">Priority</label>
                                    <select id="priority" class="form-control" v-model="task.priority">
                                        <option value="">What's it worth to you...</option>
                                        <option v-for="priority in priorities" :value="priority.id" v-html="priority.name"></option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="dueDate">Date Due</label>
                                    <input type="date" class="form-control" id="dueDate" placeholder="What's the due date..." autocomplete="off" v-model="task.dueDate">
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea type="text" class="form-control" id="description" placeholder="Tell me more of this task..." rows="3" v-model="task.description"></textarea>
                                </div>
                        </div>
                    </div>
                </div>            
                <div class="tasks__action">
                    <button class="btn btn-primary">Save Task</button>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            priorities: PRIORITIES
        };
    },
    methods: {
        saveTask() {
            console.log('will save task here...', this.task);
            this.$emit('task-save', this.task);
        }
    }
});

Vue.component('task-list', {
    props: ['tasks'],
    template: `
        <div class="tasks">
            <h4>Tasks</h4>
            <div class="tasks__list">
                <div class="row">
                    <div class="col-12">
                        <task-item v-for="task in tasks" :key="task.id" :task="task" @task-edit="editTask(task)"></task-item>
                    </div>
                </div>
            </div>            
            <div class="tasks__action">
                <button class="btn btn-primary" @click="editTask">Add Task</button>
            </div>
        </div>
    `,
    data() {
        return {
        };
    },
    methods: {
        editTask(task = null) {
            console.log('task to edit: ', task);
            this.$emit('edit-task', task);
        }
    }
});

Vue.component('task-item', {
    props: ['task'],
    template: `
        <div class="task__item"><a class="no-link" @click.prevent="$emit('task-edit', task)" href="#">{{task.name}}</a></div>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        tasks: [...TASKS],
        task: {},
        editMode: false
    },
    methods: {
        callEditTask(task) {
            // console.log('will call add task...', task.name);
            this.task = task || {};
            this.editMode = true;
        },
        handleSaveTask(task) {
            console.log('task - ', task);
            const taskIndex = this.tasks.findIndex(atask => atask.id === task.id);
            if (taskIndex >= 0) {
                this.tasks[taskIndex] = task;
            } else {
                task.id = Date.now();
                this.tasks.push(task);
            }
            this.editMode = false;
        }
    }
}) 