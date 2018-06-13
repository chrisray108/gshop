<template>
  <div class="animated fadeIn">


  <Row >
    <Col :sm="24" :md="24">
          <span>添加商品，规格和库存</span>
          <br><br>
          <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />  
          <br>

  <div style="">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Form-item label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
    </Form-item>
  </Form>
</div>



          <div style="text-align:right">
             <Button @click="cancel" >< &nbsp&nbsp取消</Button>
             <Button type="primary" @click="save">&nbsp&nbsp保存&nbsp&nbsp</Button>
          </div>
          
    </Col>
  </Row>



  </div>
</template>



<script>
    export default {
        data () {
            let that = this;
            return {
               formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
            }
        },
        beforeCreate:function(){
           
        },

        methods:{   
           cancel()
           {
              this.$router.back();
           },
           save()
           {
              alert("save!");
           }

        }
      }

</script>