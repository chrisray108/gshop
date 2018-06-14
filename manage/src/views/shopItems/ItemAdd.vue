<template>
  <div class="animated fadeIn">
  <Form ref="formValidate" :model="shopItem" :rules="ruleValidate" :label-width=80  :label-position="right">
        <Row>
              <Col span="24">
                <h6>商品信息</h6>
                <br>
                <br>
              </Col>
        </Row>
        <Row>
            <Col :md="8"  :sm="24">
                  <Form-item label="图片" prop="name">
                    <Upload multiple type="drag" action="\/\/jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 60px 50px">
                        <Icon type="ios-cloud-upload" size="44" style="color: #3399ff"></Icon>
                        <p>点击或将图片拖拽到这里上传</p>
                      </div>
                    </Upload>
                  </Form-item>
            </Col>    

            <Col offset="2" :md="14"  :sm="24">
                  <Row>
                       <Col>
                          <Form-item label="商品名称" prop="name" label-width=120>
                              <Input v-model="shopItem.name" placeholder="请输入商品名称"></Input>
                         </Form-item>
                      </Col>
                  </Row>
                  <Row>
                       <Col>
                           <Form-item label="描述" prop="name" label-width=120>
            <Input  type="textarea" :autosize="{minRows: 8,maxRows: 12}" placeholder="请输入商品描述"></Input>
                           </Form-item>
                       </Col>
                  </Row>
            </Col>   
        </Row>
        <br>
        <Row>
            <Col span="24">
                <h6>商品价格及商品规格</h6>
                <br>
                <br>
            </Col>
        </Row>
        <div v-for="spec in specs">
              <Row :md="{type:flex, justify:center, align:bottom}">
                  <Col :md="3" :sm="24">
                        <div><strong>价格</strong></div>
                        <div>
                            <InputNumber :max="999999999" v-model="shopItem.prise" :formatter="value => `¥${value}`" :parser="value => value.replace(/¥s?|(,*)/g, '')">                        
                            </InputNumber>
                        </div>
                  </Col>
                  <Col :md="3" :sm="24">
                        <div><strong>原价( 可不填 )</strong></div>
                         <div>
                            <InputNumber :max="999999999" v-model="shopItem.originPrise" :formatter="value => `¥${value}`" :parser="value => value.replace(/¥s?|(,*)/g, '')">                        
                            </InputNumber>
                        </div>
                  </Col>
                  <Col :md="{ span: 8, offset: 6 }" :sm="{ span: 12, offset: 0 }"  >
                        <div><strong>库存</strong></div>
                        <div>
                            <Input>       
                                <CheckboxGroup slot="append" v-model="unlimitedKeep" @on-change="checkUnLimtedKeep">
                                    <Checkbox label="不限库存"></Checkbox>
                                </CheckboxGroup>                           
                            </Input>
                            
                        </div>
                  </Col>

                  <Col :md="{ span: 3, offset:1}" style="height: 33px">
                        <Icon type="trash-a" size=24 color='#bbbec4'></Icon>
                  </Col>
              </Row>
              <br>
              <hr style=" height:2px;border:none;border-top:1px dotted #cfd8dc;" />                
              <br>
        </div>
        
        <Row>
            <Col :md="4" :sm="24">
               <Button long @click="addNewSpec">＋ 添加商品规格</Button>
            </Col>
        </Row>

        <br><br>
        <Row>
            <Col span="24">
                <h6>商品分类</h6>
                <br>
                <span>请在在商店设置里设置分类</span>
                <Select v-model="model1" style="width:200px; display: block; margin-top: 20px">
                     <Option v-for="item in categories" :value="item.value" :key="item.value">{{ item }}</Option>
                </Select>
            </Col>
        </Row>
        <br><br>
        <Row>
            <Col :md="4" :sm="24">
                <h6>初始销量</h6>
                <br>
                <Input placeholder="默认为 0 件">                                       
                    <span  slot="append" >件</span>                
                </Input>
            </Col>
        </Row>
        <br><br>
        <Row>
            <Col :md="8" :sm="24">
                <h6>发布状态</h6>
                <br>
                <RadioGroup v-model="shopItem.status">
                  <Radio label="上架"></Radio>
                  <Radio label="仓库(下架)"></Radio>
                  <Radio label="定时上架"></Radio>
                </RadioGroup>
            </Col>
        </Row>

        <br><br>
        <Row>
            <Col :md="12" :sm="24">
                <h6>商品详情页描述</h6>
                <br><br>
                <Form-item prop="name" label-width=120>
                         <Input  type="textarea" :autosize="{minRows: 8,maxRows: 12}" placeholder="商品详情页描述"></Input>
                 </Form-item>
            </Col>
        </Row>

     </Form>
    <br><br>
    <div style="text-align:right">
       <Button @click="cancel" >< &nbsp;&nbsp;取消</Button>
       <Button type="primary" @click="save">&nbsp;&nbsp;保存&nbsp;&nbsp;</Button>
    </div>

</div>

</template>



<script>
    export default {
        data () {
            let that = this;
            return {
               shopItem: {
                    name: '',
                    prise:'',
                    originPrise:'',
                    keepCount:'',
                    status:'',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                unlimitedKeep:false,
                ruleValidate:{

                },
                specs:[{}],
                categories:[],
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
           },
           checkUnLimtedKeep(data)
           {

           },
           addNewSpec()
           {
              this.$data.specs.push({});
           }
        }
      }

</script>