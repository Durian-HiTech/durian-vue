<template>
  <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "SearchCity",
  data() {
    return {
      options: [
        { value: "Anhui", label: "安徽省" },
        { value: "Beijing", label: "北京市" },
        { value: "Chongqing", label: "重庆市" },
        { value: "Fujian", label: "福建省" },
        { value: "Gansu", label: "甘肃省" },
        { value: "Guangdong", label: "广东省" },
        { value: "Guangxi", label: "广西壮族自治区" },
        { value: "Guizhou", label: "贵州省" },
        { value: "Hainan", label: "海南省" },
        { value: "Hebei", label: "河北省" },
        { value: "Heilongjiang", label: "黑龙江省" },
        { value: "Henan", label: "河南省" },
        { value: "Hong Kong", label: "香港" },
        { value: "Hubei", label: "湖北省" },
        { value: "Hunan", label: "湖南省" },
        { value: "Jiangsu", label: "江苏省" },
        { value: "Jiangxi", label: "江西省" },
        { value: "Jilin", label: "吉林省" },
        { value: "Liaoning", label: "辽宁省" },
        { value: "Macao", label: "澳门" },
        { value: "Nei Mongol", label: "内蒙古自治区" },
        { value: "Ningxia Hui", label: "宁夏回族自治区" },
        { value: "Qinghai", label: "青海省" },
        { value: "Shaanxi", label: "陕西省" },
        { value: "Shandong", label: "山东省" },
        { value: "Shanghai", label: "上海市" },
        { value: "Shanxi", label: "山西省" },
        { value: "Sichuan", label: "四川省" },
        { value: "Taiwan", label: "台湾" },
        { value: "Tianjin", label: "天津市" },
        { value: "Xinjiang Uygur", label: "新疆维吾尔自治区" },
        { value: "Xizang", label: "西藏自治区" },
        { value: "Yunnan", label: "云南省" },
        { value: "Zhejiang", label: "浙江省" },
      ],
      value: "",
    };
  },
};
</script>