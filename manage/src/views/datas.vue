<template>
  <div class="animated fadeIn">
    <br><br>
    <Table stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>

<style scoped>
</style>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
               columns1: [
                    {
                        title: '花名',
                        key: 'manager_nick'
                    },
                    {
                        title: '邮箱',
                        key: 'manager_email'
                    },
                    {
                        title: '创建时间',
                        key: 'manager_createtime'
                    },
                    {
                        title: '头像',
                        key: 'manager_avatar'
                    },
                ],
                data1: [
                    
                ]
            }
        },
        beforeCreate:function(){
           let that = this;
           this.$store.dispatch('GetUserList').then((datas) => { 
                 var datac = [];

                 for(var index in datas)
                 {
                    var item = {};
                    for(var column in that.$data.columns1)
                    {
                        let key = that.$data.columns1[column].key;
                        item[key] = datas[index][key];                
                    }
                    datac[index] = item;
                 }
                 that.$data.data1 = datac;
           });
        }
      }
</script>