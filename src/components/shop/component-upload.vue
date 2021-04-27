<template>
    <!-- 上传窗口 -->
    <div class="upload-img-dialog-box">
    <el-dialog @close="closeUploadDialog" class="upload-img-dialog" width="898px" title="图片库" :visible="true">
        <div class="upload-content">
            <ul class="upload-img-list">
                <li>
                    <el-upload
                        class="upload-add-btn"
                        :multiple="true"
                        :accept="accept?accept:'image/*'"
                        :action="basePath+'/uploadImg_ext'"
                        ref="uploadObj"
                        :show-file-list="false"
                        :data="uploadData"
                        :on-error="uploadError"
                        :before-upload="beforeUpload"
                        :before-remove="beforeRemove"
                        :on-success="uploadImgCallback"
                        :on-progress="uploadProgress"
                        >
                            <i class="el-icon-upload2"></i>
                            上传本地图片
                        <!-- <unex-icon svg="upload" class="up"></unex-icon> -->
                    </el-upload>
                </li>
                <li class="upload-select-box"
                v-for="(item,index) in uploadImages"
                @click="selectUploadImg(item,index)"
                :key="'upload-img-'+index"
                :class="{'active':activeSelectUploadImgObj==item}"
                :style="'background-image:url('+item.picUrl+')'">
                    <i class="el-icon-check"></i>
                </li>
            </ul>
            <div class="upload-img-detail">
                <div class="upload-detail-tag">
                    图片详情
                </div>
                <div v-if="!!activeSelectUploadImgObj&&!!activeSelectUploadImgObj.picUrl">
                    <div class="upload-detail-img" :style="'background-image:url('+activeSelectUploadImgObj.picUrl+')'">

                    </div>
                    <!-- <div class="upload-detail-title" v-text="activeSelectUploadImgObj.id">

                    </div>
                    <div class="upload-detail-desc">
                        <p class="size" v-text="activeSelectUploadImgObj.width+' × '+ activeSelectUploadImgObj.height"></p>
                        <p class="time" v-text="activeSelectUploadImgObj.createTime"></p>
                    </div> -->
                    <el-button type="text" class="upload-detail-del" @click="deleteUploadImage(activeSelectUploadImgObj.id,activeSelectUploadImgIndex)">删除图片</el-button>
                </div>
            </div>
        </div>

        <div class="pager-box">
            <!-- <el-pagination class="left-pager"
                @size-change="handleSizeChange"
                :current-page.sync="searchCondition.pageNo"
                :page-sizes="[10, 20, 50]"
                layout="sizes"
                :total="totalRecord">
                </el-pagination>
                <el-pagination v-if="totalRecord<=searchCondition.pageSize" class="right-pager"
                :current-page.sync="searchCondition.pageNo"
                layout="total"
                :total="totalRecord">
            </el-pagination> -->
            <div class="right-pager" v-if="totalRecord>searchCondition.pageSize">
                <el-pagination class="total-pager"
                    :current-page.sync="searchCondition.pageNo"
                    layout="total"
                    :total="totalRecord">
                </el-pagination>

                <div class="jump-pager">到<el-input v-model="jumpPage" @keyup.native="jumpPagerAction" size="small" placeholder="" class="count-input"></el-input></div>
                <el-pagination class="count-pager"
                    @current-change="handleCurrentChange"
                    :current-page.sync="searchCondition.pageNo"
                    :page-size="searchCondition.pageSize"
                    prev-text="<"
                    next-text=">"
                    layout="prev, pager, next"
                    :total="totalRecord">
                </el-pagination>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" class="btn-cancel" @click="closeUploadDialog">取 消</el-button>
            <el-button type="text" @click="confirmSelectUploadImg">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog
  title="上传图片"
  :visible.sync="showProgressDialogStatus"
  width="500px"
  class="upload-progress-dialog"
  @close="showProgressDialogStatus=false">
  <div class="title-box">
      <span class="left">正在上传{{currentUploadFile?currentUploadFile.name:''}}</span>
      <span class="right">已上传<i class="count">{{uploadedCount}}</i>/总共{{currentFileList.length}}</span>
  </div>
  <el-progress :show-text="false" :percentage="currentFilePercent"></el-progress>
  <div slot="footer" class="dialog-footer">
    <el-button type="text" class="cancel-upload-btn" @click="cancelUploadAction">取消上传</el-button>
  </div>
</el-dialog>

    </div>
</template>
<script>
import tmCommon from '@/common/common'

