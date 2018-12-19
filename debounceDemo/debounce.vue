<template>
    <input @input="debounceHandleInput"/>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'debounce',
        data() {
            return {
                starTime: 0,
                endTime: 0,
                delay: 1000,
            };
        },
        computed: {
            debounceHandleInput() {
                return _.debounce(this.handleInput, this.delay);
            },
        },
        methods: {
            handleInput(e) {
                console.log(`debounce wait时间为${this.delay}ms`);
                console.log('触发了input事件', e.target.value);
                this.startTime = new Date().getTime();
                this.remoteMethod();
            },
            // handleChange(e) {
            //   console.log('触发了change事件', e.target.value);
            //   this.$_.debounce(this.remoteMethod, 1000);
            // },
            remoteMethod() {
                // return new Promise((resolve) => {
                setTimeout(() => {
                    const result = `后端请求已完成！`;
                    this.endTime = new Date().getTime();
                    const costTime = this.endTime - this.startTime;
                    console.log(result);
                    console.log(`耗时${costTime}毫秒`);
                }, 2000);
                // });
            },
        },
    };
</script>

<style scoped>
</style>