<template>
  <el-card class="index-container">
    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="活动id"
          width="200"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="活动名"
          width="280"
      >
      </el-table-column>
      <el-table-column
          prop="location"
          label="活动地点"
          width="100"
      >
      </el-table-column>
      <el-table-column
          prop="organizerName"
          label="活动组织者"
          width="120"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          label="活动状态"
          width="100"
      >
      </el-table-column>
      <el-table-column
          label="活动详情"
          width="100"
      >
        <template #default="scope">
          <el-button type="primary" @click="handleActivityInfo(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="审批操作"
          width="120"
      >
        <template #default="scope">
          <el-popconfirm v-if="scope.row.status === '等待审批中'"
              title="确定通过吗？"
              @confirm="handlePass(scope.row.id)"
          >
            <template #reference>
              <a style="cursor: pointer">审批通过<br/></a>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === '等待审批中'"
              title="确定不通过吗？"
              @confirm="handleNotPass(scope.row.id)"
          >
            <template #reference>
              <a style="cursor: pointer">审批不通过</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope">
          <el-popconfirm
                         title="确定删除吗？"
                         @confirm="handleDeleteOne(scope.row.id)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <DialogActivityInfo ref='activityInfo' :reload="getIndexConfig" :type="type" :configType="configType"/>
</template>

<script>
import {onMounted, onUnmounted, reactive, ref, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import axios from '@/utils/axios'
import {localGet} from "@/utils";
import DialogActivityInfo from "@/components/DialogActivityInfo";

export default {
  name: 'Hot',
  components: {
    DialogActivityInfo,
  },
  setup() {
    const router = useRouter()
    const multipleTable = ref(null)
    const activityInfo = ref(null)
    const state = reactive({
      loading: false,
      tableData: [], // 数据列表
      multipleSelection: [], // 选中项
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 分页大小
      type: 'add', // 操作类型
    })
    // 监听路由变化
    const unwatch = router.beforeEach((to) => {
      if (['hot', 'new', 'recommend'].includes(to.name)) {
        getIndexConfig()
      }
    })
    const handleActivityInfo = (id) => {
      activityInfo.value.open(id)
    }
    // 初始化
    onMounted(() => {
      getIndexConfig()
    })
    onUnmounted(() => {
      unwatch()
    })
    // 首页热销商品列表
    const getIndexConfig = () => {
      state.loading = true
      axios.get('/api/manager/activitylist', {
        headers: {
          Authorization: localGet('token').data.data.token
        }
      }).then(res => {
        state.tableData = res.data.data
        state.loading = false
      })
    }
    // 选择项
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    // 删除
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
      }
      axios.post('/api/admin/delete', {
        ids: state.multipleSelection.map(i => i.id)
      }).then(() => {
        ElMessage.success('删除成功')
        getIndexConfig()
      })
    }
    //审批通过
    const handlePass = (id) => {
      axios.post('/api/manager/checkactivity', {
        activityId: id,
        actionType:0
      },{
        headers:{
          Authorization: localGet('token').data.data.token
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getIndexConfig()
      })
    }
    //审批不通过
    const handleNotPass = (id) => {
      axios.post('/api/manager/checkactivity', {
        activityId: id,
        actionType:1
      },{
        headers:{
          Authorization: localGet('token').data.data.token
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getIndexConfig()
      })
    }
    // 单个删除
    const handleDeleteOne = (id) => {
      axios.post('/api/manager/deleteactivity', {
        activityId: id
      }, {
        headers: {
          Authorization: localGet('token').data.data.token
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getIndexConfig()
      })
    }
    const changePage = (val) => {
      state.currentPage = val
      getIndexConfig()
    }
    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      handleDelete,
      handleDeleteOne,
      getIndexConfig,
      changePage,
      handleActivityInfo,
      activityInfo,
      handlePass,
      handleNotPass
    }
  }
}
</script>

<style scoped>
.index-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>