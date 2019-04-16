<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-header">
                <h4>{{dataList.title}}</h4>
            </div>
            <div class="mui-card-content">
              <div class="pitcuer" v-html="dataList.content"></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "goodsdelict",
        data() {
            return {
                dataList: [],
                id: this.$route.params.id
            }
        },
        methods: {
            getDelict() {
                this.$http.get("api/goods/getdesc/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        console.log(result.body)
                        this.dataList = result.body.message[0]
                    }
                })
            }
        },
        created() {
            this.getDelict();
        }
    }
</script>

<style scoped>
    h4 {
        color: blue;
        line-height: 25px;
        text-align: center;
    }

</style>