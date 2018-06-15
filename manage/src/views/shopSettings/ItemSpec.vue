<template>
  <div class="animated fadeIn">


  <Row >
    <Col :sm="4" :md="14">
          <span>添加新的商品规格维度，比如颜色，长度等。商品品列表会根据维度分组</span>
          <br><br>
          <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />
          <br>
          <Button type="primary" @click="addSpecOption">添加商品规格</Button>
    </Col>
  </Row>

<br>
<br>
  <Table highlight-row :show-header="false" ref="currentTable" stripe :columns="columns1" :data="data1"></Table>

  </div>
</template>



<script>
    export default {
        data () {
            let that = this;
            return {
               columns1: [
                    {
                        title: '名称',
                        key: 'name',                        
                        render: (h, params) => {  
                            if (params.row == undefined || params.row.type == 'insert') 
                            {
                               return h('div', [
                                h('Input', {
                                    props: {
                                        type : 'text',
                                        autofocus : true,
                                        clearable : true,
                                    },
                                    on: {
                                          'on-blur': function(event) 
                                           {
                                              let specName = event.target.value;
                                              if (specName == '') 
                                              {
                                                  event.target.style.borderColor = "red"
                                                  event.target.focus()
                                              }
                                              else
                                              {
                                                   event.target.style.borderColor = ""
                                                   that.submitNewSpec({name:specName},event.target)
                                              }
                                           }
                                    }  
                                }),
                               ]);
                            }
                            else
                            {
                              return h('div', [
                                h('Icon', {
                                    props: {
                                        type : 'social-dropbox',
                                        size : 20
                                    },
                                },),
                                h('strong', {
                                    style: {
                                        fontSize : '15px',
                                        marginLeft : '20px' 
                                    }
                                  }, 
                                  params.row.name),
                               ]);
                            }
                            
                        }
                    }, 
                    {
                        title: '操作',
                        key: 'opid',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [                               
                                h('Button', {
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            this.removeSpec(params.row.opid, params.index)
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
           this.$store.dispatch('FetchSpecOptions').then((datas) => { 
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
            addSpecOption()
            {
                if (this.$data.data1[0] == undefined || this.$data.data1[0].type != "insert") 
                {
                  var item = {
                              type :  "insert",
                              name : "",
                              opid : "",
                            }
                  this.$data.data1.unshift(item);
                }                
            },
            submitNewSpec(option,target)
            {
               let that = this;
               this.$store.dispatch('AddSpecOption', option).then((res) => 
               { 
                     that.$set(that.$data.data1, 0, res)
               }).catch(error => {
                     that.$Message.error("数据添加失败: " + error.response.status);
                     target.style.borderColor = "red"
                     target.focus()
               });
            },
            removeSpec(optionId,index)
            {
               let that = this;
               this.$store.dispatch('RemoveSpecOption', optionId).then((res) => 
               { 
                     that.$data.data1.splice(index,1);
               }).catch(error => {
                     that.$Message.error("数据删除失败: " + error.response.status);
               });
            }
        }

      }

</script>