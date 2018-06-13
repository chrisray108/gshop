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
          <Table highlight-row :show-header="false" ref="currentRowTable" stripe :columns="columns1" :data="data1"></Table>
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
                    },                
                ],
                data1: [
                    
                ]
            }
        },
        beforeCreate:function(){
           
        },

        methods:{   
           addSPU()
           {
              this.$router.push({path: '/shopitemadd'});
           }         
        }
      }

</script>