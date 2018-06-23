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
    export default {
        data () {
            let that = this;
            return {
               columns1: [
                    {
                        title: '商品',
                        key: 'name',                        
                        render: (h, params) => {                             
                          return h('div', [
                            h('strong', {
                                style: {
                                    fontSize : '15px',
                                }
                              }, 
                              params.row.name),
                           ]);                            
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
                        title: '操作',
                        key: 'pid',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [                               
                                h('Button', {
                                    props: {
                                        type: 'text',                                        
                                    },
                                    on: {
                                        click: () => {
                                            this.editProduct(params.row.pid)
                                        }
                                    }
                                  },[
                                     h('Icon',{
                                        props: {
                                          type: 'ios-gear-outline',
                                          size: '20',
                                        },
                                     }),
                                  ])
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
           this.$store.dispatch('FetchProducts').then((datas) => { 
                 that.$data.data1 = datas;
           });
        },

        methods:{   
           addSPU()
           {
              this.$router.push({path: '/shopitemadd'});
           },
           editProduct(pid)
           {
              alert(pid)
           },         
        }
      }

</script>