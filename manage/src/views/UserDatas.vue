<template>
  <div class="animated fadeIn">
    <br><br>
    <Table highlight-row ref="currentRowTable" stripe :columns="columns1" :data="data1" draggable></Table>
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
                        title: '名称',
                        key: 'manager_nick',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.manager_nick)
                            ]);
                        }
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
                        key: 'manager_avatar',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.manager_avatar,
                                        alt: params.row.manager_avatar
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'
                                    }   
                                }),
                            ]);
                        }

                    },
                    {
                        title: '操作',
                        key: 'manager_id',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [                               
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeUser(params.row.manager_id, params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
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
        },

        methods:{
            removeUser(userId, index){
                let that = this;
                this.$store.dispatch('RemoveUser',userId).then((datas) => { 
                     that.data1.splice(index, 1);
                }).catch(error => {
                     that.$Message.error(error.response.data);
                });            
            }
        }

      }

</script>