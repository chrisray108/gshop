<template>
  <div class="animated fadeIn">


  <Row >
    <Col :sm="4" :md="24">
          <span>商品的查询，上下架操作。更新的商品将实时同步。</span>
          <br><br>
          <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />
          <br>
      
          <Button type="primary" @click="addSPU">添加商品</Button>
          <br>
          <br>
          <Table highlight-row ref="currentRowTable" stripe :columns="columns1" :data="data1"></Table>
    </Col>
  </Row>



  </div>
</template>



<script>
    // '产品状态：不可用(0)->上架(1)->下架(2)->定时上架(3)',
    var productStatusMap = {
      invalid  : '0',
      onSale   : '1',
      nonSale  : '2',
      onSchedule : '3'
    };
    export default {
        data () {
            let that = this;
            return {
               columns1: [
                    {
                        title: '商品',
                        key: 'name',                        
                        render: (h, params) => {      
                          let product = params.row
                          if (product.status == productStatusMap.nonSale) 
                          {
                            return h('div', [
                               h('strong', {
                                  style: {
                                      fontSize : '15px',
                                  }
                                }, 
                               params.row.name),
                               h('Button', {
                                  style: {
                                      marginTop  : '-3px',
                                      marginLeft : '10px',
                                  },
                                  props: {
                                      type: 'error',
                                      size: 'small',                                        
                                  },
                               },'商品下架'),
                            ])
                          }                       
                          else
                          {
                            return h('div', [
                            h('div', {
                                style: {
                                    fontWeight : 'bold',
                                    fontSize   : '15px',
                                }
                              }, 
                              params.row.name)                          
                            ]); 
                          }
                          
                        }
                    },
                    {
                        title: '价格',
                        key: '',                        
                        render: (h, params) => {                             
                          return h('div', [
                            h('span', {
                                style: {
                                    fontSize : '15px',
                                }
                              }, 
                              params.row.priseMinValue + "-" + params.row.priseMaxValue),
                           ]);                            
                        }
                    },
                    {
                        title: '原始价格',
                        key: '',                        
                        render: (h, params) => {                             
                          return h('div', [
                            h('span', {
                                style: {
                                    fontSize : '15px',
                                }
                              }, 
                              params.row.priseOriginMinValue + "-" + params.row.priseOriginMaxValue),
                           ]);                            
                        }
                    }, 
                    {
                        title: '销量',
                        key: '',                        
                        render: (h, params) => {                             
                          return h('div', [
                            h('span', {
                                style: {
                                    fontSize : '15px',
                                }
                              }, 
                              params.row.sellCount),
                           ]);                            
                        }
                    },
                    {
                        title: '分类',
                        key: '',                        
                        render: (h, params) => {                             
                          return h('div', [
                            h('span', {
                                style: {
                                    fontSize : '15px',
                                }
                              }, 
                              params.row.categoryName),
                           ]);                            
                        }
                    },
                    {
                        title: '操作',
                        key: 'pid',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [                               
                                 h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',                                        
                                    },
                                    on: {
                                        click: (event) => { 
                                            let product = params.row
                                            var status = product.status
                                            if (status == productStatusMap.onSale || status == productStatusMap.onSchedule)
                                            {
                                                status = productStatusMap.nonSale
                                            }
                                            else
                                            {
                                                status = productStatusMap.onSale
                                            }
                                            this.changeItemStatus(params.row, status)
                                        }
                                    }
                                  },[
                                     h('Icon',{
                                        props: 
                                        {
                                          type: this.itemStatusOperateIcon(params.row),
                                          size: '20',
                                        },
                                     }),
                                  ]),
                                  h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',                                        
                                    },
                                    on: {
                                        click: () => {
                                            this.editProduct(params.row)
                                        }
                                    }
                                  },[
                                     h('Icon',{
                                        props: {
                                          type: 'ios-arrow-right',
                                          size: '20',
                                        },
                                      }),
                                    ])                                 
                            ]);
                        }
                    },

                ],
                data1: [
                    
                ],
                rendingProduct:{status:'invalid'},
            }
        },
        beforeCreate:function(){
           let that = this;
           this.$store.dispatch('FetchProducts').then((datas) => { 
              that.$data.data1 = datas;
           }).catch(error => {
              that.$Message.error("数据请求失败: " + error.response.status);
           });
        },
        methods:{   
           addSPU()
           {
              this.$router.push({path: '/shopitemedit'});
           },

           editProduct(product)
           {
              this.$router.push({path: '/shopitemedit', query: { product: product} });
           },      
           
           changeItemStatus(product, status)
           { 
             let data = {
                pid    : product.pid,
                status : status
             } 
             let that = this;            
             this.$store.dispatch('ChangeProductStatus',data).then(() => { 
                product.status = status                  
             }).catch(error => {
                that.$Message.error("数据操作失败: " + error.response.status);
             });
              
           },

           itemStatusOperateIcon(product)
           {
             switch(product.status) 
             {
               case productStatusMap.onSale:
               case productStatusMap.onSchedule:
                 return 'ios-cloud-download-outline'
               case productStatusMap.nonSale:
                 return 'ios-cloud-upload-outline'
               default:
                 return ''
             } 
           }
        }
      }

</script>