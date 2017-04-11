<template>
<div>
  <el-row>
    <el-col :span="8" style="width:200px;">
      <div class="led" ref="count"></div>
      <div>
        <span>重量：</span>
        <span>kg</span>
      </div>
    </el-col>
    <el-col :span="16" style="width:500px;">
      <el-form :inline="true" :model="weightData" class="demo-form-inline">
        <el-form-item label="毛重">
          <el-input v-model="weightData.gross_weight"></el-input>
        </el-form-item>
        <el-form-item label="皮重">
          <el-input v-model="weightData.tare"></el-input>
        </el-form-item>
        <el-form-item label="净重">
          {{netWeight}}
        </el-form-item>
        <div>
          <el-button v-if="!weightData.gross_weight" @click.native="submitGrossWeight">称毛重</el-button>
          <el-button v-if="weightData.gross_weight&&!weightData.tare" @click.native="submitTare">称皮重</el-button>
          <el-button @click.native="saveWeight">保存</el-button>
          <el-button @click.native="next">继续</el-button>
        </div>
      </el-form>
    </el-col>
  </el-row>
  <div>
    <el-tabs v-model="dataType" type="card">
      <el-tab-pane label="交易数据" name="交易数据">
        <el-table :data="list" height="200" border style="width: 100%">
          <el-table-column fixed="left" label="操作" width="100">
            <template scope="scope">
              <el-button @click.native.prevent="editRow(scope.$index, list)" type="text" size="small">
                编辑
              </el-button>
</template>
          </el-table-column>
          <el-table-column prop="id" label="id">
          </el-table-column>
          <el-table-column prop="gross_weight" label="毛重">
          </el-table-column>
          <el-table-column prop="tare" label="皮重">
          </el-table-column>
          <el-table-column prop="net_weight" label="净重">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="临时数据" name="临时数据">
        <el-table :data="tempList" height="200" border style="width: 100%">
          <el-table-column fixed="left" label="操作" width="100">
            <template scope="scope">
<el-button @click.native.prevent="editRow(scope.$index, tempList)" type="text" size="small">
  编辑
</el-button>
</template>
          </el-table-column>
          <el-table-column prop="id" label="id">
          </el-table-column>
          <el-table-column prop="gross_weight" label="毛重">
          </el-table-column>
          </el-table-column>
          <el-table-column prop="tare" label="皮重">
          </el-table-column>
          <el-table-column prop="net_weight" label="净重">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div>
    <chart ref="chart" style="width:100%;height:200px;margin:auto" :options="weightOptions"></chart>
  </div>
</div>
</template>

<script>
import Chart from 'vue-echarts'
import {
  mapGetters
} from 'vuex'

var CountUp = require('countup')

import weightFunctions from '../functions/weight.js'

export default {
  name: "Main",
  components: {
    Chart
  },
  data() {
    let marks = []
    var now = new Date()
    var datas = []

    for (var i = 0; i < 60; i++) {
      marks.push((i + 1).toString())
      datas.push('-')
    }

    return {
      msg: "hello world",
      weight: 0,
      countUp: undefined,
      datas: datas,
      mark: 0,
      weightOptions: {
        animation: false,
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          scale: false,
          data: marks,
          min: 'dataMin',
          max: 'dataMax',
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          name: "重量",
          axisLabel: {
            formatter: '{value}kg'
          },
          splitNumber: 3
        }],
        series: [{
          type: 'line',
          symbol: "circle",
          symbolSize: 1,
          data: datas
        }]
      },
      weightData: {
        id: "",
        gross_weight: "",
        tare: "",
        status: ""
      },
      list: [],
      tempList: [],
      dataType: "临时数据"
    }
  },
  watch: {
    weight(val, oldVal) {
      this.countUp.update(val)
    }
  },
  methods: {
    submitGrossWeight() {
      this.weightData.gross_weight = this.weight.toFixed(2)
      weightFunctions.submitWeight({
        id: this.weightData.id,
        gross_weight: this.weightData.gross_weight
      }).then((id) => {
        this.weightData.id = id
      }).then(() => {
        this.getData()
      })
    },
    submitTare() {
      this.weightData.tare = this.weight.toFixed(2)
      weightFunctions.submitWeight({
        id: this.weightData.id,
        tare: this.weightData.tare
      }).then((id) => {
        this.weightData.id = id
      }).then(() => {
        this.getData()
      })
    },
    saveWeight() {
      var status = ""
      if (this.weightData.gross_weight && this.weightData.tare) {
        status = "1"
      }
      weightFunctions.submitWeight({
        id: this.weightData.id,
        gross_weight: this.weightData.gross_weight,
        tare: this.weightData.tare,
        status: status
      }).then(() => {
        this.getData()
        if (status == "1") {
          this.next()
        }
      })
    },
    getData() {
      weightFunctions.getWeights().then((result) => {
        this.list = result.filter(o => o.status).map((o) => {
          return {
            id: o.id,
            gross_weight: o.gross_weight,
            tare: o.tare,
            net_weight: ((parseFloat(o.gross_weight) ? parseFloat(o.gross_weight) : 0) -
              (parseFloat(o.tare) ? parseFloat(o.tare) : 0)).toFixed(2)
          }
        })
        this.tempList = result.filter(o => !o.status).map((o) => {
          return {
            id: o.id,
            gross_weight: o.gross_weight,
            tare: o.tare,
            net_weight: ((parseFloat(o.gross_weight) ? parseFloat(o.gross_weight) : 0) -
              (parseFloat(o.tare) ? parseFloat(o.tare) : 0)).toFixed(2)
          }
        })
      })
    },
    next() {
      this.weightData = {
        id: "",
        gross_weight: "",
        tare: "",
        status: ""
      }
    },
    editRow(index, rows) {
      this.weightData = {
        id: rows[index].id,
        gross_weight: rows[index].gross_weight,
        tare: rows[index].tare,
        status: rows[index].status
      }
    }
  },
  computed: {
    netWeight() {
      return ((parseFloat(this.weightData.gross_weight) ? parseFloat(this.weightData.gross_weight) : 0) -
        (parseFloat(this.weightData.tare) ? parseFloat(this.weightData.tare) : 0)).toFixed(2)
    },
    ...mapGetters({
      loginAccount: "loginAccount",
      loginPermission: "loginPermission"
    })
  },
  created() {
    setInterval(() => {
      this.weight = Math.random() * 10000 / 100
    }, 2000)

    setInterval(() => {
      if (this.mark < 30) {
        this.datas.splice(this.mark, 1, parseInt(this.weight.toString()))
        this.mark++
      } else {
        this.datas.shift()
        this.datas.splice(29, 0, parseInt(this.weight.toString()))
      }
    }, 2000)
  },
  mounted() {
    this.countUp = new CountUp(this.$refs.count, 0, this.weight, 2, 1)
    window.onresize = () => {
      return (() => {
        this.$refs.chart.resize()
      })()
    }

    this.getData()
  }

}
</script>
