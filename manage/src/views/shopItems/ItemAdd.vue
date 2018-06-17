<template>
  <div class="animated fadeIn">    
      <Affix :offset-top="100" style="width: 300px; margin-left: 600px;">
           <span style="width: word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ; background-color: #2b85e4; color: #ffffff">{{JSON.stringify([product,categories])}}</span>
     </Affix>
    <Form ref="formValidate" :model="product" :rules="ruleValidate" :label-width=0 >
          <Row>
                <Col :md="20"  :sm="24">
                  <h6>商品信息</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />                
                  <br>
                </Col>
          </Row>
          <Row>
              <Col :md="8"  :sm="24">
                    <Form-item prop="mainPic" >
                      <div><strong>商品图片</strong></div>
                      <Upload multiple type="drag" action="\/\/jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 90px 0">
                          <Icon type="ios-cloud-upload" size="44" style="color: #3399ff"></Icon>
                          <p>点击或将图片拖拽到这里上传</p>
                        </div>
                      </Upload>
                    </Form-item>
              </Col>    

              <Col offset="2" :md="10"  :sm="24">
                    <Row>
                         <Col>
                            <Form-item prop="name">
                                <div><strong>商品名称</strong></div>
                                <Input v-model="product.name" placeholder="请输入商品名称"></Input>
                           </Form-item>
                        </Col>
                    </Row>
                    <Row>
                         <Col>
                             <Form-item prop="desc">
                              <div><strong>描述</strong></div>
                                    <Input v-model="product.desc" type="textarea" :autosize="{minRows: 8,maxRows: 12}" placeholder="请输入商品描述">                                    
                                    </Input>
                             </Form-item>
                         </Col>
                    </Row>
              </Col>   
          </Row>
          <br>
          <Row>
                  <Col :md="20"  :sm="24">
                  <h6>商品价格及商品规格</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />         
                  <br>
              </Col>
          </Row>
          <div v-for="keepItem in product.keepItems">
                <Row>
                    <Col :md="5" :sm="24">
                          <div><strong>商品规格</strong></div>                          
                          <div>                             
                              <Input placeholder="颜色、尺寸等等">
                              </Input>
                          </div>
                    </Col>
                    <Col :md="{ span: 3, offset: 1 }" :sm="24">
                          <div><strong>价格</strong></div>
                          <div>
                              <InputNumber :max="999999999" v-model="keepItem.prise" :formatter="value => `¥${value}`" :parser="value => value.replace(/¥s?|(,*)/g, '')">                        
                              </InputNumber>
                          </div>
                    </Col>
                    <Col :md="3" :sm="24">
                          <div><strong>原价( 可不填 )</strong></div>
                           <div>
                              <InputNumber :max="999999999" v-model="keepItem.originPrise" :formatter="value => `¥${value}`" :parser="value => value.replace(/¥s?|(,*)/g, '')">                        
                              </InputNumber>
                          </div>
                    </Col>
                    <Col :md="{ span: 4, offset: 3 }" :sm="{ span: 12, offset: 0 }"  >
                          <div><strong>库存</strong></div>
                          <div>
                              <Input v-if="keepItem.unlimitedCount" disabled="true" value="∞">
                                  <Checkbox slot="append" v-model="keepItem.unlimitedCount">不限库存</Checkbox>
                              </Input>

                              <Input v-else v-model="keepItem.keepCount">
                                  <Checkbox slot="append" v-model="keepItem.unlimitedCount">不限库存</Checkbox>
                              </Input>
                              
                          </div>
                    </Col>

                    <Col :md="{ span: 3, offset:1}" style="height: 33px">
                        <Button type="text">
                          <Icon type="trash-a" size=24 color='#bbbec4'></Icon>
                        </Button>
                    </Col>
                </Row>
                <br>
                <hr style=" height:2px;border:none;border-top:1px dotted #cfd8dc;" />                
                <br>
          </div>
          
          <Row>
              <Col :md="4" :sm="24">
                 <Button long @click="addNewKeepItem">＋ 添加商品规格</Button>
              </Col>
          </Row>

          <br><br>
          <Row>
              <Col :md="20"  :sm="24">
                  <h6>商品分类</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />         
                  <br>
                  <span>请在在商店设置里设置分类</span>
                  <Select v-model="product.selectedCategoryId" style="width:200px; display: block; margin-top: 20px">
                      <Option v-for="item in categories" :value="item.cid">
                        {{ item.name }}
                      </Option>
                  </Select>
              </Col>
          </Row>
          <br><br>
          <Row>
              <Col :md="4" :sm="24">
                  <h6>初始销量</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />         
                  <br>
                  <Input placeholder="默认为 0 件" v-model="product.sellCount">                                       
                      <span  slot="append" >件</span>                
                  </Input>
              </Col>
          </Row>
          <br><br>
          <Row>
              <Col :md="8" :sm="24">
                  <h6>发布状态</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />         
                  <br>
                  <RadioGroup v-model="product.status">
                    <Radio label="上架"></Radio>
                    <Radio label="仓库(下架)"></Radio>
                    <Radio label="定时上架"></Radio>
                  </RadioGroup>
              </Col>
          </Row>

          <br><br>
          <Row>
              <Col :md="24" :sm="24">
                  <h6>商品详情页描述</h6>
                  <br>
                  <hr style=" height:2px;border:none;border-top:1px solid #cfd8dc;" />         
                  <br>
                  <Form-item prop="detailDesc">
                          <mavon-editor style=" margin-top: 10px" v-model="product.detailDesc"/>
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
  import  { mavonEditor } from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';

  class KeepItem 
  {
    constructor() {
    this.name = '';
    this.prise = 0;
    this.originPrise = 0;
    this.keepCount = 0;
    this.unlimitedCount = false;
    }
  }
    export default {
        components: { mavonEditor },
        data () {
            let that = this;
            return {
                product:{
                     mainPic:"",
                     name:"",
                     desc:"",
                     detailDesc:"",
                     status:"",
                     sellCount:'',
                     keepItems:[new KeepItem()],
                     keepOption:[],
                     selectedCategoryId:"",
                },
                categories:[],
                ruleValidate:{

                },
            }
        },
        beforeCreate:function(){
           let that = this;
           this.$Spin.show();

           var fetchCategories = this.$store.dispatch('FetchCategories');

           Promise.all([fetchCategories]).then(function (results) {               
                that.$data.categories = results[0]
                that.$Spin.hide();
           }).catch(error => {
                 that.$Spin.hide();
                 that.$Message.error("数据请求失败: " + error.response.status);
            });
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
           addNewKeepItem()
           {
              this.$data.product.keepItems.push(new KeepItem());
           }
        }
      }

</script>