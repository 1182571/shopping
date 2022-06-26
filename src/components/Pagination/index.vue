<template>
    <!-- 分页器相关 -->
    <!-- 需要知道当前是第几页pageno,知道每一页展示多少数据pagesize,一共有多少页total continues代表分页连续页码个数 -->
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)"
            :class="{ active: pageNo == 1 }">1</button>
        <button v-if="pageNo > 4">···</button>

        <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">{{ page }}</button>
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{ totalPage }} 页</button>
        <!-- <h1>一共{{totalPage}}页    当前页为{{pageNo}}</h1> -->
    </div>
</template>

<script>

export default {
    name: 'Pagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总共多少页
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算连续页码的起始与结束数字
        startNumAndEndNum() {
            // 看了一下props，会将数据直接放在vc上，所以哪里解构就应该用this，是从vc对象上解构出来的
            const { continues, pageNo, totalPage } = this
            // 存储起始数字与结束数字
            let start = 0,
                end = 0
            // 连续页码数字是5 至少是五页,不够五页
            // 如果连续页码数大于了总页数不正常,走if
            if (continues > totalPage) {
                start = 1;
                end = totalPage;
            } else {
                //正常现象起始位置
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                // 如果start出现0或者负数
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return { start, end }
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    .active {
        background: skyblue;
    }

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