const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'
const variablePool = {}
export default {
  name: 'component-upload',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      basePath: '',
      jumpPage: 1,
      // 上传处理
      uploadData: {
        tenantCode: localStorage.getItem('tenantCode')
      },
      searchCondition: {
        tenantCode: localStorage.getItem('tenantCode'),
        pageNo: 1,
        pageSize: 19
      },
      totalPages: 0, // 总页数
      totalRecord: 0, // 总记录数
      uploadImages: [], // 上传图片列表
      activeSelectUploadImgObj: null,
      activeSelectUploadImgIndex: null,
      showProgressDialogStatus: false,
      currentUploadFile: {}, // 当前正在上传的文件
      currentFileList: [], // 当前上传文件数量
      currentFilePercent: 0, // 当前文件上传百分比
      uploadedCount: 1 // 正上传的数量
    }
  },
  props: ['accept'],
  computed: {

  },
  mounted () {
    // tmCommon.log(this.accept);
    window.addEventListener('resize', this.resizeAction, false)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeAction, false)
  },
  methods: {
    jumpPagerAction ($event) {
      const that = this
      let page = $event.target.value
      if (isNaN(page)) {
        this.jumpPage = ''
        return
      }
      if (!page) {
        this.jumpPage = ''
        return
      }
      let totalPage = parseInt(that.totalRecord / that.searchCondition.pageSize, 10)
      const mod = parseFloat(that.totalRecord) % that.searchCondition.pageSize
      if (mod > 0) {
        totalPage++
      }
      if (page > totalPage) {
        this.jumpPage = totalPage
        // this.$set(this.searchCondition.page,"page",totalPage)
        // $event.target.value=totalPage
      } else {
        if (page == 0) {
          page = 1
        }
        this.jumpPage = parseInt(page)
        // this.$set(this.searchCondition.page,"page",page)
        // $event.target.value=page
      }
      this.searchCondition.pageNo = this.jumpPage
      this.getUploadImages()
    },
    // 页数改变
    handleSizeChange (val) {
      tmCommon.log(`每页 ${val} 条`)
      this.searchCondition.pageSize = val
      this.searchCondition.pageNo = 1
      this.jumpPage = 1
      this.getUploadImages()
    },
    handleCurrentChange (val) {
      tmCommon.log(`当前页:  ${val} `)
      this.searchCondition.pageNo = val
      this.jumpPage = val
      this.getUploadImages()
    },
    // ---------上传组件相关方法 start
    // 选择上传图片
    selectUploadImg (item, index) {
      this.activeSelectUploadImgObj = item
      this.activeSelectUploadImgIndex = index
    },
    // 获取上传图片列表
    getUploadImages () {
      const that = this
      // const options = {
      //   pageNo: that.searchCondition.pageNo - 1,
      //   pageSize: that.searchCondition.pageSize,
      //   imageType: 'PIC',
      //   tenantCode: localStorage.getItem('tenantCode')
      // }

      that.uploadImages = []
      that.totalPages = 3
      that.totalRecord = 30
      // that.$store.dispatch('getImagesList', options).then(res => {
      //   const { status, msg, list, totalPages, total } = res
      //   if (status === '200') {
      //     that.uploadImages = list || []
      //     that.totalPages = totalPages
      //     that.totalRecord = total
      //   } else {
      //     that.$message.error(msg)
      //   }
      // }).catch(e => {
      //   tmCommon.error('网络错误，请稍后重试！', e)
      // })
    },
    // 上传进度查看
    uploadProgress (event, file, fileList) {
      clearTimeout(variablePool.uploadImagesFinishId)
      // let count=1;
      // let len=fileList.length;
      // for(let i in fileList){
      //     if(file.percentage==100){
      //         count++;
      //         if(count>len){
      //             count=len;
      //         }
      //     }
      // }
      // this.uploadedCount=count;
      this.currentFileList = fileList
      this.currentUploadFile = file
      this.currentFilePercent = file.percentage
      // this.showProgressDialogStatus=true;
      // this.currentUploadFile=file;
      // tmCommon.log(event.loaded,event.total,event.percent,JSON.stringify(file));
    },
    // 上传前操作
    beforeUpload (file) {
      // this.uploadedCount++;
      const isJPG = file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/jpeg'

      if (!isJPG) {
        this.$message.error('您上传的图片格式系统不支持，请重新上传')
        // this.$message.error('图片仅支持PNG.JPG.GIF.BMP格式!');
      }
      this.uploadedCount = 1
      this.showProgressDialogStatus = true
      // tmCommon.error("beforeupload",file);
      return isJPG
    },
    beforeRemove () {
      this.showProgressDialogStatus = false
    },
    // 取消上传
    cancelUploadAction () {
      this.$refs.uploadObj.abort()
      this.showProgressDialogStatus = false
    },
    // 上传成功回调
    uploadImgCallback (e, file, fileList) {
      const that = this
      tmCommon.warn('上传成功', that.uploadedCount)
      const { status, data } = e
      if (status === '200') {
        const { fileUrl } = data
        that.addUploadImage(fileUrl)
      }
      let count = that.uploadedCount
      count++
      if (count >= fileList.length) {
        that.uploadedCount = fileList.length
      } else {
        that.uploadedCount = count
      }
      variablePool.uploadImagesFinishId = setTimeout(function () {
        that.showProgressDialogStatus = false
        that.$refs.uploadObj.clearFiles()
      }, 500)
      // // that.uploadedCount++;
      // if(that.uploadedCount==fileList.length){
      //     that.uploadedCount==0;
      //     that.$refs.uploadObj.clearFiles();
      //     tmCommon.warn("全部上传成功")
      // }
    },
    // 上传变更
    uploadChange () {
      // this.uploadedCount=0;//重置上传的数量
      tmCommon.warn('uploadChange', that.uploadedCount)
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.uploadedCount = 0
      this.showProgressDialogStatus = false
      this.$message.error('文件上传失败！')
      tmCommon.error(err, file, fileList)
    },
    // 添加上传的图片到用户
    addUploadImage (url) {
      const that = this
      that.$store.dispatch('addShopImages', {
        url: url,
        tenantCode: localStorage.getItem('tenantCode'),
        imageType: 'PIC'
      }).then(res => {
        const { status, msg, data } = res
        if (status === '200') {
          tmCommon.log('上传后的图片', data)
          // that.uploadImages.push(data);
          that.getUploadImages()
        } else {
          that.$message.error(msg)
        }
      }).catch(e => {
        tmCommon.error('网络错误，请稍后重试！', e)
      })
    },
    // 删除的上传的图片到用户
    deleteUploadImage (id, index) {
      const that = this
      that.$store.dispatch('deletImages', id).then(res => {
        const { status, msg, data } = res
        if (status === '200') {
          tmCommon.log('删除成功', data)
          // that.uploadImages.push(data);
          // that.uploadImages.splice(index,1);
          that.getUploadImages()
          that.activeSelectUploadImgObj = null
          that.activeSelectUploadImgIndex = null
        } else {
          that.$message.error(msg)
        }
      }).catch(e => {
        tmCommon.error('网络错误，请稍后重试！', e)
      })
    },
    // 确认选择上传图片
    confirmSelectUploadImg () {
      // this.activeUploadImgObj=this.activeSelectUploadImgObj;
      // this.activeSliderImg.imageUrl=this.activeUploadImgObj.picUrl;
      // this.showUploadImgDialogStatus=false;
      const that = this
      const image = new Image()
      image.onload = function () {
        that.activeSelectUploadImgObj.width = this.width
        that.activeSelectUploadImgObj.height = this.height
        that.$emit('confirmAction', that.activeSelectUploadImgObj)
      }
      image.onerror = function () {
        that.activeSelectUploadImgObj.width = 'auto'
        that.activeSelectUploadImgObj.height = 'auto'
        that.$emit('confirmAction', that.activeSelectUploadImgObj)
      }
      image.src = that.activeSelectUploadImgObj.picUrl
    },
    // 关闭上传窗口
    closeUploadDialog () {
      this.$emit('closeAction')
    },
    resizeAction () {
      const innerWidth = window.innerWidth
      if (innerWidth >= 1920) {
        this.searchCondition.pageSize = 39
      } else if (innerWidth < 1920 && innerWidth >= 1440) {
        this.searchCondition.pageSize = 27
      } else {
        this.searchCondition.pageSize = 19
      }
      this.getUploadImages()
    }
    // ---------上传组件相关方法 end
  },
  created () {
    this.resizeAction()
    this.getUploadImages()
  },
  updated () {
    tmCommon.log(this.accept)
  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
@media screen and (min-width: 1280px) and (max-width: 1440px) {
   .upload-img-dialog-box{
        // .el-dialog{
        //     width: 1000px!important;
        // }
        // .upload-img-dialog{
        //     .upload-content{
        //         .upload-img-list{

        //         }
        //     }
        // }
    }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
   .upload-img-dialog-box{
       .upload-img-dialog{
           .el-dialog{
                width: 1128px!important;
                .upload-content{
                    .upload-img-list{
                        li{
                            &:nth-child(5n+1){
                                margin-left: 14px;
                            }
                            &:first-child{
                                margin-left: 0;
                            }
                            &:nth-child(7n+1){
                                margin-left: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1920px){
    .upload-img-dialog-box{
        .upload-img-dialog{
           .el-dialog{
                width: 1476px!important;
                .upload-content{
                    .upload-img-list{
                        li{
                            &:nth-child(5n+1){
                                margin-left: 14px;
                            }
                            &:nth-child(7n+1){
                                margin-left: 14px;
                            }
                            &:first-child{
                                margin-left: 0;
                            }
                            &:nth-child(10n+1){
                                margin-left: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
.upload-img-dialog-box{
    .el-dialog{
        margin-top: 8vh!important;
    }
    .el-dialog__body{
        padding: 0;
    }
    .el-dialog__header{
        height:51px;
        padding-top:18px;
        border-bottom: 1px solid #E8E8E8;
        .el-dialog__title{
            margin-left: 12px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333;
        }
    }
    .el-dialog__footer{
        // padding-top: 0;
        // padding-bottom: 0;
        padding: 0;
        height: 55px;
        line-height: 55px;
    }

    .pager-box{
        height: 56px;
        // line-height: 56px;
        overflow: hidden;
        background: #fff;
        .el-pagination,.jump-pager{
            margin-top: 12px;
        }
        .left-pager{
        float: left;
    }
    .right-pager{
        float: right;
        margin-right: 32px;
        .total-pager{
            float: left;
        }
        .jump-pager{
            float: left;
        }
        .count-pager{
            float: left;
        }
        .el-pager{
            li{
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #999999;
                &.active{
                    font-family: HelveticaNeue-Bold;
                    color: #3366FF;
                }
            }
        }
    }
        .jump-pager{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            .count-input{
                // background: #FFFFFF;
                width: 60px;
                .el-input__inner{
                    margin-left: 8px;
                    border: 1px solid #D9D9D9;
                    border-radius: 2px;
                    width: 48px;
                    text-align: center;
                    height: 32px;
                    line-height: 32px;
                }
            }
        }
    }
    .dialog-footer{
        border-top: 1px solid #EBEBEB;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        padding: 0 20px;
        .btn-cancel{
            margin-right: 12px;
            color: #666;
        }
        .cancel-upload-btn{
            padding: 0 18px;
            line-height: 0;
        }
    }
    .upload-progress-dialog{
        .title-box{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 1px;
            line-height: 22px;
            margin: 8px 24px;
            overflow: hidden;
            .left{
                float: left;
            }
            .right{
                float: right;
                .count{
                    font-style: normal;
                    font-weight: bold;
                    padding: 0 2px;
                    color: #3366FF;
                }
            }
        }
        .el-progress{
            margin: 16px 24px 22px;
        }
        .dialog-footer{
            padding: 0 16px;
            .cancel-upload-btn{
                margin-right: 12px;
                padding: 0;
                color: #666;
            }
        }
        .el-dialog__footer{
            height: 48px;
            line-height: 48px;
        }
    }
    .upload-img-dialog{
        .upload-content{
            height: 388px;
            display: flex;
            .upload-img-list{
                // width: 567px;
                flex: 1;
                margin: 20px 24px;
                overflow: hidden;
                li{
                    cursor: pointer;
                    width: 100px;
                    height: 100px;
                    margin-left: 14px;
                    margin-bottom: 16px;
                    background: #FAFAFA;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                    float:left;
                    border: 1px solid #D9D9D9;
                    position: relative;
                    .upload-add-btn{
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #3366FF;
                        text-align: center;
                        .el-upload{
                            &:focus{
                                color: #3366FF;
                                border-color:#3366FF;
                            }
                        }
                        .el-icon-upload2{
                            margin-top: 36px;
                            display: block;
                            font-size: 24px;
                            font-weight: 900;
                            color: #3366FF;
                            transform: scaleY(.7);
                        }
                    }
                    &:nth-child(5n+1){
                        margin-left: 0;
                    }
                    &:first-child{
                        margin-left: 0;
                    }
                    .el-icon-check{
                        display: none;
                    }
                    &.upload-select-box{
                        &.active,&:hover{
                            border: 1px solid #3366FF;
                            .el-icon-check{
                                display: block;
                                padding:3px;
                                background: #3366FF;
                                color: #fff;
                                font-size: 14px;
                                font-weight: 900;
                                position: absolute;
                                top: 0;
                                right: 0;
                            }
                        }
                    }
                }
            }
            .upload-img-detail{
                width: 290px;
                background: #FAFAFA;
                padding: 15px 18px;
                .upload-detail-tag{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #333;
                    margin-bottom: 8px;
                }
                .upload-detail-img{
                    width: 254px;
                    height: 136px;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
                .upload-detail-title{
                    margin-top: 10px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #333;
                }
                .upload-detail-desc{
                    margin-top: 5px;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #999;
                    // p{

                    // }
                }
                .upload-detail-del{
                    margin-top:0;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
