<template>
  <Layout>
    <div class="wrapper">
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="x"/>
      </div>
      <ol class="recordList" v-if="groupedList.length > 0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}<span>{{ group.total }} 元</span></h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{ item.tag.name }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥ {{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class="no-result" v-else>
        目前没有相关记录
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tabs from '@/components/Tabs.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Statistic/Chart.vue';

  @Component({
    components: {Tabs, Chart},
  })
  export default class statistic extends Vue {
    type = '-';
    recordTypeList = recordTypeList;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList)
          .filter(r => r.type === this.type)
          .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      if (newList.length === 0) {return [];}
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          if (item.amount) {
            return sum + item.amount;
          }
          return sum;
        }, 0);
      });
      return result;
    }

    get x() {
      return {
        title: {
          // text: 'ECharts 入门示例'
        },
        tooltip: {
          show:true,
          triggerOn:'click',
          formatter: '{c}',
          padding:[2,4],
          backgroundColor: `rgb(92,123,217)`,
          borderWidth: 0,
          textStyle:{
            color: '#fff'
          },
          shadowStyle: {
            color:'rgba(150,150,150,0.3)'
          }
        },
        legend: {
          // data: ['销量']
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 20
        },
        xAxis: {
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
          ],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          show: false
        },
        series: [
          {
            // name: '销量',
            type: 'line',
            symbol:'circle',
            symbolSize:8,
            data: [
              5, 20, 36, 10, 10, 20,
              5, 20, 36, 10, 10, 20,
              5, 20, 36, 10, 10, 20,
              5, 20, 36, 10, 10, 20,
              5, 20, 36, 10, 10, 20,
            ]
          }
        ]
      };
    }

    beautify(string: string) {
      const now = dayjs();
      const day = dayjs(string);
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月DD日');
      } else {
        return day.format('YYYY年MM月DD日');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  %item {
    padding: 0 16px;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    flex: 1 1 0;

    .chart-wrapper {
      overflow: auto;
      flex: 1;

      &::-webkit-scrollbar {
        display: none; /*ChromeSafari*/
      }

      .chart {
        width: 430%;
        overflow: hidden;
      }
    }

    > .recordList {
      flex: 1;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none; /*ChromeSafari*/
      }

      > li {
        > .title {
          @extend %item
        }

        > ol {
          > .record {
            @extend %item;
            background-color: #fff;

            > .notes {
              margin-right: auto;
              margin-left: 8px;
              padding-top: 2px;
              color: #999;
              font-size: 14px;
            }
          }
        }
      }

      .no-result {
        padding: 16px;
        text-align: center;
      }
    }
  }
</style>