<template>
  <div class="animated fadeIn">


  <Row >
    <Col :sm="4" :md="14">
          <span>添加新的商品分类，为商品分类排序，删除商品分类。你可以在编辑商品时添加商品分类。</span>
          <br><br>
          <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />
          <br>
          <Button type="primary" @click="addCategory">添加商品分类</Button>
    </Col>
  </Row>

<br>
<br>
  <Table highlight-row :show-header="false" ref="currentRowTable" stripe :columns="columns1" :data="data1"></Table>

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
                                              let categoryName = event.target.value;
                                              if (categoryName == '') 
                                              {
                                                  event.target.style.borderColor = "red"
                                                  event.target.focus()
                                              }
                                              else
                                              {
                                                   event.target.style.borderColor = ""
                                                   that.submitNewCategory({name:categoryName},event.target)
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
                ],
                data1: [
                    
                ]
            }
        },
        beforeCreate:function(){
           let that = this;
           this.$store.dispatch('FetchCategories').then((datas) => { 
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
            addCategory()
            {
                if (this.$data.data1[0] == undefined || this.$data.data1[0].type != "insert") 
                {
                  var item = {
                              type :  "insert",
                              name : "",
                              cid  : "",
                            }
                  this.$data.data1.unshift(item);
                }                
            },
            submitNewCategory(category,target)
            {
               let that = this;
               this.$store.dispatch('AddCategory', category).then((res) => 
               { 
                     that.$set(that.$data.data1, 0, res)
               }).catch(error => {
                     that.$Message.error("数据添加失败: " + error.response.status);
                     target.style.borderColor = "red"
                     target.focus()
               });
            }
        }

      }

</script>