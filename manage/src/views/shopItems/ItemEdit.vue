<template>
  <div class="animated fadeIn">    
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
                      <Upload type="drag" action="#" :before-upload="handleUpload" class="upload-tool-class">
                        <img :src="productPicture" :hidden="(productPicture.length == 0)" >
                        <div style="padding: 90px 0;">
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
                             <Form-item prop="description">
                              <div><strong>描述</strong></div>
                                    <Input v-model="product.description" type="textarea" :autosize="{minRows: 8,maxRows: 12}" placeholder="请输入商品描述">                                    
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
                              <Input placeholder="颜色、尺寸等等" v-model="keepItem.specDesc">
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
                              <Input v-if="keepItem.unlimitedCount == '1'" disabled="true" value="∞">
                                  <Checkbox slot="append" v-model="keepItem.unlimitedCount" true-value="1" false-value="0">不限库存</Checkbox>
                              </Input>

                              <Input v-else v-model="keepItem.keepCount">
                                  <Checkbox slot="append" v-model="keepItem.unlimitedCount" true-value="1" false-value="0">不限库存</Checkbox>
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
                  <Select v-model="product.categoryId" style="width:200px; display: block; margin-top: 20px">
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
                    <Radio  label=1><span>上架</span></Radio>
                    <Radio  label=2><span>仓库(下架)</span></Radio>
                    <!-- <Radio  label=3><span>定时上架</span></Radio> -->
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
                  <Form-item prop="detailContent">
                          <mavon-editor style=" margin-top: 10px" v-model="product.detailContent"/>
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
  import { thumbImageUrl } from 'utils/image';
  
  class KeepItem 
  {
    constructor() {
      this.name  = '';
      this.prise = 0;
      this.originPrise = 0;
      this.keepCount = 0;
      this.unlimitedCount = false;
      this.specDesc  = '';
    }
  }
    export default {
        components: { mavonEditor },
        data () {
            let that = this;
            return {
                product:{
                     pid: "",                  
                     mainPic:"",
                     name:"",
                     description:"",
                     detailContent:"",
                     status:"",
                     sellCount:"",
                     keepItems:[],
                     keepOption:[],
                     categoryId:"",
                },
                categories:[],
                ruleValidate:{

                },
            }
        },

        computed: {
          productPicture: function () {
            return thumbImageUrl(this.$data.product.mainPic)
          }
        },

        beforeCreate:function(){
           let that = this;
           this.$Spin.show();
           let product = this.$route.query.product
           var promises = []
           var fetchCategories = this.$store.dispatch('FetchCategories');        
           promises.push(fetchCategories)

           let isEdit = (product != undefined)
           if (isEdit) 
           {
              let fetchKeeps = this.$store.dispatch('FetchKeeps', product.pid);
              promises.push(fetchKeeps)
              let fetchProductDetail = this.$store.dispatch('FetchProductDetail', product.detaidId);
              promises.push(fetchProductDetail)
           }
           Promise.all(promises).then(function (results) {               
                that.$data.categories = results[0]
                if (isEdit) 
                {
                  Object.assign(that.$data.product, product);
                  that.$data.product.keepItems = results[1]
                  that.$data.product.detailContent = results[2].content
                }                
                that.$Spin.hide();
           }).catch(error => {
                 that.$Spin.hide();
                 var statusCode = -1
                 if (error.response != undefined) 
                 {
                    statusCode = error.response.status
                 }
                 that.$Message.error("数据请求失败: " + statusCode);
                 that.$router.back();
            });
        },

        methods:{   
           cancel()
           {
              this.$router.back();
           },
           save()
           {
              let that = this
              this.$store.dispatch('AddProduct',this.$data.product).then((res) => 
               { 
                  that.$Message.success("添加成功！");
                  //that.$router.back();
               }).catch(error => {
                  that.$Message.error("数据上传失败: " + error.response.status);
               });
           },
           checkUnLimtedKeep(data)
           {

           },
           addNewKeepItem()
           {
              this.$data.product.keepItems.push(new KeepItem());
           },
           handleUpload(file)
           {
               let that = this;
               this.$store.dispatch('Upload',file).then((res) => 
               { 
                  var imageLink = res
                  that.$data.product.mainPic = imageLink
               }).catch(error => {
                  that.$Message.error("数据上传失败: " + error.response.status);
               });
               return false;
           }
        }
      }

</script>

<style type="text/css">
.upload-tool-class img {
    position: absolute; 
    height: 100%; 
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>